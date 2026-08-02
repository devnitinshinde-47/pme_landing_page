'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ResultBanner from '@/components/ResultBanner';
import AppNoticeBanner from '@/components/AppNoticeBanner';
import CoursesSection from '@/components/CoursesSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import RequestAccessModal from '@/components/RequestAccessModal';
import { Course, User, getMyEnrolledCourses, getMyRequestedCourseIds } from '@/lib/api';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [selectedCourseForAccess, setSelectedCourseForAccess] = useState<Course | null>(null);
  const [pendingCourseForAccess, setPendingCourseForAccess] = useState<Course | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [requestedCourseIds, setRequestedCourseIds] = useState<Set<string>>(new Set());

  // Restore user session from localStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('pme_user');
      const savedToken = localStorage.getItem('pme_token');
      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setAccessToken(savedToken);
        loadUserEnrollmentData(savedToken);
      }
    } catch (e) {
      console.warn('Could not restore auth state from storage:', e);
    }
  }, []);

  // Show result banner popup automatically when website opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsResultOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const loadUserEnrollmentData = async (token: string) => {
    try {
      const [enrolledCourses, requestedIds] = await Promise.all([
        getMyEnrolledCourses(token),
        getMyRequestedCourseIds(token),
      ]);
      setEnrolledCourseIds(new Set(enrolledCourses.map((c) => c.id)));
      setRequestedCourseIds(new Set(requestedIds));
    } catch (err) {
      console.warn('Failed to load user enrollment status:', err);
    }
  };

  const handleAuthSuccess = (loggedUser: User, token: string) => {
    setUser(loggedUser);
    setAccessToken(token);
    try {
      localStorage.setItem('pme_user', JSON.stringify(loggedUser));
      localStorage.setItem('pme_token', token);
    } catch (e) {
      console.warn('Storage save failed:', e);
    }

    loadUserEnrollmentData(token);

    // If student was attempting to request course access before login, open access request modal
    if (pendingCourseForAccess) {
      setSelectedCourseForAccess(pendingCourseForAccess);
      setPendingCourseForAccess(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    setSelectedCourseForAccess(null);
    setPendingCourseForAccess(null);
    setEnrolledCourseIds(new Set());
    setRequestedCourseIds(new Set());
    try {
      localStorage.removeItem('pme_user');
      localStorage.removeItem('pme_token');
    } catch (e) {
      console.warn('Storage clear failed:', e);
    }
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCourseAccessRequest = (course: Course) => {
    if (!user) {
      // Require OTP Login & verification first
      setPendingCourseForAccess(course);
      setIsAuthOpen(true);
    } else {
      setSelectedCourseForAccess(course);
    }
  };

  const handleSuccessRequest = (courseId: string) => {
    setRequestedCourseIds((prev) => new Set([...Array.from(prev), courseId]));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Sticky Glass Navbar */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onScrollTo={handleScrollTo}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection
          onExploreCourses={() => handleScrollTo('courses')}
        />

        {/* 3. App Download Alert Banner */}
        <AppNoticeBanner />

        {/* 4. Courses Catalog Section */}
        <CoursesSection
          onRequestAccess={handleCourseAccessRequest}
          enrolledCourseIds={enrolledCourseIds}
          requestedCourseIds={requestedCourseIds}
        />

        {/* 5. Features Section */}
        <FeaturesSection />
      </main>

      {/* 6. Footer */}
      <Footer onScrollTo={handleScrollTo} />

      {/* 7. Results Banner Popup Modal */}
      <ResultBanner
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
      />

      {/* 8. OTP Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* 9. Course Request Access Modal */}
      <RequestAccessModal
        course={selectedCourseForAccess}
        user={user}
        token={accessToken}
        onClose={() => setSelectedCourseForAccess(null)}
        onRequireLogin={() => setIsAuthOpen(true)}
        onSuccessRequest={handleSuccessRequest}
      />
    </div>
  );
}
