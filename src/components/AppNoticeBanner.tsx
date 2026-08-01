'use client';

import React from 'react';
import { Download, Smartphone, Play, Shield, Video, DownloadCloud, Sparkles } from 'lucide-react';

export default function AppNoticeBanner() {
  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = '/pawanmateeducation.apk';
    link.download = 'pawanmateeducation.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="app-notice" className="section-wrapper bg-[#0b192c] py-12 sm:py-16 border-b border-slate-800">
      <div className="section-container">
        
        {/* Banner Outer Card */}
        <div className="relative bg-gradient-to-br from-[#0f2c59] via-[#1a3869] to-[#0f2c59] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden border border-blue-900/40">
          
          {/* Background Ambient Glow Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 w-full">
            
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold">
                <Smartphone className="w-4 h-4 text-blue-300" />
                <span>Official Android Mobile App</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                Stream Lectures & Attend Live Classes Anywhere, Anytime
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Download the official <strong className="text-white font-bold">Pawan Mate Education Android APK</strong> to watch 
                high-definition lectures, download study material for offline viewing, and participate in live problem-solving sessions.
              </p>

              {/* Mobile Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <div className="p-1 rounded-md bg-white/10 text-amber-400">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                  <span>Live HD Streaming</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <div className="p-1 rounded-md bg-white/10 text-amber-400">
                    <DownloadCloud className="w-3.5 h-3.5" />
                  </div>
                  <span>Offline Video Downloads</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <div className="p-1 rounded-md bg-white/10 text-amber-400">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span>100% Safe & Verified APK</span>
                </div>
              </div>

            </div>

            {/* Right Action & Badges */}
            <div className="flex flex-col items-stretch sm:items-start lg:items-end gap-4 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
              
              <button
                onClick={handleDownloadApk}
                className="btn-gold text-sm sm:text-base py-3.5 px-8 justify-center font-black shadow-lg hover:scale-105 transition-transform"
              >
                <Download className="w-5 h-5" />
                <span>Download Android APK</span>
              </button>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15 font-medium">
                  Google Play: <strong className="text-amber-300 font-bold">Coming Soon</strong>
                </span>
                <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15 font-medium">
                  App Store: <strong className="text-amber-300 font-bold">Coming Soon</strong>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
