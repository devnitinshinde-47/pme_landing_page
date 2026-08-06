'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AppNoticeBanner from '@/components/AppNoticeBanner';
import ResultsSection from '@/components/ResultsSection';
import CoursesSection from '@/components/CoursesSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import InstallAppModal from '@/components/InstallAppModal';
import { Course } from '@/lib/api';

export default function Home() {
  const [selectedCourseForInstallApp, setSelectedCourseForInstallApp] = useState<Course | null>(null);

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

        {/* 3. Results Section */}
        <ResultsSection />

        {/* 4. App Download Alert Banner */}
        <AppNoticeBanner />

        {/* 5. Courses Catalog Section */}
        <CoursesSection
          onRequestAccess={handleCourseAccessRequest}
          enrolledCourseIds={new Set()}
          requestedCourseIds={new Set()}
        />

        {/* 6. Features Section */}
        <FeaturesSection />
      </main>

      {/* 6. Footer */}
      <Footer onScrollTo={handleScrollTo} />

      {/* 7. Install Mobile App Dialog */}
      <InstallAppModal
        course={selectedCourseForInstallApp}
        onClose={() => setSelectedCourseForInstallApp(null)}
      />
    </div>
  );
}
