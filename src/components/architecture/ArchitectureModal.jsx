import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Activity } from 'lucide-react';
import { architectures } from '../../data/architectureData';
import { ArchitectureGraph } from './ArchitectureGraph';
import { NodeDetailPanel } from './NodeDetailPanel';
import { DataFlowStepper } from './DataFlowStepper';

export const ArchitectureModal = ({
  projectId = 'aifinity',
  isOpen,
  onClose,
}) => {
  const archData = architectures[projectId] || architectures.aifinity;
  const [mode, setMode] = useState('overview'); // 'overview' | 'flow'
  const [selectedNode, setSelectedNode] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollContainerRef = useRef(null);
  const graphContainerRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);

  // Set default selected node on open
  useEffect(() => {
    if (isOpen && archData?.nodes?.length > 0) {
      setSelectedNode(archData.nodes[0]);
      setCurrentStepIndex(0);
      setMode('overview');
      setIsPlaying(false);
    }
  }, [isOpen, archData]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsPlaying(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Detect user-initiated interaction (wheel, touch, pointer) to cancel autoplay immediately
  useEffect(() => {
    if (!isPlaying) return;

    const handleUserInterrupt = () => {
      if (isProgrammaticScrollRef.current) return;
      setIsPlaying(false);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleUserInterrupt, { passive: true });
      container.addEventListener('touchstart', handleUserInterrupt, { passive: true });
    }
    window.addEventListener('keydown', handleUserInterrupt, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleUserInterrupt);
        container.removeEventListener('touchstart', handleUserInterrupt);
      }
      window.removeEventListener('keydown', handleUserInterrupt);
    };
  }, [isPlaying]);

  // Autoplay progression timer
  useEffect(() => {
    let timer = null;
    if (isPlaying && mode === 'flow' && archData?.dataFlowSteps?.length > 0) {
      timer = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= archData.dataFlowSteps.length) {
            // Reached the end of guided walkthrough
            setIsPlaying(false);
            return prevIndex;
          }

          // Auto-select the active node for this step
          const nextStep = archData.dataFlowSteps[nextIndex];
          if (nextStep && nextStep.activeNodes?.length > 0) {
            const activeNode = archData.nodes.find((n) => n.id === nextStep.activeNodes[0]);
            if (activeNode) setSelectedNode(activeNode);
          }

          return nextIndex;
        });
      }, 2800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, mode, archData]);

  // Smooth scroll into view when autoplay begins
  const scrollToArchitecture = useCallback(() => {
    if (!graphContainerRef.current) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    isProgrammaticScrollRef.current = true;
    graphContainerRef.current.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
    });

    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 700);
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (mode !== 'flow') setMode('flow');
      setIsPlaying(true);
      scrollToArchitecture();
    }
  }, [isPlaying, mode, scrollToArchitecture]);

  const handleSelectNode = useCallback((node) => {
    // Clicking a node stops autoplay immediately and opens node in inspector
    setIsPlaying(false);
    setSelectedNode(node);
  }, []);

  const handleCloseNodeDetail = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleManualStepChange = useCallback(
    (newIndex) => {
      setIsPlaying(false);
      const calculatedIndex =
        typeof newIndex === 'function' ? newIndex(currentStepIndex) : newIndex;
      setCurrentStepIndex(calculatedIndex);
      const step = archData?.dataFlowSteps?.[calculatedIndex];
      if (step && step.activeNodes?.length > 0) {
        const activeNode = archData.nodes.find((n) => n.id === step.activeNodes[0]);
        if (activeNode) setSelectedNode(activeNode);
      }
    },
    [currentStepIndex, archData]
  );

  const handleModeChange = useCallback((newMode) => {
    setIsPlaying(false);
    setMode(newMode);
  }, []);

  if (!isOpen || !archData) return null;

  const currentStepData =
    mode === 'flow' ? archData.dataFlowSteps[currentStepIndex] : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsPlaying(false);
            onClose();
          }}
          className="fixed inset-0 bg-navy-950/80 dark:bg-navy-950/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 md:p-7 border-b border-slate-200 dark:border-white/10 flex flex-col gap-4 bg-slate-50/50 dark:bg-navy-950/50 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-muted dark:text-cyan uppercase tracking-wider">
                    {archData.projectTitle}
                  </span>
                  <span className="text-slate-400 dark:text-slate-600">•</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    System Architecture
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {archData.subtitle}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  onClose();
                }}
                aria-label="Close Architecture View"
                className="p-2 rounded-xl bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-cyan/40 transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {archData.description}
            </p>

            {/* Controls Bar: Mode Switcher & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* Mode Switch Pills */}
              <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-navy-950 border border-slate-300 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => handleModeChange('overview')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    mode === 'overview'
                      ? 'bg-white dark:bg-navy-800 text-cyan-muted dark:text-cyan shadow-sm border border-slate-200/60 dark:border-white/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Layers size={14} />
                  <span>Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('flow')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    mode === 'flow'
                      ? 'bg-white dark:bg-navy-800 text-cyan-muted dark:text-cyan shadow-sm border border-slate-200/60 dark:border-white/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Activity size={14} />
                  <span>Data Flow Mode</span>
                </button>
              </div>

              {/* Tech Badges */}
              <div className="hidden lg:flex items-center gap-1.5">
                {archData.techBadges?.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Body: Scrollable Canvas & Inspector */}
          <div
            ref={scrollContainerRef}
            className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6"
          >
            {/* Top Stepper in Data Flow Mode */}
            {mode === 'flow' && archData.dataFlowSteps && (
              <DataFlowStepper
                steps={archData.dataFlowSteps}
                currentStepIndex={currentStepIndex}
                onChangeStep={handleManualStepChange}
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
              />
            )}

            {/* Grid Layout: Graph on Left/Center, Detail Panel on Right */}
            <div
              ref={graphContainerRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Architecture Graph Viewport (7 or 8 cols on desktop) */}
              <div className="lg:col-span-7 xl:col-span-7 w-full">
                <ArchitectureGraph
                  nodes={archData.nodes}
                  edges={archData.edges}
                  selectedNodeId={selectedNode?.id}
                  onSelectNode={handleSelectNode}
                  mode={mode}
                  activeStepData={currentStepData}
                />
              </div>

              {/* Node Blueprint Inspector Panel (5 cols on desktop) */}
              <div className="lg:col-span-5 xl:col-span-5 w-full">
                <NodeDetailPanel
                  node={selectedNode}
                  onClose={handleCloseNodeDetail}
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Bar */}
          <div className="px-6 py-3.5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950/70 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan inline-block animate-pulse" />
              {isPlaying ? 'Autoplay Active (Interact anytime to take manual control)' : 'Interactive Blueprint View'}
            </span>
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10">ESC</kbd> to exit
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
