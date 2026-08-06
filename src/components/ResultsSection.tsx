'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

interface ResultsSectionProps {
  onOpenModal?: () => void;
}

const RESULT_IMAGES = [
  {
    src: '/results/result_banner.jpg',
    alt: 'Pawan Mate Education Top Rankers & Exam Results',
    title: 'MSBTE & SPPU Diploma & Degree Toppers',
  },
  {
    src: '/results/result_banner copy.jpg',
    alt: 'Student Success Stories & Distinction Holders',
    title: 'Highest Percentage Holders in MSBTE Board Exams',
  },
  {
    src: '/result_banner.jpg',
    alt: 'Pawan Mate Education Annual Achievers',
    title: 'Proven Academic Excellence & 98% Pass Rate',
  },
];

export default function ResultsSection({ onOpenModal }: ResultsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-sliding effect every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % RESULT_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + RESULT_IMAGES.length) % RESULT_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % RESULT_IMAGES.length);
  };

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="results" className="section-wrapper bg-white dark:bg-zinc-950 py-14 sm:py-18 border-b border-zinc-200 dark:border-zinc-800">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-semibold">
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            <span>Proven Academic Excellence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Our Top Rankers & Exam Results
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal">
            Celebrating the extraordinary academic distinctions and top ranks achieved by our MSBTE diploma & degree engineering students.
          </p>
        </div>

        {/* Responsive Auto-Sliding Carousel Box */}
        <div 
          className="relative max-w-4xl mx-auto bg-zinc-900 rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image Slides Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] bg-slate-900 overflow-hidden">
            {RESULT_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
                  idx === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
                  className="object-contain w-full h-full cursor-pointer"
                  onClick={onOpenModal}
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Left / Right Arrow Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all shadow-md focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all shadow-md focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Caption Banner at Bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 sm:p-5 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-center sm:text-left">
              {RESULT_IMAGES[currentIndex].title}
            </p>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {RESULT_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
