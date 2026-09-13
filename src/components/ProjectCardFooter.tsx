import React from 'react';
import { ArrowRight, ExternalLink, Github, Mail } from 'lucide-react';

interface ProjectCardFooterProps {
  demo?: string;
  github?: string;
  readMore?: string;
  onReadMoreClick?: () => void;
  knowMoreMailto?: string;
  knowMoreLabel?: string;
}

export const ProjectCardFooter: React.FC<ProjectCardFooterProps> = ({
  demo,
  github,
  readMore,
  onReadMoreClick,
  knowMoreMailto,
  knowMoreLabel,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-auto">
      {/* Left side: Overview / Read More */}
      <div>
        {readMore && (
          <button
            type="button"
            onClick={onReadMoreClick}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors"
          >
            <span>Overview</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Right side: Live Demo, GitHub, or Know More */}
      <div className="flex flex-wrap items-center gap-2">
        {knowMoreMailto && (
          <a
            href={knowMoreMailto}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#DD0004] text-white dark:bg-[#FD6568] dark:text-[#131212] hover:bg-rose-700 dark:hover:bg-rose-400 transition-colors shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{knowMoreLabel || 'Know More'}</span>
          </a>
        )}

        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-neutral-800 dark:text-neutral-100 hover:bg-[#DD0004] dark:hover:bg-[#FD6568] dark:hover:text-[#131212] transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </a>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 dark:bg-[#222020] dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-[#2A2727] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};


