import React, { useState } from 'react';
import { Volume2, Check } from 'lucide-react';
import { PortfolioData } from '../types';
import { ExpandableItem } from './ExpandableItem';
import { Tags } from './Tags';

interface AboutSectionProps {
  data: PortfolioData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const { personal, education, experience, skillCategories } = data;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePronounce = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Surendra');
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 1200);
    }
  };

  return (
    <div id="page-about" className="space-y-16">
      {/* Top Bio Section */}
      <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 pt-4">
        {/* Photo Container */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="max-w-[280px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-neutral-800 aspect-square bg-slate-100 dark:bg-neutral-900 group">
            <img
              src={personal.avatarUrl}
              alt="Surendra"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Bio Text */}
        <div className="flex-1">
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
            Surendra
          </h3>

          {/* Pronunciation */}
          <div className="flex items-center gap-2 mt-1 mb-4">
            <span className="text-sm font-bold font-mono text-slate-400 dark:text-neutral-500">
              {personal.pronunciation || '/su-ren-dra/'}
            </span>
            <button
              type="button"
              onClick={handlePronounce}
              aria-label="Listen to pronunciation"
              className="p-1 rounded text-slate-400 hover:text-[#DD0004] dark:hover:text-[#FD6568] transition-colors"
            >
              {isPlayingAudio ? (
                <Check className="w-4 h-4 text-[#DD0004] dark:text-[#FD6568]" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed font-sans">
            <p>
              {personal.detailedBio || personal.bio}
            </p>
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Currently engineering robust operational backends, building custom Model Context Protocol (MCP) integrations for transactional verification, and leading system architecture for high-volume order flows.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Education & Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pt-6">
        {/* Education Column */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white pb-6 border-b border-slate-200/80 dark:border-neutral-800">
            Education
          </h3>
          <div className="pt-6">
            {education.map((edu, idx) => (
              <ExpandableItem
                key={edu.id || `edu-${idx}`}
                id={edu.id || `edu-${idx}`}
                title={edu.school || edu.institution || 'University'}
                subTitle={edu.degree}
                date={edu.duration || edu.period || '2022 - Present'}
                content={
                  edu.content ||
                  (edu.details ? [edu.details] : ['Coursework and specialized academic research.'])
                }
              />
            ))}
          </div>
        </div>

        {/* Experience Column */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white pb-6 border-b border-slate-200/80 dark:border-neutral-800">
            Experiences
          </h3>
          <div className="pt-6">
            {experience.map((exp, idx) => (
              <ExpandableItem
                key={exp.id || `exp-${idx}`}
                id={exp.id || `exp-${idx}`}
                title={exp.company}
                subTitle={exp.position || exp.role || 'Software Engineer'}
                date={exp.duration || exp.period || '2023 - Present'}
                content={
                  exp.content ||
                  (exp.achievements && exp.achievements.length > 0
                    ? exp.achievements
                    : [exp.description])
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Skills Section */}
      <div className="pt-6">
        <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white pb-6 border-b border-slate-200/80 dark:border-neutral-800">
          Skills & Technologies
        </h3>

        <div className="pt-6 space-y-6">
          {skillCategories.map((cat, idx) => (
            <div key={`skill-cat-${idx}`}>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {cat.categoryName}
              </h4>
              <Tags
                id={`cat-${idx}`}
                tags={cat.items.map((i) => i.name)}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
