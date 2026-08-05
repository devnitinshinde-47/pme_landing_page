'use client';

import React from 'react';
import { Course } from '@/lib/api';
import { X, Smartphone, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InstallAppModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function InstallAppModal({ course, onClose }: InstallAppModalProps) {
  if (!course) return null;

  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = '/pawanmateeducation.apk';
    link.download = 'pawanmateeducation.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden my-auto text-center space-y-5">
        
        {/* Close X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
          <Smartphone className="w-8 h-8" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Mobile App Exclusive
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0f2c59] tracking-tight">
            Install App to Access Course
          </h3>
        </div>

        {/* Course Info Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Selected Course</span>
          <p className="text-sm font-bold text-slate-900 line-clamp-2">{course.name}</p>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          Full course access, video lecture streaming, offline downloads, and live classes are supported exclusively inside the official <strong className="text-slate-900">Pawan Mate Education</strong> Android App.
        </p>

        {/* Features Checklist */}
        <div className="space-y-2 text-left text-xs font-bold text-slate-700 bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100/70">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant One-Tap Course Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High Quality HD Video Lectures</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Direct Faculty Doubt Resolution</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={handleDownloadApk}
            className="btn-gold w-full text-sm py-3.5 px-6 justify-center shadow-md cursor-pointer"
          >
            <Download className="w-4.5 h-4.5" />
            <span>Download Official Android App (APK)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 py-2 transition-colors cursor-pointer"
          >
            Maybe Later
          </button>
        </div>

      </div>
    </div>
  );
}
