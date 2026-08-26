import React, { useState, useMemo, useCallback } from 'react';
import { Globe, Server, ShieldCheck, Brain, Database, Compass, Zap, ArrowDown, Info } from 'lucide-react';

const getNodeIcon = (iconName) => {
  switch (iconName) {
    case 'Globe':
      return <Globe size={18} />;
    case 'Server':
      return <Server size={18} />;
    case 'ShieldCheck':
      return <ShieldCheck size={18} />;
    case 'Brain':
      return <Brain size={18} />;
    case 'Database':
      return <Database size={18} />;
    case 'Compass':
      return <Compass size={18} />;
    case 'Zap':
      return <Zap size={18} />;
    default:
      return <Server size={18} />;
  }
};

// Node coordinate map in fixed 900x560 space with generous visual breathing room
const NODE_COORDINATES = {
  client: { x: 450, y: 65, leftPct: 50, topPct: 12 },
  gateway: { x: 450, y: 185, leftPct: 50, topPct: 34 },
  auth: { x: 162, y: 315, leftPct: 18, topPct: 58 },
  ai_engine: { x: 450, y: 315, leftPct: 50, topPct: 58 },
  database: { x: 738, y: 315, leftPct: 82, topPct: 58 },
  skill_gap: { x: 315, y: 460, leftPct: 35, topPct: 84 },
  external_services: { x: 585, y: 460, leftPct: 65, topPct: 84 },
};

// Memoized individual desktop node card
const ArchitectureNode = React.memo(
  ({ node, isSelected, isHovered, isActive, onSelect, onHoverStart, onHoverEnd }) => {
    const coords = NODE_COORDINATES[node.id] || { leftPct: 50, topPct: 50 };

    return (
      <div
        style={{
          left: `${coords.leftPct}%`,
          top: `${coords.topPct}%`,
        }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer select-none ${
          isActive ? 'opacity-100' : 'opacity-30 grayscale-[50%]'
        }`}
        onMouseEnter={() => onHoverStart(node.id)}
        onMouseLeave={onHoverEnd}
        onClick={() => onSelect(node)}
      >
        <div
          className={`w-44 p-3 rounded-2xl border backdrop-blur-xl transition-colors duration-150 shadow-sm ${
            isSelected
              ? 'bg-white dark:bg-navy-900 border-cyan shadow-glow-cyan-sm text-slate-900 dark:text-slate-100 ring-1 ring-cyan/50'
              : isHovered
              ? 'bg-white dark:bg-navy-850 border-cyan/70 text-slate-900 dark:text-slate-100 shadow-md'
              : 'bg-white/90 dark:bg-navy-900/90 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
          }`}
        >
          {/* Node Top Row */}
          <div className="flex items-center justify-between gap-1.5 mb-1.5 pointer-events-none">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-muted dark:text-cyan">
              {node.tier}
            </span>
            <div className="p-1 rounded-lg bg-cyan/10 text-cyan-muted dark:text-cyan">
              {getNodeIcon(node.icon)}
            </div>
          </div>

          {/* Node Title & Tech */}
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate pointer-events-none">
            {node.shortName || node.name}
          </h4>
          <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5 pointer-events-none">
            {node.technology}
          </p>

          {/* Active selection tag */}
          {isSelected && (
            <div className="mt-2 pt-1.5 border-t border-cyan/20 flex items-center justify-between text-[10px] font-mono text-cyan-muted dark:text-cyan pointer-events-none">
              <span>Inspecting</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

ArchitectureNode.displayName = 'ArchitectureNode';

export const ArchitectureGraph = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  mode, // 'overview' | 'flow'
  activeStepData,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const handleHoverStart = useCallback((id) => {
    setHoveredNodeId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredNodeId(null);
  }, []);

  const nodeMap = useMemo(() => {
    return nodes.reduce((acc, n) => {
      acc[n.id] = n;
      return acc;
    }, {});
  }, [nodes]);

  const hoveredNode = hoveredNodeId ? nodeMap[hoveredNodeId] : null;

  // Memoize static edge paths with exact pixel coordinates in 900x560 space
  const staticEdgePaths = useMemo(() => {
    return edges.map((edge) => {
      const fromCoord = NODE_COORDINATES[edge.from];
      const toCoord = NODE_COORDINATES[edge.to];
      if (!fromCoord || !toCoord) return null;

      let x1 = fromCoord.x;
      let y1 = fromCoord.y + 30;
      let x2 = toCoord.x;
      let y2 = toCoord.y - 30;

      if (fromCoord.y === toCoord.y) {
        // Horizontal connection (e.g. ai_engine to database)
        x1 = fromCoord.x + 88;
        y1 = fromCoord.y;
        x2 = toCoord.x - 88;
        y2 = toCoord.y;
      } else if (fromCoord.x !== toCoord.x) {
        // Diagonal connections with clean clearance
        if (fromCoord.x > toCoord.x) {
          x1 = fromCoord.x - 65;
          x2 = toCoord.x + 45;
        } else {
          x1 = fromCoord.x + 65;
          x2 = toCoord.x - 45;
        }
      }

      const pathString = `M ${x1} ${y1} L ${x2} ${y2}`;

      return {
        ...edge,
        x1,
        y1,
        x2,
        y2,
        pathString,
      };
    }).filter(Boolean);
  }, [edges]);

  // Determine if a node is active in Data Flow mode
  const isNodeActive = useCallback(
    (nodeId) => {
      if (mode === 'overview') return true;
      if (!activeStepData) return true;
      return activeStepData.activeNodes.includes(nodeId);
    },
    [mode, activeStepData]
  );

  // Determine if an edge is highlighted
  const isEdgeHighlighted = useCallback(
    (edge) => {
      if (mode === 'flow' && activeStepData?.activeEdge) {
        return (
          (activeStepData.activeEdge.from === edge.from && activeStepData.activeEdge.to === edge.to) ||
          (activeStepData.activeEdge.from === edge.to && activeStepData.activeEdge.to === edge.from)
        );
      }
      if (hoveredNodeId) {
        return edge.from === hoveredNodeId || edge.to === hoveredNodeId;
      }
      if (selectedNodeId) {
        return edge.from === selectedNodeId || edge.to === selectedNodeId;
      }
      return false;
    },
    [mode, activeStepData, hoveredNodeId, selectedNodeId]
  );

  return (
    <div className="relative w-full rounded-2xl bg-slate-100/70 dark:bg-navy-950/80 border border-slate-200 dark:border-white/10 p-4 sm:p-6 overflow-hidden flex flex-col items-center min-h-[560px]">
      
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      {/* Desktop / Tablet: Fixed Coordinate Graph Canvas with Wide Spacing */}
      <div className="hidden md:block relative w-full h-[540px]">
        
        {/* Optimized SVG Edge Canvas */}
        <svg
          viewBox="0 0 900 560"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {staticEdgePaths.map((edge, idx) => {
            const highlighted = isEdgeHighlighted(edge);

            return (
              <g key={`${edge.from}-${edge.to}-${idx}`}>
                {/* Connection line */}
                <line
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={highlighted ? '#1EC1CB' : 'currentColor'}
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  strokeOpacity={highlighted ? 1 : 0.35}
                  className={`transition-colors duration-200 ${
                    highlighted
                      ? 'stroke-cyan'
                      : 'text-slate-300 dark:text-slate-700'
                  }`}
                  strokeDasharray={edge.animated ? '4 4' : 'none'}
                />

                {/* Animated pulse dot along highlighted active path */}
                {highlighted && (
                  <circle r="4.5" fill="#1EC1CB">
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      path={edge.pathString}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Stationary HTML Node Cards */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredNodeId === node.id;
          const active = isNodeActive(node.id);

          return (
            <ArchitectureNode
              key={node.id}
              node={node}
              isSelected={isSelected}
              isHovered={isHovered}
              isActive={active}
              onSelect={onSelectNode}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          );
        })}

        {/* Fixed Stationary Status / Tooltip Bar at bottom of canvas */}
        <div className="absolute bottom-3 left-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-white/10 backdrop-blur-md flex items-center justify-between text-xs z-20 pointer-events-none shadow-sm">
          {hoveredNode ? (
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {hoveredNode.name}
              </span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-cyan-muted dark:text-cyan font-mono text-[11px]">
                {hoveredNode.technology}
              </span>
              <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">—</span>
              <span className="text-slate-600 dark:text-slate-300 truncate hidden sm:inline">
                {hoveredNode.shortDesc}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              <Info size={13} className="text-cyan" />
              <span>Hover over components to highlight connections. Click any node to inspect engineering rationale.</span>
            </div>
          )}
          <span className="text-[11px] font-mono text-cyan-muted dark:text-cyan shrink-0 hidden lg:inline">
            {mode === 'flow' ? 'Data Flow Mode' : 'System Overview'}
          </span>
        </div>

      </div>

      {/* Mobile Stack View (visible on screens < 768px) */}
      <div className="md:hidden w-full flex flex-col gap-3 z-10">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-white/10">
          <span>Connected Subsystems (Tap to Inspect)</span>
          <Info size={14} className="text-cyan" />
        </div>

        {nodes.map((node, idx) => {
          const isSelected = selectedNodeId === node.id;
          const active = isNodeActive(node.id);

          return (
            <React.Fragment key={node.id}>
              <div
                onClick={() => onSelectNode(node)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  active ? 'opacity-100' : 'opacity-40 grayscale'
                } ${
                  isSelected
                    ? 'bg-white dark:bg-navy-900 border-cyan ring-1 ring-cyan shadow-sm'
                    : 'bg-white/80 dark:bg-navy-900/80 border-slate-200 dark:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono font-medium text-cyan-muted dark:text-cyan uppercase">
                    {node.tier}
                  </span>
                  <div className="p-1 rounded-lg bg-cyan/10 text-cyan-muted dark:text-cyan">
                    {getNodeIcon(node.icon)}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {node.name}
                </h4>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  {node.technology}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {node.shortDesc}
                </p>
              </div>

              {idx < nodes.length - 1 && (
                <div className="flex justify-center text-cyan opacity-40 -my-1 pointer-events-none">
                  <ArrowDown size={14} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
};
