import React from 'react';
import { Layers, HelpCircle, Lightbulb, Cpu, CheckCircle2, Globe, Server, ShieldCheck, Brain, Database, Compass, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
      return <Cpu size={18} />;
  }
};

export const NodeDetailPanel = ({ node, onClose }) => {
  if (!node) {
    return (
      <div className="p-6 rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-navy-800 text-slate-400 dark:text-slate-500 mb-3">
          <Layers size={24} />
        </div>
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
          Select an Architecture Node
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          Click any component in the graph to inspect its technical responsibilities, purpose, and engineering decisions.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-white/10 shadow-lg flex flex-col gap-5 overflow-y-auto max-h-[600px]"
    >
      {/* Node Header */}
      <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan/10 text-cyan-muted dark:text-cyan border border-cyan/20 shrink-0">
            {getNodeIcon(node.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-mono font-medium text-cyan-muted dark:text-cyan uppercase tracking-wider">
                {node.tier}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {node.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {node.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Technology Pill */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-white/5 flex items-center justify-between gap-2">
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Technology
        </span>
        <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
          {node.technology}
        </span>
      </div>

      {/* Section: Responsibility */}
      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Layers size={13} className="text-cyan-muted dark:text-cyan" />
          Core Responsibility
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-navy-950/40 p-3 rounded-xl border border-slate-200/60 dark:border-white/5">
          {node.responsibility}
        </p>
      </div>

      {/* Section: Why it exists */}
      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <HelpCircle size={13} className="text-cyan-muted dark:text-cyan" />
          Why It Exists in Architecture
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-navy-950/40 p-3 rounded-xl border border-slate-200/60 dark:border-white/5">
          {node.whyItExists}
        </p>
      </div>

      {/* Section: Engineering Decision */}
      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Lightbulb size={13} className="text-cyan-muted dark:text-cyan" />
          Engineering Decision & Trade-Offs
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-cyan/5 dark:bg-cyan/10 p-3.5 rounded-xl border border-cyan/20">
          {node.engineeringDecision}
        </p>
      </div>
    </motion.div>
  );
};
