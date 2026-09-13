import React from 'react';
import { ProjectItem } from '../types';
import { FeaturedProjectCard } from './FeaturedProjectCard';

interface FeaturedProjectsProps {
  projects: ProjectItem[];
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onOpenProjectModal,
}) => {
  const featured = projects.filter((p) => p.featured);

  return (
    <div id="featured-projects" className="space-y-4">
      {featured.map((project, idx) => (
        <FeaturedProjectCard
          key={project.id}
          project={project}
          imagePosition={idx % 2 === 0 ? 'right' : 'left'}
          onOpenProjectModal={onOpenProjectModal}
        />
      ))}
    </div>
  );
};
