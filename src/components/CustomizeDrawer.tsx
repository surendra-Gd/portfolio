import React, { useState } from 'react';
import { X, Trash2, Check } from 'lucide-react';
import { PortfolioData, ProjectItem } from '../types';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  onResetDefaults: () => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onResetDefaults,
}) => {
  const [tab, setTab] = useState<'profile' | 'projects'>('profile');
  const [saveBanner, setSaveBanner] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    category: 'fullstack',
    description: '',
    year: '2024',
    tags: [],
    liveUrl: '',
    githubUrl: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: false,
  });
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const triggerSave = () => {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2000);
  };

  const handlePersonalChange = (field: keyof PortfolioData['personal'], value: string) => {
    const updated = {
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    };
    onUpdateData(updated);
    triggerSave();
  };

  const handleSocialChange = (field: keyof PortfolioData['socials'], value: string) => {
    const updated = {
      ...data,
      socials: {
        ...data.socials,
        [field]: value,
      },
    };
    onUpdateData(updated);
    triggerSave();
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const tagsArray = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    const created: ProjectItem = {
      id: `custom-proj-${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      year: newProject.year || '2024',
      category: newProject.category || 'fullstack',
      tags: tagsArray.length > 0 ? tagsArray : ['Fullstack', 'TypeScript'],
      image: newProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      liveUrl: newProject.liveUrl || undefined,
      demo: newProject.liveUrl || undefined,
      githubUrl: newProject.githubUrl || undefined,
      github: newProject.githubUrl || undefined,
      featured: Boolean(newProject.featured),
    };

    onUpdateData({
      ...data,
      projects: [created, ...data.projects],
    });

    setNewProject({
      title: '',
      category: 'fullstack',
      description: '',
      year: '2024',
      tags: [],
      liveUrl: '',
      githubUrl: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      featured: false,
    });
    setTagInput('');
    triggerSave();
  };

  const handleDeleteProject = (id: string) => {
    onUpdateData({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
    triggerSave();
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="customize-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="customize-drawer-content"
        className="w-full max-w-md h-full bg-white dark:bg-[#1d1c1c] p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                Customize Profile Data
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Updates reflected immediately in template
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-neutral-800 my-4 text-xs font-mono">
            <button
              type="button"
              onClick={() => setTab('profile')}
              className={`py-2 px-4 border-b-2 font-semibold transition-colors ${
                tab === 'profile'
                  ? 'border-[#DD0004] dark:border-[#FD6568] text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-neutral-300'
              }`}
            >
              Personal Info
            </button>
            <button
              type="button"
              onClick={() => setTab('projects')}
              className={`py-2 px-4 border-b-2 font-semibold transition-colors ${
                tab === 'projects'
                  ? 'border-[#DD0004] dark:border-[#FD6568] text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-neutral-300'
              }`}
            >
              Manage Projects
            </button>
          </div>

          {/* Tab Content with scroll */}
          <div className="overflow-y-auto max-h-[calc(100vh-230px)] pr-2 space-y-4 text-xs">
            {tab === 'profile' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    value={data.personal.name}
                    onChange={(e) => handlePersonalChange('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">Headline</label>
                  <input
                    type="text"
                    value={data.personal.headline || ''}
                    onChange={(e) => handlePersonalChange('headline', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">Role Title</label>
                  <input
                    type="text"
                    value={data.personal.role}
                    onChange={(e) => handlePersonalChange('role', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">Bio Summary</label>
                  <textarea
                    rows={3}
                    value={data.personal.bio}
                    onChange={(e) => handlePersonalChange('bio', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">Location</label>
                  <input
                    type="text"
                    value={data.personal.location}
                    onChange={(e) => handlePersonalChange('location', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">Email</label>
                  <input
                    type="email"
                    value={data.socials.email}
                    onChange={(e) => handleSocialChange('email', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">GitHub URL</label>
                  <input
                    type="url"
                    value={data.socials.github}
                    onChange={(e) => handleSocialChange('github', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-neutral-400 mb-1 font-mono">LinkedIn URL</label>
                  <input
                    type="url"
                    value={data.socials.linkedin}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {tab === 'projects' && (
              <div className="space-y-4">
                <form onSubmit={handleAddProject} className="p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 space-y-2 bg-slate-50 dark:bg-neutral-900/50">
                  <span className="font-mono text-[11px] text-slate-400 uppercase font-semibold block">Add Project</span>
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g., 2024)"
                    value={newProject.year}
                    onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Concise description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Tags comma-separated (React, Node, AWS)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                  <label className="flex items-center gap-2 pt-1 text-slate-600 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      checked={Boolean(newProject.featured)}
                      onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                      className="rounded text-[#DD0004] focus:ring-0"
                    />
                    <span>Mark as Featured Project</span>
                  </label>
                  <button
                    type="submit"
                    className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-[#131212] hover:bg-[#DD0004] dark:hover:bg-[#FD6568] transition-colors"
                  >
                    Add Project
                  </button>
                </form>

                <div className="space-y-2">
                  {data.projects.map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-neutral-800 flex items-center justify-between"
                    >
                      <div className="truncate max-w-[260px]">
                        <span className="font-semibold text-slate-900 dark:text-white block truncate">{p.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {p.featured ? '★ Featured • ' : ''}{p.year || '2024'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
          {saveBanner ? (
            <span className="text-emerald-500 font-semibold inline-flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={onResetDefaults}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
