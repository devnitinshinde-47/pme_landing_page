'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Download, BookOpen, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreCourses: () => void;
}

export default function HeroSection({ onExploreCourses }: HeroSectionProps) {
  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = '/pawanmateeducation.apk';
    link.download = 'pawanmateeducation.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="section-wrapper bg-zinc-50/70 dark:bg-zinc-950 py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800 relative">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Hero Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left w-full">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.15]">
              Master Engineering Concepts with Pawan Mate <span className="text-amber-600 dark:text-amber-500">Education</span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Structured video lectures, live interactive classes, handwritten notes, 
              and exam-focused problem solving tailored for MSBTE & University engineering excellence.
            </p>

            {/* Feature Checkmarks Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                <span>Live Interactive Q&A</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                <span>Exam-Oriented Syllabus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                <span>Mobile App Access</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button 
                onClick={onExploreCourses} 
                className="btn-primary text-sm py-3 px-6 justify-center group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button 
                onClick={handleDownloadApk} 
                className="btn-secondary text-sm py-3 px-6 justify-center"
              >
                <Download className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                <span>Download App</span>
              </button>
            </div>

            {/* Stats Metrics Counter Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-left">
              <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">10,000+</p>
                <p className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">Students Taught</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">98%</p>
                <p className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">Pass Percentage</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">50+</p>
                <p className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">Video Courses</p>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Faculty Card & Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md">
                
                {/* Status Badge Over Image */}
                <div className="absolute top-4 left-4 z-20 bg-zinc-900/90 dark:bg-zinc-950/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 border border-zinc-700 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Live & Interactive Coaching</span>
                </div>

                {/* Hero Image Container matching teacher photo ratio */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] max-h-[460px] sm:max-h-[500px] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <Image
                    src="/4O1A7282.jpg"
                    alt="Prof. Pawan Mate"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Faculty Details */}
                <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">Prof. Pawan Mate</p>
                      <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Founder & Senior Engineering Educator</p>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-lg text-center">
                    <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-400 block">Rating</span>
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300">⭐ 4.9/5</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
