import React, { useEffect } from 'react';
import { X, Printer } from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  const { personal, socials, experience, education, skillCategories } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="resume-modal-sheet"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1d1c1c] rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 sm:p-10 text-slate-900 dark:text-neutral-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-neutral-800 print:hidden">
          <span className="text-xs font-mono uppercase tracking-wider text-[#DD0004] dark:text-[#FD6568] font-bold">
            Resume Preview
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-slate-900 text-white dark:bg-white dark:text-[#131212] hover:bg-[#DD0004] dark:hover:bg-[#FD6568] transition-colors font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume */}
        <div id="printable-resume" className="space-y-8 font-sans">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-neutral-800 pb-5">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">
              {personal.name}
            </h2>
            <p className="text-sm text-[#DD0004] dark:text-[#FD6568] font-mono mt-0.5 font-semibold">
              {personal.role}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-500 dark:text-neutral-400">
              <span>{personal.location}</span>
              <span>•</span>
              <span>{socials.email}</span>
              {socials.github && (
                <>
                  <span>•</span>
                  <span>{socials.github}</span>
                </>
              )}
              {socials.linkedin && (
                <>
                  <span>•</span>
                  <span>{socials.linkedin}</span>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#DD0004] dark:text-[#FD6568] mb-2 font-bold">
              Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              {personal.detailedBio || personal.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#DD0004] dark:text-[#FD6568] mb-4 font-bold">
              Experience
            </h3>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {exp.position || exp.role} <span className="font-normal text-slate-400">at</span> {exp.company}
                    </span>
                    <span className="font-mono text-slate-400 dark:text-neutral-500">{exp.duration || exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">
                    {exp.description}
                  </p>
                  {(exp.content || exp.achievements) && (
                    <ul className="text-xs text-slate-600 dark:text-neutral-300 space-y-1 pt-1 list-disc list-inside">
                      {(exp.content || exp.achievements).map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#DD0004] dark:text-[#FD6568] mb-3 font-bold">
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{edu.degree}</span>
                    <span className="text-slate-500 dark:text-neutral-400 block">{edu.school || edu.institution}</span>
                  </div>
                  <span className="font-mono text-slate-400 dark:text-neutral-500">{edu.duration || edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#DD0004] dark:text-[#FD6568] mb-2 font-bold">
              Core Technologies
            </h3>
            <div className="space-y-1.5 text-xs">
              {skillCategories.map((cat, i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-semibold text-slate-400 dark:text-neutral-500 w-36 shrink-0">{cat.categoryName}:</span>
                  <span className="text-slate-700 dark:text-neutral-200 font-mono">
                    {cat.items.map((it) => it.name).join(' • ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
