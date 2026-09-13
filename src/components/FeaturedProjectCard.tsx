import React from 'react';
import { ProjectItem } from '../types';
import { Tags } from './Tags';
import { ProjectCardFooter } from './ProjectCardFooter';

export type ImagePosition = 'right' | 'left';

interface FeaturedProjectCardProps {
  project: ProjectItem;
  imagePosition: ImagePosition;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  project,
  imagePosition,
  onOpenProjectModal,
}) => {
  const isImageRight = imagePosition === 'right';

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
      id={`featured-project-${project.id}`}
      className={`py-12 sm:py-16 lg:py-24 flex flex-col-reverse ${
        isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } items-center justify-between gap-8 sm:gap-12 border-b border-slate-200/60 dark:border-neutral-800/80 last:border-b-0`}
    >
      {/* Content Column */}
      <div
        className={`flex-1 flex flex-col justify-between w-full ${
          isImageRight ? 'lg:pr-10' : 'lg:pl-10'
        }`}
      >
        <div>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h3>

          {(project.year || project.location) && (
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-neutral-400 font-mono">
              {project.year} {project.year && project.location && '•'} {project.location}
            </p>
          )}

          {/* Mobile Image (visible on mobile only) */}
          {isMobileProject ? (
            <div
              onClick={() => onOpenProjectModal(project)}
              className="mt-4 mb-3 block lg:hidden rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-neutral-800 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 dark:from-[#181717] dark:via-[#131212] dark:to-[#0f0e0e] p-3 sm:p-4 cursor-pointer"
            >
              <div className="flex items-center justify-center gap-3 h-56 sm:h-64">
                <div className="relative h-full w-[46%] max-w-[160px] rounded-xl overflow-hidden shadow-lg border border-slate-300/80 dark:border-neutral-700 bg-black">
                  <img
                    src={img1}
                    alt={`${project.title} screen 1`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="relative h-full w-[46%] max-w-[160px] rounded-xl overflow-hidden shadow-lg border border-slate-300/80 dark:border-neutral-700 bg-black">
                  <img
                    src={img2}
                    alt={`${project.title} screen 2`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-2 text-center text-xs font-mono text-slate-500 dark:text-neutral-400">
                Tap to preview fitted screens
              </div>
            </div>
          ) : (
            <div className="mt-4 mb-3 block lg:hidden rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-neutral-800 aspect-16/10 bg-slate-100 dark:bg-neutral-900">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-3">
            <Tags id={project.id} tags={project.tags} size="sm" />
          </div>
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

      {/* Desktop Image Column (visible on lg screens) */}
      <div
        className={`flex-1 hidden lg:block w-full ${
          isImageRight ? 'lg:pl-6' : 'lg:pr-6'
        }`}
      >
        {isMobileProject ? (
          <div
            onClick={() => onOpenProjectModal(project)}
            className="cursor-pointer group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-neutral-800 aspect-16/10 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 dark:from-[#181717] dark:via-[#131212] dark:to-[#0f0e0e] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] p-4 sm:p-6 flex items-center justify-center gap-4 sm:gap-6"
          >
            <div className="relative h-full w-[44%] max-w-[200px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-300/80 dark:border-neutral-700 bg-black transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
              <img
                src={img1}
                alt={`${project.title} screenshot 1`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="relative h-full w-[44%] max-w-[200px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-300/80 dark:border-neutral-700 bg-black transition-transform duration-500 group-hover:translate-y-1.5 group-hover:shadow-2xl">
              <img
                src={img2}
                alt={`${project.title} screenshot 2`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
              Dual Preview
            </div>
          </div>
        ) : (
          <div
            onClick={() => onOpenProjectModal(project)}
            className="cursor-pointer group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-neutral-800 aspect-16/10 bg-slate-100 dark:bg-neutral-900 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
          >
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/20 group-hover:opacity-0 transition-opacity" />
          </div>
        )}
      </div>
    </div>
  );
};
