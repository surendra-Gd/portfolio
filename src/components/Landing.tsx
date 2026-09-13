import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PortfolioData } from '../types';

interface LandingProps {
  data: PortfolioData;
  onOpenResume: () => void;
}

export const Landing: React.FC<LandingProps> = ({ data, onOpenResume }) => {
  const { personal, socials } = data;

  const scrollToWork = () => {
    const el = document.getElementById('page-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="page-landing" className="pt-12 sm:pt-20 pb-12 sm:pb-24">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
        
        {/* Left Column: Headline, Bio & Socials */}
        <div className="flex-1 max-w-2xl">
          {/* Headline in Signature Playfair Display Serif */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight">
            {personal.headline || `Hello, I'm ${personal.name}.`}
          </h1>

          {/* Narrative Content */}
          <div className="mt-8 space-y-4 text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed font-sans">
            <p>
              Welcome 👋 I'm a <span className="italic font-medium text-slate-900 dark:text-white">{personal.role || 'Full Stack Developer'}</span> based out of India. I specialize in building <strong className="font-bold text-slate-900 dark:text-white">Operational Backends</strong>, <strong className="font-bold text-slate-900 dark:text-white">Model Context Protocol (MCP)</strong> systems, and tailored AI-driven workflow solutions to help businesses move beyond spreadsheets.
            </p>

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 pt-2 font-mono">
              I'm currently working with:
            </p>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-sm font-medium text-slate-700 dark:text-neutral-200">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD0004] dark:bg-[#FD6568]" />
                <span>React (TS)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD0004] dark:bg-[#FD6568]" />
                <span>Node.js / Express</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD0004] dark:bg-[#FD6568]" />
                <span>MCP Servers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD0004] dark:bg-[#FD6568]" />
                <span>FastAPI / Python</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD0004] dark:bg-[#FD6568]" />
                <span>PostgreSQL & MySQL</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD0004] dark:bg-[#FD6568]" />
                <span>AWS & WebSockets</span>
              </li>
            </ul>
          </div>

          {/* Socials & Resume CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenResume}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-[#131212] hover:bg-[#DD0004] dark:hover:bg-[#FD6568] transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>

            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl text-slate-700 dark:text-neutral-300 hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl text-slate-700 dark:text-neutral-300 hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="p-3 rounded-xl text-slate-700 dark:text-neutral-300 hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Profile Picture */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="max-w-[340px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-neutral-800 aspect-square bg-slate-100 dark:bg-neutral-900 group">
            <img
              src={personal.landingPicture || personal.avatarUrl}
              alt={personal.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Down Arrow Button at bottom center */}
      <div className="mt-16 sm:mt-24 flex justify-center">
        <button
          type="button"
          onClick={scrollToWork}
          aria-label="Scroll down to work"
          className="p-3 rounded-full text-slate-400 hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-[#222020] transition-all duration-200 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
};
