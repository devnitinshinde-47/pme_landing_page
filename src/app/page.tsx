'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ResultBanner from '@/components/ResultBanner';
import AppNoticeBanner from '@/components/AppNoticeBanner';
import CoursesSection from '@/components/CoursesSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import InstallAppModal from '@/components/InstallAppModal';
import { Course } from '@/lib/api';

export default function Home() {
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [selectedCourseForInstallApp, setSelectedCourseForInstallApp] = useState<Course | null>(null);

  // Show result banner popup automatically when website opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsResultOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCourseAccessRequest = (course: Course) => {
    setSelectedCourseForInstallApp(course);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Sticky Glass Navbar */}
      <Navbar
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
          enrolledCourseIds={new Set()}
          requestedCourseIds={new Set()}
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

      {/* 8. Install Mobile App Dialog */}
      <InstallAppModal
        course={selectedCourseForInstallApp}
        onClose={() => setSelectedCourseForInstallApp(null)}
      />
    </div>
  );
}
