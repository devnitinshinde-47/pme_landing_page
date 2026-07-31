'use client';

import React, { useState, useEffect } from 'react';
import { Course, User, requestCourseAccess } from '@/lib/api';
import { X, Send, CheckCircle2, ShieldCheck, AlertCircle, BookOpen, UserCheck } from 'lucide-react';

interface RequestAccessModalProps {
  course: Course | null;
  user: User | null;
  token: string | null;
  onClose: () => void;
  onRequireLogin: () => void;
  onSuccessRequest?: (courseId: string) => void;
}

export default function RequestAccessModal({
  course,
  user,
  token,
  onClose,
  onRequireLogin,
  onSuccessRequest,
}: RequestAccessModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Reset modal state whenever selected course changes or modal opens
  useEffect(() => {
    setSubmitted(false);
    setMessage('');
    setError('');
    setLoading(false);
  }, [course?.id]);

  if (!course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (user && token) {
        const res = await requestCourseAccess(course.id, token);
        if (res.success) {
          setSubmitted(true);
          setMessage(res.message);
          if (onSuccessRequest) {
            onSuccessRequest(course.id);
          }
        } else {
          setError(res.message);
        }
      } else {
        onRequireLogin();
      }
    } catch (err) {
      setError('Failed to submit access request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-[#0b192c]">Access Request Submitted!</h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">
              {message}
            </p>

            <div className="pt-3">
              <button onClick={onClose} className="btn-primary text-xs sm:text-sm py-3 px-8">
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-start gap-3.5 pb-2">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0 border border-blue-100">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="bg-blue-50 text-blue-700 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-md border border-blue-100">
                  Course Access Request
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0b192c] line-clamp-1 mt-0.5">{course.name}</h3>
              </div>
            </div>

            {/* Course specs summary box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Course Type:</span>
                <span className="font-extrabold text-[#0b192c]">
                  {course.type === 'ENGINEERING' ? 'Degree Engineering' : 'Polytechnic Diploma'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Course Fee:</span>
                <span className="font-black text-amber-600 text-sm">
                  {course.price ? `₹${course.price.toLocaleString('en-IN')}` : 'FREE'}
                </span>
              </div>
              {course.university && (
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">University / Board:</span>
                  <span className="font-medium">{course.university}</span>
                </div>
              )}
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {user ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="bg-blue-50/80 p-3 rounded-xl text-xs text-blue-900 border border-blue-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Logged in as <strong>{user.name || user.mobileNo}</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3.5 justify-center text-xs sm:text-sm font-black shadow-md"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Submit Access Request</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4 pt-1 text-center">
                <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium space-y-1.5">
                  <p className="font-extrabold text-[#0f2c59]">Student Login Required</p>
                  <p>Course access requests are strictly permitted only after student mobile OTP login & verification.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequireLogin();
                  }}
                  className="w-full btn-primary py-3.5 justify-center text-xs sm:text-sm font-black shadow-md"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Login / Register with OTP First</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
