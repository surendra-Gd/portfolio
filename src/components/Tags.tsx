import React from 'react';

interface TagsProps {
  id: string;
  tags: string[];
  size?: 'xs' | 'sm';
}

export const Tags: React.FC<TagsProps> = ({ id, tags, size = 'sm' }) => {
  const isXs = size === 'xs';

  return (
    <div className="py-2.5 flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span
          key={`${id}-tag-${tag}-${idx}`}
          className={`font-mono font-semibold rounded-md transition-all duration-200 cursor-default ${
            isXs ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-slate-100 dark:bg-[#222020] text-slate-700 dark:text-neutral-300 hover:bg-[#DD0004] dark:hover:bg-[#FD6568] hover:text-white dark:hover:text-[#131212]` }
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
