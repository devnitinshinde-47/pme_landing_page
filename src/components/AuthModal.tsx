'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { sendOtp, verifyOtp, User } from '@/lib/api';
import { X, KeyRound, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Phone } from 'lucide-react';

const OTP_RESEND_COOLDOWN_SECONDS = 90;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, accessToken: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
  const [mobileNo, setMobileNo] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown timer for OTP resend cooldown
  useEffect(() => {
    if (cooldownSeconds > 0) {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
      cooldownRef.current = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            if (cooldownRef.current) clearInterval(cooldownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, [cooldownSeconds > 0]);

  // Reset cooldown when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCooldownSeconds(0);
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    }
  }, [isOpen]);

  const startCooldown = () => {
    setCooldownSeconds(OTP_RESEND_COOLDOWN_SECONDS);
  };

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNo || mobileNo.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await sendOtp(mobileNo);
      if (res.success) {
        setVerificationId(res.verificationId || ('VID_' + mobileNo));
        setStep('OTP');
        setErrorMsg('');
        setInfoMsg(res.message || `OTP sent to +91 ${mobileNo}`);
        startCooldown();
      } else {
        setErrorMsg(res.message || 'Could not send OTP. Please check your number.');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !/^\d{6}$/.test(otp)) {
      setErrorMsg('Please enter a valid 6-digit OTP verification code.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await verifyOtp(mobileNo, otp);
      if (res.success && res.accessToken) {
        const userObj: User = res.user || {
          id: Date.now(),
          mobileNo: mobileNo,
          role: 'STUDENT',
          active: true,
        };
        onSuccess(userObj, res.accessToken);
        onClose();
      } else {
        setErrorMsg(res.message || 'Invalid OTP verification code. Please check and try again.');
      }
    } catch (err) {
      setErrorMsg('Verification failed due to network error.');
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setStep('MOBILE');
    setErrorMsg('');
    setInfoMsg('');
    setOtp('');
    setCooldownSeconds(0);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden my-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={() => {
            resetState();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-20 h-20 bg-blue-50/90 rounded-3xl flex items-center justify-center mx-auto overflow-hidden p-1.5 border border-blue-100/90 shadow-xs">
            <Image src="/logo.png" alt="Logo" width={72} height={72} className="object-contain object-center scale-130" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0b192c] tracking-tight">
            {step === 'MOBILE' ? 'Student Login / Register' : 'Enter Verification OTP'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            {step === 'MOBILE'
              ? 'Enter your mobile number to receive a 1-time verification OTP code.'
              : `Verification code sent via SMS to +91 ${mobileNo}`}
          </p>
        </div>

        {/* Alert Banners */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {infoMsg && step === 'OTP' && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Step 1: Mobile Form */}
        {step === 'MOBILE' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-black text-slate-600">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 justify-center text-xs sm:text-sm font-black shadow-md mt-2"
            >
              {loading ? (
                <span>Sending OTP Code...</span>
              ) : (
                <>
                  <span>Send OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Pawan Mate Education Student Portal</span>
            </div>
          </form>
        ) : (
          /* Step 2: OTP Form */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Verification OTP Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-900 tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 justify-center text-xs sm:text-sm font-black shadow-md"
            >
              {loading ? <span>Verifying...</span> : <span>Verify & Continue</span>}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => setStep('MOBILE')}
                className="text-blue-600 font-bold hover:underline"
              >
                Change Mobile Number
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={cooldownSeconds > 0 || loading}
                className={`font-semibold transition-colors ${
                  cooldownSeconds > 0
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cooldownSeconds > 0 ? `Resend OTP (${cooldownSeconds}s)` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
