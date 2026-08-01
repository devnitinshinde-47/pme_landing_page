import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  icon: 'privacy' | 'terms';
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  icon,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simple Sticky Header */}
      <header className="sticky top-0 z-50 w-full glass-nav shadow-xs py-2">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 bg-blue-50/90 rounded-xl border border-blue-100/90 flex items-center justify-center overflow-hidden p-0.5 shadow-sm group-hover:border-blue-300 transition-all">
                <Image src="/logo.png" alt="Pawan Mate Education" width={44} height={44} className="object-contain object-center" />
              </div>
              <div>
                <span className="text-base font-black text-[#0f2c59] tracking-tight block leading-none">
                  PAWAN MATE
                </span>
                <span className="text-[9px] font-black text-orange-500 tracking-widest uppercase block mt-0.5">
                  EDUCATION
                </span>
              </div>
            </Link>

            {/* Back to Home */}
            <Link
              href="/"
              className="btn-secondary text-xs py-2 px-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Page Hero Banner */}
      <div className="section-wrapper bg-gradient-to-br from-[#0f2c59] via-[#1e3a8a] to-[#2563eb] py-14 sm:py-16">
        <div className="section-container">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mb-5">
              {icon === 'privacy' ? (
                <ShieldCheck className="w-8 h-8 text-white" />
              ) : (
                <FileText className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl">
              {subtitle}
            </p>
            <p className="mt-4 text-xs font-semibold text-blue-200/70 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow section-wrapper py-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="clean-card p-8 sm:p-10">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="section-wrapper bg-[#0b192c] text-slate-300 py-8 border-t border-slate-800">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 w-full">
            <p>© {new Date().getFullYear()} Pawan Mate Education. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="hover:text-white transition-colors font-semibold">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors font-semibold">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}