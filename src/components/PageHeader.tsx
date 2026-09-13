import React from 'react';

interface PageHeaderProps {
  id?: string;
  label: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ id, label }) => {
  return (
    <div
      id={id}
      className="pt-20 sm:pt-28 pb-10 sm:pb-14 flex items-center gap-3"
    >
      <span className="w-16 sm:w-20 border-b-2 border-slate-400 dark:border-neutral-500 inline-block -translate-y-0.5" />
      <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-mono">
        {label}
      </h2>
    </div>
  );
};
