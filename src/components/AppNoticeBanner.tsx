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
    <section id="app-notice" className="section-wrapper bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
      <div className="section-container">
        
        {/* Banner Outer Card */}
        <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-md">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 w-full">
            
            {/* Left Content */}
            <div className="space-y-3 max-w-2xl">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Android Mobile App</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                Stream Lectures & Attend Live Classes Anywhere, Anytime
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Download the official <strong className="text-white font-semibold">Pawan Mate Education Android APK</strong> to watch 
                high-definition lectures, download study material for offline viewing, and participate in live problem-solving sessions.
              </p>

              {/* Mobile Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <div className="p-1 rounded bg-slate-700 text-amber-400">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                  <span>Live HD Streaming</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <div className="p-1 rounded bg-slate-700 text-amber-400">
                    <DownloadCloud className="w-3.5 h-3.5" />
                  </div>
                  <span>Offline Video Downloads</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <div className="p-1 rounded bg-slate-700 text-amber-400">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span>100% Safe & Verified APK</span>
                </div>
              </div>

            </div>

            {/* Right Action & Badges */}
            <div className="flex flex-col items-stretch sm:items-start lg:items-end gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
              
              <button
                onClick={handleDownloadApk}
                className="btn-gold text-xs sm:text-sm py-3 px-6 justify-center font-bold shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Android APK</span>
              </button>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700 font-medium">
                  Google Play: <strong className="text-amber-400 font-semibold">Coming Soon</strong>
                </span>
                <span className="bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700 font-medium">
                  App Store: <strong className="text-amber-400 font-semibold">Coming Soon</strong>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
