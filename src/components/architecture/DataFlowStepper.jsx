import React from 'react';
import { ArrowRight, ArrowLeft, Play, Pause, Activity } from 'lucide-react';

export const DataFlowStepper = ({
  steps,
  currentStepIndex,
  onChangeStep,
  isPlaying,
  onTogglePlay,
}) => {
  const currentStep = steps[currentStepIndex] || steps[0];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-navy-900/80 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
      
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan/10 text-cyan-muted dark:text-cyan">
            <Activity size={16} />
          </div>
          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
            Request Lifecycle Trace
          </span>
          <span className="text-xs font-mono text-cyan-muted dark:text-cyan px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/20">
            Step {currentStep.step} of {steps.length}
          </span>
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center gap-2">
          {/* Main Autoplay Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 shadow-sm ${
              isPlaying
                ? 'bg-cyan text-navy-950 shadow-glow-cyan-sm ring-2 ring-cyan/40 animate-pulse'
                : 'bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 hover:text-cyan border border-slate-200 dark:border-white/10 hover:border-cyan/40'
            }`}
            title={isPlaying ? 'Click to stop autoplay' : 'Start guided autoplay walkthrough'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Stop Autoplay' : 'Autoplay'}</span>
          </button>

          {/* Previous Step */}
          <button
            disabled={currentStepIndex === 0}
            onClick={() => onChangeStep((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-cyan disabled:opacity-40 disabled:pointer-events-none border border-slate-200 dark:border-white/5 transition-colors"
            aria-label="Previous step"
          >
            <ArrowLeft size={14} />
          </button>

          {/* Next Step */}
          <button
            disabled={currentStepIndex === steps.length - 1}
            onClick={() => onChangeStep((prev) => Math.min(steps.length - 1, prev + 1))}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-cyan disabled:opacity-40 disabled:pointer-events-none border border-slate-200 dark:border-white/5 transition-colors"
            aria-label="Next step"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Step Buttons Tracker */}
      <div className="grid grid-cols-5 gap-1.5">
        {steps.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          return (
            <button
              key={s.step}
              onClick={() => onChangeStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-cyan ring-2 ring-cyan/40 shadow-glow-cyan-sm'
                  : isPassed
                  ? 'bg-cyan/40 dark:bg-cyan/40'
                  : 'bg-slate-200 dark:bg-navy-800'
              }`}
              title={`Step ${s.step}: ${s.title}`}
              aria-label={`Jump to step ${s.step}`}
            />
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          {currentStep.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentStep.summary}
        </p>

        {currentStep.codeSnippet && (
          <div className="mt-1 p-2.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] border border-slate-800 overflow-x-auto whitespace-pre">
            {currentStep.codeSnippet}
          </div>
        )}
      </div>

    </div>
  );
};
