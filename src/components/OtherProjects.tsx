import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectItem } from '../types';
import { OtherProjectCard } from './OtherProjectCard';

interface OtherProjectsProps {
  projects: ProjectItem[];
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenInquiryModal: () => void;
}

const INITIAL_COUNT = 3;
const INCREMENT = 3;

export const OtherProjects: React.FC<OtherProjectsProps> = ({
  projects,
  onOpenProjectModal,
  onOpenInquiryModal,
}) => {
  // Show non-featured projects or all projects if few are non-featured
  const nonFeatured = projects.filter((p) => !p.featured);
  const items = nonFeatured.length >= 2 ? nonFeatured : projects;

  const [count, setCount] = useState<number>(INITIAL_COUNT);

  const handleSeeMore = () => {
    // If there are more items in the list, expand them
    if (count < items.length) {
      setCount((prev) => Math.min(prev + INCREMENT, items.length));
    }
    // Open the project inquiry modal asking what kind of thing is needed
    onOpenInquiryModal();
  };

  const handleShowLess = () => {
    setCount(INITIAL_COUNT);
    const el = document.getElementById('page-other-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="other-projects">
      <div>
        {items.slice(0, count).map((project) => (
          <OtherProjectCard
            key={project.id}
            project={project}
            onOpenProjectModal={onOpenProjectModal}
          />
        ))}
      </div>

      {/* See More with Arrow at the end of other projects, matching first section arrow */}
      <div className="mt-14 sm:mt-20 flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleSeeMore}
          aria-label="See more"
          className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-all duration-200"
        >
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 group-hover:text-[#DD0004] dark:group-hover:text-[#FD6568] transition-colors">
            See more
          </span>
          <div className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#222020] transition-all duration-200 animate-bounce">
            <ChevronDown className="w-8 h-8 stroke-[1.5]" />
          </div>
        </button>

        {count > INITIAL_COUNT && (
          <button
            type="button"
            onClick={handleShowLess}
            className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors mt-2"
          >
            <span>Show Less</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
