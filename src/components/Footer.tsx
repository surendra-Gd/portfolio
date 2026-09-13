import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PortfolioData } from '../types';
import { PageHeader } from './PageHeader';

interface FooterProps {
  data: PortfolioData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const { socials } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="page-contact" className="pt-8 pb-16">
      <PageHeader label="SAY HI" />

      <div className="space-y-6">
        {/* Giant Clickable Email Header */}
        <div className="overflow-hidden">
          <a
            href={`mailto:${socials.email}`}
            className="inline-block text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors break-all cursor-pointer"
          >
            {socials.email}
          </a>
        </div>

        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 max-w-xl leading-relaxed font-sans">
          If you want to know more about my experiences and journey, or just talk in general, get in touch! ✌️
        </p>

        {/* Social Icons Row */}
        <div className="pt-6 flex items-center gap-5 text-slate-700 dark:text-neutral-300">
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}

          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          )}

          {socials.email && (
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="p-2.5 rounded-lg hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
        </div>

        {/* Sub-Footer */}
        <div className="pt-12 mt-12 border-t border-slate-200/60 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-neutral-500">
          <p>This site is hand-crafted, with care by me.</p>
          <div className="flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-md hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
