import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { Tags } from './Tags';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'single' | 'dual'>('single');

  useEffect(() => {
    setActiveImageIdx(0);
    setViewMode('single');
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const isMobileProject = [
    'featured-project-inspace',
    'featured-project-localshare',
    'other-project-timelog',
  ].includes(project.id);

  // Combine single image and extra images if available
  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const currentImage = allImages[activeImageIdx] || project.image;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          isMobileProject ? 'max-w-4xl' : 'max-w-3xl'
        } max-h-[92vh] overflow-y-auto bg-white dark:bg-[#1b1a1a] rounded-2xl border border-slate-200 dark:border-neutral-800 p-5 sm:p-8 shadow-2xl text-slate-800 dark:text-neutral-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover / Multi-Image Gallery */}
        {!isMobileProject ? (
          /* Normal standard preview for regular projects (TotalFresh, AI Financial Workflow, LeadRadar, Websites, etc.) */
          <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-100 dark:bg-neutral-900 mb-4 border border-slate-200 dark:border-neutral-800 group">
            <img
              src={currentImage}
              alt={`${project.title} preview ${activeImageIdx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />

            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === activeImageIdx ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Mobile Project Gallery Stage (InSpace, Localshare, TimeLog only) */
          <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-neutral-800 flex items-center justify-center p-3 sm:p-6 shadow-inner bg-neutral-950 dark:bg-black min-h-[380px] sm:min-h-[480px] max-h-[66vh]">
            {/* Dual or Single Display */}
            {viewMode === 'dual' && allImages.length >= 2 ? (
              <div className="flex items-center justify-center gap-3 sm:gap-6 w-full h-full max-h-[58vh]">
                <div className="h-full max-h-[58vh] flex items-center justify-center">
                  <img
                    src={allImages[0]}
                    alt={`${project.title} screen 1`}
                    referrerPolicy="no-referrer"
                    className="max-h-[56vh] w-auto max-w-[46vw] sm:max-w-[320px] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
                  />
                </div>
                <div className="h-full max-h-[58vh] flex items-center justify-center">
                  <img
                    src={allImages[1]}
                    alt={`${project.title} screen 2`}
                    referrerPolicy="no-referrer"
                    className="max-h-[56vh] w-auto max-w-[46vw] sm:max-w-[320px] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
                  />
                </div>
              </div>
            ) : (
              <img
                src={currentImage}
                alt={`${project.title} preview ${activeImageIdx + 1}`}
                referrerPolicy="no-referrer"
                className="max-h-[56vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10 transition-all duration-300"
              />
            )}

            {/* View mode toggle for mobile apps with >= 2 images */}
            {allImages.length >= 2 && (
              <div className="absolute top-3 left-3 z-10 flex items-center bg-black/75 backdrop-blur-md rounded-lg p-1 border border-white/15 shadow-md">
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                    viewMode === 'single'
                      ? 'bg-[#DD0004] text-white dark:bg-[#FD6568] dark:text-black font-semibold shadow-xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Fitted Screen
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('dual')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                    viewMode === 'dual'
                      ? 'bg-[#DD0004] text-white dark:bg-[#FD6568] dark:text-black font-semibold shadow-xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Dual Screens
                </button>
              </div>
            )}

            {/* Image navigation controls if multiple images and in single mode */}
            {allImages.length > 1 && viewMode === 'single' && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === activeImageIdx ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Thumbnail strip if multiple images */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveImageIdx(idx);
                  setViewMode('single');
                }}
                className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  isMobileProject ? 'w-14 h-24' : 'w-20 h-12'
                } ${
                  idx === activeImageIdx && (!isMobileProject || viewMode === 'single')
                    ? 'border-[#DD0004] dark:border-[#FD6568] scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Title and Meta */}
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          {project.title}
        </h3>

        {(project.year || project.location) && (
          <p className="mt-1 text-sm font-mono text-slate-400 dark:text-neutral-500">
            {project.year} {project.year && project.location && '•'} {project.location}
          </p>
        )}

        {/* Tags */}
        <div className="mt-3">
          <Tags id={`modal-${project.id}`} tags={project.tags} size="sm" />
        </div>

        {/* Description */}
        <div className="mt-5 space-y-3 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed font-sans">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-neutral-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-3 font-semibold">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-neutral-300">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#DD0004] dark:text-[#FD6568] mt-1 text-xs">●</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Links */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-neutral-800 flex flex-wrap items-center gap-3">
          {(project.knowMoreMailto || project.id === 'featured-project-mcp-finance') && (
            <a
              href={
                project.knowMoreMailto ||
                'mailto:surendraindian83@gmail.com?subject=Inquiry%20regarding%20AI%20Financial%20Workflows%20%26%20MCP%20Automations&body=Hi%20Surendra,%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about%20your%20work%20on%20AI%20Financial%20Workflows%20and%20MCP%20Automations.%0D%0A%0D%0ARegards,'
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#DD0004] text-white dark:bg-[#FD6568] dark:text-[#131212] hover:bg-rose-700 dark:hover:bg-rose-400 transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{project.knowMoreLabel || 'Know More'}</span>
            </a>
          )}

          {(project.demo || project.liveUrl) && (
            <a
              href={project.demo || project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-[#131212] hover:bg-[#DD0004] dark:hover:bg-[#FD6568] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}

          {(project.github || project.githubUrl) && (
            <a
              href={project.github || project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 dark:bg-[#222020] dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-[#2A2727] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Source</span>
            </a>
          )}

          {project.additionalLinks &&
            project.additionalLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-neutral-800 hover:border-[#DD0004] dark:hover:border-[#FD6568] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

