import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { architectures } from '../data/architectureData';
import { ProjectCard } from './ProjectCard';
import { ArchitectureModal } from './architecture/ArchitectureModal';

export const Projects = () => {
  const [selectedArchitectureProject, setSelectedArchitectureProject] = useState(null);

  const handleOpenArchitecture = (projectId) => {
    setSelectedArchitectureProject(projectId);
  };

  const handleCloseArchitecture = () => {
    setSelectedArchitectureProject(null);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-cyan-muted dark:text-cyan font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <span>02</span>
            <span className="w-8 h-[1px] bg-cyan/50"></span>
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
            Architected for scalability, security, and performance.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Selected full-stack and systems projects demonstrating RESTful API development, state management, and real-time data handling. Click on <strong>View Architecture</strong> to explore interactive system diagrams.
          </p>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              hasArchitecture={Boolean(architectures[project.id])}
              onViewArchitecture={handleOpenArchitecture}
            />
          ))}
        </div>

      </div>

      {/* Interactive System Architecture Modal */}
      {selectedArchitectureProject && (
        <ArchitectureModal
          projectId={selectedArchitectureProject}
          isOpen={Boolean(selectedArchitectureProject)}
          onClose={handleCloseArchitecture}
        />
      )}
    </section>
  );
};
