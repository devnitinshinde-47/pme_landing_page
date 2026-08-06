'use client';

import React from 'react';
import { Course } from '@/lib/api';
import { 
  X, 
  Smartphone, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Clock, 
  Award, 
  FileText, 
  Video, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

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

  const universityName = course.university && course.university.trim() ? course.university.trim() : 'MSBTE / SPPU';
  const originalPrice = course.originalPrice && course.originalPrice > course.price ? course.originalPrice : null;
  const discountPct = originalPrice ? Math.round(((originalPrice - course.price) / originalPrice) * 100) : 0;
  const durationMonths = course.accessDurationMonths || 12;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden my-auto space-y-5 text-left">
        
        {/* Close X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges & Title */}
        <div className="space-y-2 pr-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-amber-700 dark:text-amber-400" />
              {universityName}
            </span>

            {course.isCombo ? (
              <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                <Layers className="w-3 h-3 text-emerald-700 dark:text-emerald-400" /> Combo Bundle Pack
              </span>
            ) : (
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                {course.mode || 'FULL COURSE'}
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
            {course.name}
          </h3>
        </div>

        {/* Pricing & Duration Card */}
        <div className="bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block tracking-wider">Course Pricing</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {course.price && course.price > 0 ? `₹${course.price.toLocaleString('en-IN')}` : 'FREE'}
              </span>
              {originalPrice && (
                <span className="text-xs font-semibold text-zinc-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPct > 0 && (
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                  {discountPct}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span>{durationMonths} Months Validity</span>
          </div>
        </div>

        {/* Course Description - Formatted Bullet Points */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Course Overview & Key Highlights
          </h4>

          <div className="bg-zinc-50/70 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            {(() => {
              const rawPoints = (course.description || '')
                .split(/(?<=\.|\n)/)
                .map((s) => s.trim())
                .filter((s) => s.length > 8);

              const points = rawPoints.length > 0 
                ? rawPoints 
                : [
                    'Comprehensive chapter-wise video lectures aligned with MSBTE & University marking schemes.',
                    'Step-by-step problem-solving tutorials for complex engineering numericals.',
                    'Handwritten lecture notes, formula cheat-sheets, and model question papers included.',
                    'Direct 1-on-1 educator doubt resolution with Prof. Pawan Mate.',
                  ];

              return (
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  {points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
        </div>

        {/* Included Courses Breakdown (If Combo) */}
        {course.isCombo && course.includedCourses && course.includedCourses.length > 0 && (
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 space-y-2">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400" /> Included Subjects in this Combo Pack ({course.includedCourses.length}):
            </span>
            <ul className="space-y-1 text-xs text-zinc-800 dark:text-zinc-200 font-medium">
              {course.includedCourses.map((inc) => (
                <li key={inc.id} className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{inc.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Syllabus Features Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            What You Get in this Course
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
              <Video className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
              <span>HD Video & Live Sessions</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
              <FileText className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
              <span>Handwritten Lecture Notes</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
              <span>Exam Question Solutions</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
              <span>1-on-1 Educator Guidance</span>
            </div>
          </div>
        </div>

        {/* How to Purchase Banner & App Download CTA */}
        <div className="bg-zinc-900 dark:bg-zinc-950 text-white p-4 sm:p-5 rounded-xl space-y-3 border border-zinc-800 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold leading-tight">Install App to Purchase Course</p>
              <p className="text-[11px] text-zinc-300 font-normal">
                To enroll and unlock full course video streaming & offline notes, download the official mobile app.
              </p>
            </div>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={handleDownloadApk}
              className="btn-gold text-xs sm:text-sm py-2.5 px-5 justify-center flex-1 font-bold shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Android App (APK)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
