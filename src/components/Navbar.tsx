'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Menu, X, BookOpen, Smartphone, ShieldCheck, Home as HomeIcon, ChevronRight } from 'lucide-react';

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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'glass-nav shadow-xs py-1.5' : 'bg-white/95 border-b border-slate-200 py-2.5'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group shrink-0" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-13 h-13 sm:w-15 sm:h-15 relative flex-shrink-0 bg-blue-50/90 rounded-2xl border border-blue-100/90 flex items-center justify-center overflow-hidden p-1 shadow-2xs group-hover:border-blue-300 transition-all">
              <Image 
                src="/logo.png" 
                alt="Pawan Mate Education" 
                width={56} 
                height={56} 
                className="object-contain object-center scale-130 group-hover:scale-140 transition-transform duration-300"
                priority
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-[#0f2c59] tracking-tight block leading-none group-hover:text-blue-700 transition-colors">
                PAWAN MATE
              </span>
              <span className="text-[11px] font-black text-orange-500 tracking-widest uppercase block mt-1">
                EDUCATION
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs font-bold text-slate-700">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="px-4 py-2 rounded-xl hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('courses')} 
              className="px-4 py-2 rounded-xl hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavClick('app-notice')} 
              className="px-4 py-2 rounded-xl hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              App Download
            </button>
            <button 
              onClick={() => handleNavClick('features')} 
              className="px-4 py-2 rounded-xl hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              Why Choose Us
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs sm:text-sm py-2.5 px-5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Android App
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs py-1.5 px-3 sm:hidden"
            >
              <Download className="w-3.5 h-3.5" />
              App APK
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <HomeIcon className="w-4 h-4 text-blue-600" />
                <span>Home</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>All Courses</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNavClick('app-notice')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>App Download</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNavClick('features')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Why Choose Us</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs py-3 px-4 justify-center w-full shadow-sm"
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
