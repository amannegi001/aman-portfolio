import React from 'react';
import { Github, ExternalLink, Layers, CheckCircle2, Clock, Users, ArrowRight, Network, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, index, onViewArchitecture, hasArchitecture }) => {
  const isFeatured = project.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300 group backdrop-blur-xl ${
        isFeatured
          ? 'bg-white/90 dark:bg-navy-900/80 border border-cyan/40 dark:border-cyan/30 shadow-xl shadow-cyan/5 hover:border-cyan/60'
          : 'bg-white/80 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
      }`}
    >
      {/* Background radial glow for featured card */}
      {isFeatured && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 dark:bg-cyan/10 rounded-full blur-3xl pointer-events-none -z-10" />
      )}

      {/* Top Meta Bar: Status / Badge & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
              project.inProgress
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'bg-cyan/10 text-cyan-muted dark:text-cyan border border-cyan/20'
            }`}
          >
            {project.inProgress ? <Clock size={12} /> : <CheckCircle2 size={12} />}
            {project.badge}
          </span>

          {project.isTeam && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-white/5">
              <Users size={12} className="text-cyan-muted dark:text-cyan" />
              Team Project
            </span>
          )}
        </div>

        {/* Action Buttons (Architecture CTA + Repository) */}
        <div className="flex items-center gap-2">
          {hasArchitecture && (
            <button
              type="button"
              onClick={() => onViewArchitecture(project.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan text-navy-950 text-xs font-bold hover:bg-cyan-hover shadow-sm hover:shadow-glow-cyan-sm transition-all"
              aria-label={`View interactive system architecture for ${project.title}`}
            >
              <Network size={14} />
              <span>View Architecture</span>
              <ArrowRight size={13} />
            </button>
          )}

          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-white/10 hover:border-cyan/40 hover:text-cyan-muted dark:hover:text-cyan transition-colors"
            >
              <Github size={14} />
              <span>Repository</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          )}
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2 group-hover:text-cyan-muted dark:group-hover:text-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-medium text-cyan-muted dark:text-cyan font-mono">
          {project.tagline}
        </p>
      </div>

      {/* Description Overview */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-4xl">
        {project.overview}
      </p>

      {/* Architecture Highlights Matrix */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Layers size={14} className="text-cyan-muted dark:text-cyan" />
            Key Architectural Modules & Implementation
          </h4>

          {hasArchitecture && (
            <button
              type="button"
              onClick={() => onViewArchitecture(project.id)}
              className="text-xs font-mono text-cyan-muted dark:text-cyan hover:underline hidden sm:inline-flex items-center gap-1"
            >
              <span>Explore Graph Mode</span>
              <ArrowRight size={12} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {project.architectureHighlights.map((hl, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 transition-all hover:border-cyan/30"
            >
              <h5 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                {hl.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {hl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Pills */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-2 uppercase tracking-wider">
          Tech Stack:
        </span>
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-navy-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
};
