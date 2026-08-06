'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Menu, X, BookOpen, Smartphone, ShieldCheck, Home as HomeIcon, ChevronRight } from 'lucide-react';

import ThemeToggle from '@/components/ThemeToggle';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollTo(sectionId);
  };

  const handleDownloadApk = () => {
    setMobileMenuOpen(false);
    const link = document.createElement('a');
    link.href = '/pawanmateeducation.apk';
    link.download = 'pawanmateeducation.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled ? 'glass-nav py-1.5' : 'bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-2.5'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer shrink-0" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-13 h-13 sm:w-16 sm:h-16 relative flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xs">
              <Image 
                src="/logo.png" 
                alt="Pawan Mate Education" 
                width={64} 
                height={64} 
                className="object-contain object-center scale-[1.7]"
                priority
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight block leading-none">
                PAWAN MATE
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-500 tracking-wider uppercase block mt-1">
                EDUCATION
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('results')} 
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Results
            </button>
            <button 
              onClick={() => handleNavClick('courses')} 
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavClick('app-notice')} 
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              App Download
            </button>
            <button 
              onClick={() => handleNavClick('features')} 
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Why Choose Us
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs sm:text-sm py-2 px-4 shadow-2xs"
            >
              <Download className="w-4 h-4" />
              Download App
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs py-1.5 px-3 sm:hidden"
            >
              <Download className="w-3.5 h-3.5" />
              App APK
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <HomeIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>Home</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => handleNavClick('results')}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>Results</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>All Courses</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => handleNavClick('app-notice')}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>App Download</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => handleNavClick('features')}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>Why Choose Us</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs py-2.5 px-4 justify-center w-full shadow-2xs"
            >
              <Download className="w-4 h-4" />
              Download Official Android APK
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
