import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PortfolioData } from '../types';

interface NavbarProps {
  data: PortfolioData;
  onOpenCustomize?: () => void;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  onOpenResume,
  onToggleTheme,
  isDark,
}) => {
  const { personal, socials } = data;
  const [activeSection, setActiveSection] = useState<'work' | 'about' | ''>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const aboutEl = document.getElementById('page-about');
      const workEl = document.getElementById('page-work');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveSection('work');
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-40 transition-colors duration-200"
    >
      <div className="w-full bg-white/95 dark:bg-[#131212]/95 backdrop-blur-md border-b border-slate-200/60 dark:border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* LogoType matching template: Monogram on mobile, Full name on desktop */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group text-left focus:outline-none"
          >
            <span className="block sm:hidden text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#DD0004] dark:group-hover:text-[#FD6568] transition-colors">
              {personal.logoType?.mobile || 'SK'}
            </span>
            <span className="hidden sm:block text-2xl lg:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#DD0004] dark:group-hover:text-[#FD6568] transition-colors">
              {personal.logoType?.desktop || personal.name}
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              type="button"
              onClick={() => scrollToSection('page-work')}
              className={`text-base font-semibold transition-colors relative py-1 ${
                activeSection === 'work'
                  ? 'text-slate-900 dark:text-white font-bold'
                  : 'text-slate-700 dark:text-neutral-300 hover:text-[#DD0004] dark:hover:text-[#FD6568]'
              }`}
            >
              <span>Work</span>
              {activeSection === 'work' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DD0004] dark:bg-[#FD6568] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('page-about')}
              className={`text-base font-semibold transition-colors relative py-1 ${
                activeSection === 'about'
                  ? 'text-slate-900 dark:text-white font-bold'
                  : 'text-slate-700 dark:text-neutral-300 hover:text-[#DD0004] dark:hover:text-[#FD6568]'
              }`}
            >
              <span>About</span>
              {activeSection === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DD0004] dark:bg-[#FD6568] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="text-base font-semibold text-slate-700 dark:text-neutral-300 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors"
            >
              Resume
            </button>

            {/* Color Mode Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle light/dark theme"
              className="p-2 rounded-lg text-slate-700 dark:text-neutral-200 hover:text-[#DD0004] dark:hover:text-[#FD6568] hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Hamburger & Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-700 dark:text-neutral-200"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-lg text-[#DD0004] dark:text-[#FD6568]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden flex justify-end animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-drawer-content"
            className="w-4/5 max-w-sm h-screen h-[100dvh] bg-white dark:bg-[#131212] p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200 dark:border-neutral-800 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-neutral-800">
                <span className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                  {personal.logoType?.mobile || 'Surendra Gd'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                    className="p-2 rounded-lg text-slate-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="mt-12 flex flex-col items-center space-y-8 text-2xl font-semibold">
                <button
                  type="button"
                  onClick={() => scrollToSection('page-work')}
                  className={`hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors ${
                    activeSection === 'work' ? 'underline underline-offset-8 text-[#DD0004] dark:text-[#FD6568]' : 'text-slate-800 dark:text-neutral-200'
                  }`}
                >
                  Work
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('page-about')}
                  className={`hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors ${
                    activeSection === 'about' ? 'underline underline-offset-8 text-[#DD0004] dark:text-[#FD6568]' : 'text-slate-800 dark:text-neutral-200'
                  }`}
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="text-[#DD0004] dark:text-[#FD6568]"
                >
                  Resume
                </button>
              </div>
            </div>

            {/* Socials at bottom of drawer */}
            <div className="pt-8 border-t border-slate-200 dark:border-neutral-800 flex justify-center items-center gap-6 text-slate-600 dark:text-neutral-300">
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors" />
                </a>
              )}
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors" />
                </a>
              )}
              {socials.email && (
                <a href={`mailto:${socials.email}`}>
                  <Mail className="w-5 h-5 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
