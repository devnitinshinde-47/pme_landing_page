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
    <section id="hero" className="section-wrapper bg-gradient-to-b from-slate-100 via-slate-50 to-white py-12 sm:py-20 border-b border-slate-200/80 overflow-hidden relative">
      
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Hero Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left w-full">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f2c59] tracking-tight leading-[1.12]">
              Master Engineering Concepts with Pawan Mate <span className="text-orange-500">Education</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Structured video lectures, live interactive classes, handwritten notes, 
              and exam-focused problem solving tailored for MSBTE & University engineering excellence.
            </p>

            {/* Feature Checkmarks Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Live Interactive Q&A</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Exam-Oriented Syllabus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mobile App Access</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button 
                onClick={onExploreCourses} 
                className="btn-primary text-sm py-3.5 px-7 justify-center group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={handleDownloadApk} 
                className="btn-secondary text-sm py-3.5 px-7 justify-center"
              >
                <Download className="w-4 h-4 text-[#0f2c59]" />
                <span>Download App</span>
              </button>
            </div>

            {/* Stats Metrics Counter Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 text-left">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <p className="text-xl sm:text-3xl font-black text-[#0f2c59] tracking-tight">10,000+</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Students Taught</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <p className="text-xl sm:text-3xl font-black text-[#0f2c59] tracking-tight">98%</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Pass Percentage</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <p className="text-xl sm:text-3xl font-black text-[#0f2c59] tracking-tight">50+</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Video Courses</p>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Faculty Card & Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Decorative background card glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-amber-500 rounded-3xl blur-lg opacity-25" />

              <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl">
                
                {/* Status Badge Over Image */}
                <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live & Interactive Coaching</span>
                </div>

                {/* Hero Image Container matching teacher photo ratio */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] max-h-[480px] sm:max-h-[540px] bg-slate-100/90 overflow-hidden">
                  <Image
                    src="/4O1A7282.jpg"
                    alt="Prof. Pawan Mate"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Faculty Details */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-base font-black text-[#0b192c]">Prof. Pawan Mate</p>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">Founder & Senior Engineering Educator</p>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-extrabold text-amber-700 block">Rating</span>
                    <span className="text-xs font-black text-amber-900">⭐ 4.9/5</span>
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
