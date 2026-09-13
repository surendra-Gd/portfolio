import { useState, useEffect } from 'react';
import { PortfolioData, ProjectItem } from './types';
import { defaultPortfolio } from './data/defaultPortfolio';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { PageHeader } from './components/PageHeader';
import { FeaturedProjects } from './components/FeaturedProjects';
import { OtherProjects } from './components/OtherProjects';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';

const STORAGE_KEY = 'portfolio_template_v2_data_surendra_v15';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure it's not stale from the earlier template
        if (parsed?.personal?.name?.includes('Surendra') && parsed?.projects?.length >= 5) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse saved portfolio data', e);
    }
    return defaultPortfolio;
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Sync dark mode class on HTML document root and color-scheme
  useEffect(() => {
    const isDark = data.theme.darkMode;
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      document.body.className = 'bg-[#131212] text-neutral-200 transition-colors duration-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      document.body.className = 'bg-white text-slate-800 transition-colors duration-200';
    }
  }, [data.theme.darkMode]);

  const handleToggleTheme = () => {
    const updated: PortfolioData = {
      ...data,
      theme: {
        ...data.theme,
        darkMode: !data.theme.darkMode,
      },
    };
    setData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist theme change', e);
    }
  };

  const handleUpdateData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Could not persist updated portfolio data', e);
    }
  };

  const handleResetDefaults = () => {
    setData(defaultPortfolio);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not reset local storage', e);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#131212] transition-colors duration-200 font-sans selection:bg-[#DD0004] selection:text-white dark:selection:bg-[#FD6568] dark:selection:text-black">
      {/* Fixed Navbar matching template */}
      <Navbar
        data={data}
        onOpenCustomize={() => setCustomizeOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onToggleTheme={handleToggleTheme}
        isDark={data.theme.darkMode}
      />

      {/* Main Container: container.xl max width with standard responsive padding */}
      <main className="max-w-6xl mx-auto px-6 sm:px-8 pt-24 sm:pt-36">
        
        {/* Landing Section */}
        <Landing
          data={data}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Work Section */}
        <section id="page-work" className="scroll-mt-24">
          <PageHeader label="FEATURED PROJECTS" />
          <FeaturedProjects
            projects={data.projects}
            onOpenProjectModal={(p) => setSelectedProject(p)}
          />

          <PageHeader id="page-other-projects" label="OTHER PROJECTS" />
          <OtherProjects
            projects={data.projects}
            onOpenProjectModal={(p) => setSelectedProject(p)}
            onOpenInquiryModal={() => setInquiryModalOpen(true)}
          />
        </section>

        {/* About Section */}
        <section id="page-about" className="scroll-mt-24">
          <PageHeader label="ABOUT ME" />
          <AboutSection data={data} />
        </section>

        {/* Footer (SAY HI) */}
        <Footer data={data} />

      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Project Request / Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        recipientEmail={data.socials.email}
        recipientName={data.personal.name}
      />

      {/* Printable Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        data={data}
      />

      {/* Quick Customize Drawer */}
      <CustomizeDrawer
        isOpen={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
