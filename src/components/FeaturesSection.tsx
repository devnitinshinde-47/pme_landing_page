'use client';

import React from 'react';
import { Video, BookOpen, Smartphone, HelpCircle, Award, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Video className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      title: 'Interactive Live Classes',
      description: 'Engage in live interactive sessions with Prof. Pawan Mate with real-time doubt resolution and step-by-step guidance.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      title: 'Exam-Oriented Syllabus',
      description: 'Curriculum specifically aligned with MSBTE Polytechnic Diploma & SPPU / Pune University marking schemes.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      title: 'Dedicated Mobile App',
      description: 'Stream HD lectures on mobile, download videos for offline viewing, and study anytime, anywhere.',
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      title: '1-on-1 Numerical Guidance',
      description: 'Step-by-step problem-solving methods for complex engineering mechanics, mathematics, and design subjects.',
    },
    {
      icon: <Award className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      title: 'Proven Track Record',
      description: 'Guiding over 10,000+ diploma & degree engineering students to achieve top marks and university distinctions.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
      title: 'Notes & Formula Cheat-Sheets',
      description: 'Access curated handwritten lecture notes, formula sheets, key question banks, and past exam solutions.',
    },
  ];

  return (
    <section id="features" className="section-wrapper bg-white dark:bg-zinc-950 py-14 sm:py-18 border-b border-zinc-200 dark:border-zinc-800">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-800">
            <ShieldCheck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span>Why Pawan Mate Education</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Designed for Student Success
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal">
            Everything you need for academic excellence, concept clarity, and top exam scores.
          </p>
        </div>

        {/* Features 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-zinc-50/70 dark:bg-zinc-900/60 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-2xs">
                {feature.icon}
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
