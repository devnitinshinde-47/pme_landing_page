'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ResultBannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResultBanner({ isOpen, onClose }: ResultBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Animate in when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow the DOM to mount before animating
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Pawan Mate Education Results"
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative z-10 w-full max-w-4xl transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close results popup"
            className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900 hover:scale-110 transition-all shadow-lg border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Result Banner Image */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] bg-slate-100">
            <Image
              src="/result_banner.jpg"
              alt="Pawan Mate Education Results – Student Toppers"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
}
