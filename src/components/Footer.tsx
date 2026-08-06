'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Heart } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const handleDownloadApk = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/pawanmateeducation.apk';
    link.download = 'pawanmateeducation.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="section-wrapper bg-zinc-950 dark:bg-black text-zinc-300 py-10 border-t border-zinc-800">
      <div className="section-container">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80 w-full">
          
          {/* Logo & Brand Info */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => onScrollTo('hero')}>
            <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-700">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain object-center scale-[1.7]" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight block leading-tight">
                PAWAN MATE
              </span>
              <span className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase block">
                EDUCATION
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <button onClick={() => onScrollTo('hero')} className="hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => onScrollTo('courses')} className="hover:text-white transition-colors">
              All Courses
            </button>
            <button onClick={() => onScrollTo('app-notice')} className="hover:text-white transition-colors">
              Download App
            </button>
            <button onClick={() => onScrollTo('features')} className="hover:text-white transition-colors">
              Why Choose Us
            </button>
          </div>

          {/* Action CTA Button */}
          <button
            onClick={handleDownloadApk}
            className="btn-gold text-xs py-2 px-4 font-bold shrink-0 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Download APK</span>
          </button>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 w-full">
          <p>© {new Date().getFullYear()} Pawan Mate Education. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="hover:text-white transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors font-medium">
                Terms & Conditions
              </Link>
            </div>
            <p className="flex items-center gap-1">
              <span>Coaching Polytechnic & Degree Engineers</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
