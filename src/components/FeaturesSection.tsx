'use client';

import React from 'react';
import { Video, BookOpen, Smartphone, HelpCircle, Award, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Video className="w-6 h-6 text-blue-600" />,
      title: 'Interactive Live Classes',
      description: 'Engage in live interactive sessions with Prof. Pawan Mate with real-time doubt resolution and step-by-step guidance.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: 'Exam-Oriented Syllabus',
      description: 'Curriculum specifically aligned with MSBTE Polytechnic Diploma & SPPU / Pune University marking schemes.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-600" />,
      title: 'Dedicated Mobile App',
      description: 'Stream HD lectures on mobile, download videos for offline viewing, and study anytime, anywhere.',
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-blue-600" />,
      title: '1-on-1 Numerical Guidance',
      description: 'Step-by-step problem-solving methods for complex engineering mechanics, mathematics, and design subjects.',
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Proven Track Record',
      description: 'Guiding over 10,000+ diploma & degree engineering students to achieve top marks and university distinctions.',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: 'Notes & Formula Cheat-Sheets',
      description: 'Access curated handwritten lecture notes, formula sheets, key question banks, and past exam solutions.',
    },
  ];

  return (
    <section id="features" className="section-wrapper bg-blue-50/40 py-14 sm:py-20 border-b border-slate-200/80">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50 text-blue-800 text-xs font-extrabold rounded-full border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Why Pawan Mate Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0f2c59] tracking-tight">
            Designed for Student Success
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Everything you need for academic excellence, concept clarity, and top exam scores.
          </p>
        </div>

        {/* Features 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50/90 border border-blue-100/90 flex items-center justify-center group-hover:bg-[#0f2c59] group-hover:text-white transition-colors">
                {React.cloneElement(feature.icon, {
                  className: "w-6 h-6 text-[#0f2c59] group-hover:text-white transition-colors"
                })}
              </div>

              <h3 className="text-lg font-black text-[#0b192c] leading-snug group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
