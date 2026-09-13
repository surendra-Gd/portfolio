import React from 'react';
import { ProjectItem } from '../types';
import { Tags } from './Tags';
import { ProjectCardFooter } from './ProjectCardFooter';

interface OtherProjectCardProps {
  project: ProjectItem;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const OtherProjectCard: React.FC<OtherProjectCardProps> = ({
  project,
  onOpenProjectModal,
}) => {
  const isMobileProject = [
    'featured-project-inspace',
    'featured-project-localshare',
    'other-project-timelog',
  ].includes(project.id);

  const imagesList = project.images && project.images.length > 0 ? project.images : [project.image];
  const img1 = imagesList[0] || project.image;
  const img2 = imagesList.length > 1 ? imagesList[1] : img1;

  return (
    <div
      id={`other-project-card-${project.id}`}
      className="py-8 border-b border-slate-200/60 dark:border-neutral-800/80 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
    >
      {/* Thumbnail on md+ screens */}
      {project.image && (
        isMobileProject ? (
          <div
            onClick={() => onOpenProjectModal(project)}
            className="hidden md:flex w-52 shrink-0 rounded-xl overflow-hidden aspect-16/10 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 dark:from-[#1b1a1a] dark:to-[#111010] border border-slate-200 dark:border-neutral-800 items-center justify-center gap-2 p-2.5 cursor-pointer group shadow-xs hover:shadow-md transition-all"
            title="Click to view full preview"
          >
            <div className="relative w-[45%] h-[92%] rounded-md overflow-hidden shadow-sm border border-slate-300/80 dark:border-neutral-700 bg-black">
              <img
                src={img1}
                alt={`${project.title} screen 1`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="relative w-[45%] h-[92%] rounded-md overflow-hidden shadow-sm border border-slate-300/80 dark:border-neutral-700 bg-black">
              <img
                src={img2}
                alt={`${project.title} screen 2`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => onOpenProjectModal(project)}
            className="hidden md:block w-48 shrink-0 rounded-xl overflow-hidden aspect-16/10 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 cursor-pointer group shadow-xs"
          >
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )
      )}

      {/* Mobile view dual preview for mobile projects */}
      {isMobileProject && (
        <div
          onClick={() => onOpenProjectModal(project)}
          className="block md:hidden w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 dark:from-[#1a1919] dark:to-[#111010] border border-slate-200 dark:border-neutral-800 p-3 cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-center gap-3 h-48">
            <div className="relative h-full w-[44%] max-w-[130px] rounded-lg overflow-hidden shadow-sm border border-slate-300/80 dark:border-neutral-700 bg-black">
              <img
                src={img1}
                alt={`${project.title} screen 1`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="relative h-full w-[44%] max-w-[130px] rounded-lg overflow-hidden shadow-sm border border-slate-300/80 dark:border-neutral-700 bg-black">
              <img
                src={img2}
                alt={`${project.title} screen 2`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3
              onClick={() => onOpenProjectModal(project)}
              className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors cursor-pointer"
            >
              {project.title}
            </h3>
            {project.year && (
              <span className="text-xs font-mono text-slate-400 dark:text-neutral-500">
                {project.year}
              </span>
            )}
          </div>

          <p className="py-2 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            {project.description}
          </p>

          <Tags id={project.id} tags={project.tags} size="xs" />
        </div>

        <ProjectCardFooter
          demo={project.demo || project.liveUrl}
          github={project.github || project.githubUrl}
          readMore={project.readMore || project.id}
          knowMoreMailto={project.knowMoreMailto}
          knowMoreLabel={project.knowMoreLabel}
          onReadMoreClick={() => onOpenProjectModal(project)}
        />
      </div>
    </div>
  );
};
