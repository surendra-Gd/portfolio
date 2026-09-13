import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Mail,
  Smartphone,
  Globe,
  Server,
  Bot,
  Wrench,
  Briefcase,
  Sparkles,
  Check,
  Copy,
  Clock,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
  recipientName: string;
}

interface CategoryOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'mobile',
    label: 'Mobile Application',
    sublabel: 'Android (Kotlin) / React Native',
    icon: Smartphone,
  },
  {
    id: 'web',
    label: 'Full-Stack Web App',
    sublabel: 'React, TypeScript, Laravel, Java',
    icon: Globe,
  },
  {
    id: 'backend',
    label: 'Backend & Cloud Infrastructure',
    sublabel: 'Java Spring Boot, AWS, Microservices',
    icon: Server,
  },
  {
    id: 'ai-mcp',
    label: 'AI & MCP Servers',
    sublabel: 'Model Context Protocol, LLM integration',
    icon: Bot,
  },
  {
    id: 'hiring',
    label: 'Full-Time / Engineering Role',
    sublabel: 'Software Engineer opportunity',
    icon: Briefcase,
  },
  {
    id: 'maintenance',
    label: 'Refactor / Cloud Migration',
    sublabel: 'Optimization, AWS setup, bug fixes',
    icon: Wrench,
  },
  {
    id: 'other',
    label: 'Other / Custom Collaboration',
    sublabel: 'Consulting or general inquiry',
    icon: Sparkles,
  },
];

const TIMELINES = ['Urgent (ASAP)', '1-2 Weeks', '1-3 Months', 'Flexible'];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  recipientEmail,
  recipientName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('web');
  const [timeline, setTimeline] = useState<string>('Flexible');
  const [senderName, setSenderName] = useState<string>('');
  const [senderContact, setSenderContact] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const buildEmailSubject = () => {
    const prefix = senderName.trim() ? `[${senderName.trim()}] ` : '';
    return `${prefix}Project Inquiry: ${currentCategory.label}`;
  };

  const buildEmailBody = () => {
    const lines = [
      `Hi ${recipientName},`,
      '',
      `I am interested in collaborating with you regarding: ${currentCategory.label} (${currentCategory.sublabel}).`,
      '',
      timeline ? `Timeline / Urgency: ${timeline}` : '',
      senderName.trim() ? `My Name / Organization: ${senderName.trim()}` : '',
      senderContact.trim() ? `My Contact Info: ${senderContact.trim()}` : '',
      '',
      'Project Details & Requirements:',
      details.trim() || '(No specific details provided yet, please follow up with me.)',
      '',
      'Looking forward to hearing from you!',
    ].filter((line) => line !== null);

    return lines.join('\n');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(buildEmailSubject());
    const body = encodeURIComponent(buildEmailBody());
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    const textToCopy = `To: ${recipientEmail}\nSubject: ${buildEmailSubject()}\n\n${buildEmailBody()}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div
      id="project-inquiry-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-inquiry-modal-container"
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#1b1a1a] rounded-2xl border border-slate-200 dark:border-neutral-800 p-5 sm:p-8 shadow-2xl text-slate-800 dark:text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-[#DD0004] dark:text-[#FD6568] text-xs font-mono font-semibold uppercase tracking-wider mb-2 border border-red-200/60 dark:border-red-900/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a Conversation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            What kind of project do you need?
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            Select what you have in mind and send an email directly to{' '}
            <strong className="text-slate-900 dark:text-white font-mono">{recipientEmail}</strong>.
          </p>
        </div>

        {/* Step 1: Category Selection ("Which kind of thing is needed?") */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 mb-3">
            1. Select Requirement Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-[#DD0004] dark:border-[#FD6568] bg-red-50/50 dark:bg-[#261818] shadow-xs'
                      : 'border-slate-200 dark:border-neutral-800 bg-slate-50/70 dark:bg-[#201f1f] hover:border-slate-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-[#DD0004] text-white dark:bg-[#FD6568] dark:text-black'
                        : 'bg-white dark:bg-[#141313] text-slate-600 dark:text-neutral-300 border border-slate-200/80 dark:border-neutral-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold truncate ${
                          isSelected
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-neutral-200'
                        }`}
                      >
                        {cat.label}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#DD0004] dark:text-[#FD6568] shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                      {cat.sublabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Timeline Preference */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>2. Estimated Timeline</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeline(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  timeline === t
                    ? 'border-[#DD0004] dark:border-[#FD6568] bg-[#DD0004] text-white dark:bg-[#FD6568] dark:text-black font-semibold'
                    : 'border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#201f1f] text-slate-600 dark:text-neutral-300 hover:border-slate-300 dark:hover:border-neutral-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Optional Contact and Details */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 mb-1.5"
              >
                Your Name or Company <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. John Doe / Acme Inc."
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#201f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-hidden focus:border-[#DD0004] dark:focus:border-[#FD6568]"
              />
            </div>
            <div>
              <label
                htmlFor="inquiry-contact"
                className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 mb-1.5"
              >
                Your Email or Phone <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="inquiry-contact"
                type="text"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#201f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-hidden focus:border-[#DD0004] dark:focus:border-[#FD6568]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="inquiry-details"
              className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 mb-1.5 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Project Details or Specific Goals</span>
            </label>
            <textarea
              id="inquiry-details"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={`Tell Surendra about your vision for this ${currentCategory.label.toLowerCase()}...`}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#201f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-hidden focus:border-[#DD0004] dark:focus:border-[#FD6568] resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Sends to: <span className="font-mono text-slate-700 dark:text-neutral-300 font-semibold">{recipientEmail}</span></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 bg-white dark:bg-[#222020] text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-colors shadow-xs"
              title="Copy message draft and email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Draft</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#DD0004] hover:bg-[#b00003] dark:bg-[#FD6568] dark:hover:bg-[#ff7d80] text-white dark:text-black font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
