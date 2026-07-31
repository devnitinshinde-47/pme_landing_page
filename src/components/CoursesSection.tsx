'use client';

import React, { useState, useEffect } from 'react';
import { Course, getCourses, getCourseSettings, CourseFilterItem } from '@/lib/api';
import { Search, Send, BookOpen, GraduationCap, Building2, Calendar, Filter, X, CheckCircle2, Clock } from 'lucide-react';

interface CoursesSectionProps {
  onRequestAccess: (course: Course) => void;
  enrolledCourseIds?: Set<string>;
  requestedCourseIds?: Set<string>;
}

export default function CoursesSection({ onRequestAccess, enrolledCourseIds, requestedCourseIds }: CoursesSectionProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUnivOrType, setSelectedUnivOrType] = useState<string>('ALL');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Master items from DB
  const [universities, setUniversities] = useState<string[]>(['MSBTE', 'SPPU', 'DBATU']);
  const [branchMasterItems, setBranchMasterItems] = useState<CourseFilterItem[]>([]);

  useEffect(() => {
    loadCourses();
    loadMasterSettings();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setCourses(res.content || []);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMasterSettings = async () => {
    try {
      const [allSettings, branchSettings] = await Promise.all([
        getCourseSettings(),
        getCourseSettings('BRANCH'),
      ]);

      // Filter DB University / Board items
      const univItems = allSettings.filter(
        (i) => i.type === 'UNIVERSITY' || i.type === 'BOARD' || i.type === 'UNIVERSITY_BOARD'
      );
      if (univItems.length > 0) {
        const univNames = univItems.map((u) => u.name || u.code || '').filter(Boolean);
        const mergedUnivs = Array.from(new Set(['MSBTE', 'SPPU', 'DBATU', ...univNames]));
        setUniversities(mergedUnivs);
      } else {
        setUniversities(['MSBTE', 'SPPU', 'DBATU']);
      }

      // Process DB Branch items directly from master settings table
      if (branchSettings && branchSettings.length > 0) {
        setBranchMasterItems(branchSettings);
      } else {
        const branchItemsFromAll = allSettings.filter((i) => i.type === 'BRANCH');
        if (branchItemsFromAll.length > 0) {
          setBranchMasterItems(branchItemsFromAll);
        } else {
          setBranchMasterItems([
            { id: 'b1', type: 'BRANCH', name: 'Mechanical Engineering', status: 'ACTIVE' },
            { id: 'b2', type: 'BRANCH', name: 'Civil Engineering', status: 'ACTIVE' },
            { id: 'b3', type: 'BRANCH', name: 'Computer & IT', status: 'ACTIVE' },
            { id: 'b4', type: 'BRANCH', name: 'Electrical Engineering', status: 'ACTIVE' },
          ]);
        }
      }
    } catch (err) {
      console.warn('Failed to load DB master settings, using defaults:', err);
    }
  };

  const filteredCourses = courses.filter((course) => {
    // 1. University / Board Pill Filter (MSBTE, SPPU, DBATU, etc.)
    let matchesUnivOrType = true;
    if (selectedUnivOrType !== 'ALL') {
      const query = selectedUnivOrType.toLowerCase();
      matchesUnivOrType =
        Boolean(course.university && course.university.toLowerCase().includes(query)) ||
        Boolean(course.name && course.name.toLowerCase().includes(query)) ||
        Boolean(course.description && course.description.toLowerCase().includes(query));
    }

    // 2. Branch Filter (from DB Master Table)
    let matchesBranch = true;
    if (selectedBranch !== 'ALL') {
      const query = selectedBranch.toLowerCase();
      matchesBranch =
        Boolean(course.branches && course.branches.some((b) => b.toLowerCase().includes(query) || query.includes(b.toLowerCase()))) ||
        Boolean(course.name && course.name.toLowerCase().includes(query)) ||
        Boolean(course.description && course.description.toLowerCase().includes(query));
    }

    // 3. Search Query
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        Boolean(course.name && course.name.toLowerCase().includes(query)) ||
        Boolean(course.description && course.description.toLowerCase().includes(query)) ||
        Boolean(course.university && course.university.toLowerCase().includes(query)) ||
        Boolean(course.branches && course.branches.some((b) => b.toLowerCase().includes(query)));
    }

    return matchesUnivOrType && matchesBranch && matchesSearch;
  });

  return (
    <section id="courses" className="section-wrapper bg-slate-100/80 py-14 sm:py-20 border-b border-slate-200/80">
      <div className="section-container">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50 text-blue-800 text-xs font-extrabold rounded-full border border-blue-100">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Programs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0f2c59] tracking-tight">
            Explore Courses & Study Material
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Select your university, board, or engineering branch to discover available courses and request course access.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-3 mb-8 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm">
          
          {/* Top Row: University & Board Filter Pills (MSBTE, SPPU, DBATU from DB) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 w-full no-scrollbar">
            
            {/* All Filter */}
            <button
              onClick={() => setSelectedUnivOrType('ALL')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedUnivOrType === 'ALL'
                  ? 'bg-[#0f2c59] text-white shadow-md'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/70'
              }`}
            >
              All Courses ({courses.length})
            </button>

            {/* University / Board Filter Pills */}
            {universities.map((univ) => (
              <button
                key={univ}
                onClick={() => setSelectedUnivOrType(univ)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  selectedUnivOrType === univ
                    ? 'bg-[#0f2c59] text-white shadow-md'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/70'
                }`}
              >
                {univ}
              </button>
            ))}

          </div>

          {/* Bottom Row: Branch Selector & Keyword Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            
            {/* Branch Filter Dropdown */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200 text-xs text-slate-700 w-full sm:w-auto">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-bold text-slate-600 shrink-0">Branch:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent font-extrabold text-[#0f2c59] focus:outline-none cursor-pointer w-full"
              >
                <option value="ALL">All Engineering Branches</option>
                {branchMasterItems.map((branch) => (
                  <option key={branch.id || branch.name} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search course title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Content Display */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-slate-200/60 animate-pulse rounded-2xl border border-slate-200" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 w-full space-y-3 shadow-xs">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[#0f2c59]">No courses found matching your filter criteria</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try selecting a different university, board, or branch filter above.
            </p>
            <button 
              onClick={() => { setSelectedUnivOrType('ALL'); setSelectedBranch('ALL'); setSearchQuery(''); }}
              className="btn-secondary text-xs py-2 px-4 mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="clean-card p-6 flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100">
                      {course.type === 'ENGINEERING' ? 'Degree Engineering' : 'Polytechnic Diploma'}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {course.mode || 'ONLINE'}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-extrabold text-[#0f2c59] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.name}
                  </h3>

                  {/* Course Description */}
                  {course.description && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {course.description}
                    </p>
                  )}

                  {/* Course Metadata Pills */}
                  <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    {course.branches && course.branches.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          <strong className="text-slate-700 font-semibold">Branch:</strong> {course.branches.join(', ')}
                        </span>
                      </div>
                    )}

                    {course.university && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          <strong className="text-slate-700 font-semibold">University:</strong> {course.university}
                        </span>
                      </div>
                    )}

                    {course.year && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          <strong className="text-slate-700 font-semibold">Year/Semester:</strong> {course.year}
                        </span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Card Footer Price & Request CTA */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Course Fee</span>
                    <span className="text-xl font-black text-[#0f2c59]">
                      {course.price ? `₹${course.price.toLocaleString('en-IN')}` : 'FREE'}
                    </span>
                  </div>

                  {enrolledCourseIds?.has(course.id) ? (
                    <div className="px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Access Granted</span>
                    </div>
                  ) : requestedCourseIds?.has(course.id) ? (
                    <div className="px-3.5 py-2 bg-amber-50 text-amber-900 border border-amber-200/90 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <Clock className="w-4 h-4 text-amber-600 animate-pulse-subtle" />
                      <span>Request Pending</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onRequestAccess(course)}
                      className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Access</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
