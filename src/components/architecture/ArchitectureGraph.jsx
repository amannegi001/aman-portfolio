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

// Fixed coordinate space: 900 x 520 (width x height)
// Card dimensions: 176px wide (w-44) x 76px high (halfW: 88, halfH: 38)
const NODE_COORDINATES = {
  client: { x: 450, y: 55, leftPct: 50.0, topPct: 10.58 },
  gateway: { x: 450, y: 175, leftPct: 50.0, topPct: 33.65 },
  auth: { x: 155, y: 300, leftPct: 17.22, topPct: 57.69 },
  ai_engine: { x: 450, y: 300, leftPct: 50.0, topPct: 57.69 },
  database: { x: 745, y: 300, leftPct: 82.78, topPct: 57.69 },
  skill_gap: { x: 300, y: 440, leftPct: 33.33, topPct: 84.62 },
  external_services: { x: 600, y: 440, leftPct: 66.67, topPct: 84.62 },
};

/**
 * Computes deterministic, collision-free orthogonal / elbow blueprint paths
 * between architectural tiers and anchor points.
 */
const computeOrthogonalPath = (edge) => {
  const { from, to } = edge;

  // 1. Frontend (Client) -> API Gateway (Vertical down)
  if (from === 'client' && to === 'gateway') {
    return 'M 450 93 L 450 137';
  }

  // 2. API Gateway -> AI Diagnostic Engine (Vertical down)
  if (from === 'gateway' && to === 'ai_engine') {
    return 'M 450 213 L 450 262';
  }

  // 3. API Gateway -> Auth & Security (Down to Corridor 1 at y=245, left to x=155, down to Auth top)
  if (from === 'gateway' && to === 'auth') {
    return 'M 450 213 L 450 239 Q 450 245 444 245 L 161 245 Q 155 245 155 251 L 155 262';
  }

  // 4. API Gateway -> Persistence Layer (Down to Corridor 1 at y=245, right to x=745, down to Database top)
  if (from === 'gateway' && to === 'database') {
    return 'M 450 213 L 450 239 Q 450 245 456 245 L 739 245 Q 745 245 745 251 L 745 262';
  }

  // 5. AI Diagnostic Engine -> Database Layer (Horizontal straight connection between Row 2 siblings)
  if (from === 'ai_engine' && to === 'database') {
    return 'M 538 300 L 657 300';
  }

  // 6. AI Diagnostic Engine -> SkillGap Engine (Down to Corridor 2 at y=370, left to x=300, down to SkillGap top)
  if (from === 'ai_engine' && to === 'skill_gap') {
    return 'M 450 338 L 450 364 Q 450 370 444 370 L 306 370 Q 300 370 300 376 L 300 402';
  }

  // 7. API Gateway -> External Integrations (Down through open gap between AI Engine and Database directly to Integrations top)
  if (from === 'gateway' && to === 'external_services') {
    return 'M 450 213 L 450 239 Q 450 245 456 245 L 594 245 Q 600 245 600 251 L 600 402';
  }

  // Fallback direct connector
  const fromCoord = NODE_COORDINATES[from] || { x: 450, y: 50 };
  const toCoord = NODE_COORDINATES[to] || { x: 450, y: 450 };
  return `M ${fromCoord.x} ${fromCoord.y} L ${toCoord.x} ${toCoord.y}`;
};

// Memoized stationary node card
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
              : 'bg-white/95 dark:bg-navy-900/95 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
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

  // Memoize deterministic orthogonal blueprint paths
  const blueprintEdges = useMemo(() => {
    return edges.map((edge) => {
      const pathString = computeOrthogonalPath(edge);
      return {
        ...edge,
        pathString,
      };
    });
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
    <div className="w-full flex flex-col gap-3">
      {/* Dedicated Graph Canvas Box */}
      <div className="relative w-full rounded-2xl bg-slate-100/70 dark:bg-navy-950/80 border border-slate-200 dark:border-white/10 p-3 sm:p-5 overflow-hidden flex flex-col items-center">
        {/* Background blueprint grid */}
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

        {/* Desktop / Tablet: Fixed Coordinate Graph Canvas */}
        <div className="hidden md:block relative w-full h-[520px]">
          {/* Optimized SVG Edge Canvas with Orthogonal Blueprint Routing */}
          <svg
            viewBox="0 0 900 520"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          >
            <defs>
              {/* Default subtle arrow marker */}
              <marker
                id="arch-arrow-default"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-slate-300 dark:fill-slate-700" />
              </marker>

              {/* Highlighted cyan arrow marker */}
              <marker
                id="arch-arrow-active"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1EC1CB" />
              </marker>
            </defs>

            {blueprintEdges.map((edge, idx) => {
              const highlighted = isEdgeHighlighted(edge);

              return (
                <g key={`${edge.from}-${edge.to}-${idx}`}>
                  {/* Routed orthogonal connector line */}
                  <path
                    d={edge.pathString}
                    fill="none"
                    stroke={highlighted ? '#1EC1CB' : 'currentColor'}
                    strokeWidth={highlighted ? 2.25 : 1.5}
                    strokeOpacity={highlighted ? 1 : 0.35}
                    markerEnd={highlighted ? 'url(#arch-arrow-active)' : 'url(#arch-arrow-default)'}
                    className={`transition-colors duration-200 ${
                      highlighted
                        ? 'stroke-cyan'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                    strokeDasharray={edge.animated ? '5 4' : 'none'}
                  />

                  {/* Animated pulse dot along highlighted active path */}
                  {highlighted && (
                    <circle r="4" fill="#1EC1CB">
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

      {/* Dedicated Instruction / Hover Status Bar (Independent layout space below canvas - NEVER overlaps cards) */}
      <div className="w-full p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 backdrop-blur-md flex items-center justify-between text-xs shadow-sm shrink-0">
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
            <Info size={13} className="text-cyan shrink-0" />
            <span>Hover over components to highlight connections. Click any node to inspect engineering rationale.</span>
          </div>
        )}
        <span className="text-[11px] font-mono text-cyan-muted dark:text-cyan shrink-0 hidden sm:inline ml-2">
          {mode === 'flow' ? 'Data Flow Mode' : 'System Overview'}
        </span>
      </div>
    </div>
  );
};

