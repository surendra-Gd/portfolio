import React, { useState } from 'react';

interface ExpandableItemProps {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  content: string[];
}

export const ExpandableItem: React.FC<ExpandableItemProps> = ({
  id,
  title,
  subTitle,
  date,
  content,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const firstPoint = content[0] || '';
  const remainingPoints = content.slice(1);
  const hasMore = remainingPoints.length > 0;

  return (
    <div
      id={`expandable-${id}`}
      className="mb-6 pb-4 border-b border-slate-200/60 dark:border-neutral-800/80 last:border-b-0"
    >
      <div className="flex flex-col">
        {/* Title / Institution or Company */}
        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans">
          {title}
        </h4>

        {/* Subtitle / Role or Degree */}
        <p className="text-sm font-medium text-slate-700 dark:text-neutral-300 mt-0.5">
          {subTitle}
        </p>

        {/* Date / Duration */}
        <p className="text-xs font-mono font-semibold text-slate-400 dark:text-neutral-500 mt-1">
          {date}
        </p>

        {/* Content list */}
        <div className="pt-2 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
          {!isExpanded ? (
            <div className="flex items-start justify-between gap-3">
              <p className="line-clamp-2">{firstPoint}</p>
              {hasMore && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="shrink-0 text-xs font-semibold text-slate-400 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors mt-0.5"
                >
                  See more
                </button>
              )}
            </div>
          ) : (
            <div>
              <ul className="list-disc list-outside pl-4 space-y-1.5">
                {content.map((point, idx) => (
                  <li key={`${id}-point-${idx}`} className="text-sm text-slate-600 dark:text-neutral-300">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs font-semibold text-slate-400 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors"
                >
                  See less
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
