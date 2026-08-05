'use client';

import React, { useState, useEffect } from 'react';
import { Course, getCourses, getComboCourses, getCourseSettings, CourseFilterItem } from '@/lib/api';
import { Search, Send, BookOpen, GraduationCap, Building2, Calendar, Filter, X, CheckCircle2, Clock, Sparkles, Layers } from 'lucide-react';

interface CoursesSectionProps {
  onRequestAccess: (course: Course) => void;
  enrolledCourseIds?: Set<string>;
  requestedCourseIds?: Set<string>;
}

function getModeBadge(course: Course) {
  if (course.isCombo) {
    return (
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide flex items-center gap-1 shadow-xs">
        <Sparkles className="w-3 h-3" /> COMBO OFFER
      </span>
    );
  }

  const upper = (course.mode || '').trim().toUpperCase();
  if (upper === 'BOTH' || upper === 'LIVE_RECORDED' || upper === 'LIVE + RECORDED' || upper === 'LIVE+REC') {
    return (
      <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide">
        LIVE + RECORDED
      </span>
    );
  } else if (upper === 'LIVE') {
    return (
      <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide">
        LIVE BATCH
      </span>
    );
  } else {
    return (
      <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
        RECORDED
      </span>
    );
  }
}

function getBranchLabel(branches?: string[]) {
  if (!branches || branches.length === 0) return 'Common for all branches';
  if (branches.length === 1) {
    const name = branches[0].trim();
    const lower = name.toLowerCase();
    if (lower === 'all' || lower === 'common' || lower === 'all branches' || lower === 'common for all') {
      return 'Common for all branches';
    }
    return name;
  }
  return 'Common for all branches';
}

const CourseThumbnail = ({ src, alt, isCombo }: { src?: string; alt: string; isCombo?: boolean }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`w-full aspect-[16/9] flex items-center justify-center p-4 ${
        isCombo ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-900 to-[#0f2c59]'
      }`}>
        <div className="text-center text-white/90">
          {isCombo ? <Sparkles className="w-10 h-10 mx-auto mb-1 text-amber-400" /> : <BookOpen className="w-10 h-10 mx-auto mb-1 opacity-70" />}
          <span className="text-[11px] font-bold tracking-wider uppercase opacity-80">
            {isCombo ? 'Combo Course Offer' : 'Pawan Mate Education'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[16/9] relative bg-slate-100 overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default function CoursesSection({ onRequestAccess, enrolledCourseIds, requestedCourseIds }: CoursesSectionProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('ALL'); // 'ALL', 'MSBTE', 'SPPU', 'DBATU'
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL'); // 'ALL', 'COMBO', 'LIVE', 'RECORDED', 'DEMO'
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [branchMasterItems, setBranchMasterItems] = useState<CourseFilterItem[]>([]);

  useEffect(() => {
    loadCourses();
    loadMasterSettings();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const [res, comboList] = await Promise.all([
        getCourses(),
        getComboCourses().catch(() => []),
      ]);
      const regularCourses = res.content || [];
      const comboIds = new Set(comboList.map((c) => c.id));
      const filteredRegular = regularCourses.filter((c) => !comboIds.has(c.id));
      setCourses([...comboList, ...filteredRegular]);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMasterSettings = async () => {
    try {
      const branchSettings = await getCourseSettings('BRANCH');
      if (branchSettings && branchSettings.length > 0) {
        setBranchMasterItems(branchSettings);
      } else {
        setBranchMasterItems([
          { id: 'b1', type: 'BRANCH', name: 'Mechanical Engineering', status: 'ACTIVE' },
          { id: 'b2', type: 'BRANCH', name: 'Civil Engineering', status: 'ACTIVE' },
          { id: 'b3', type: 'BRANCH', name: 'Computer & IT', status: 'ACTIVE' },
          { id: 'b4', type: 'BRANCH', name: 'Electrical Engineering', status: 'ACTIVE' },
        ]);
      }
    } catch (err) {
      console.warn('Failed to load DB branch settings:', err);
    }
  };

  const universityPills = [
    { id: 'ALL', label: 'All Universities' },
    { id: 'MSBTE', label: 'MSBTE' },
    { id: 'SPPU', label: 'SPPU' },
    { id: 'DBATU', label: 'DBATU' },
  ];

  const formatPills = [
    { id: 'ALL', label: 'All Formats' },
    { id: 'COMBO', label: 'Combo Offers' },
    { id: 'LIVE', label: 'Live Batches' },
    { id: 'RECORDED', label: 'Recorded Courses' },
    { id: 'DEMO', label: 'Demo Courses' },
  ];

  const filteredCourses = courses.filter((course) => {
    // 1. University Filter
    let matchesUniv = true;
    if (selectedUniversity !== 'ALL') {
      const query = selectedUniversity.toLowerCase();
      matchesUniv =
        Boolean(course.university && course.university.toLowerCase().includes(query)) ||
        Boolean(course.name && course.name.toLowerCase().includes(query));
    }

    // 2. Format / Mode Filter
    let matchesFormat = true;
    if (selectedFormat !== 'ALL') {
      if (selectedFormat === 'COMBO') {
        matchesFormat = Boolean(course.isCombo);
      } else if (selectedFormat === 'DEMO') {
        matchesFormat = course.price === 0 || (Boolean(course.type) && course.type.toUpperCase() === 'DEMO');
      } else if (selectedFormat === 'LIVE') {
        const mode = (course.mode || '').toUpperCase();
        matchesFormat = mode === 'LIVE' || mode === 'BOTH' || mode === 'LIVE_RECORDED' || mode === 'LIVE + RECORDED';
      } else if (selectedFormat === 'RECORDED') {
        const mode = (course.mode || '').toUpperCase();
        matchesFormat = mode === 'RECORDED';
      }
    }

    // 3. Branch Filter
    let matchesBranch = true;
    if (selectedBranch !== 'ALL') {
      const query = selectedBranch.toLowerCase();
      matchesBranch =
        Boolean(course.branches && course.branches.some((b) => b.toLowerCase().includes(query) || query.includes(b.toLowerCase()))) ||
        Boolean(course.name && course.name.toLowerCase().includes(query));
    }

    // 4. Search Query
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        Boolean(course.name && course.name.toLowerCase().includes(query)) ||
        Boolean(course.description && course.description.toLowerCase().includes(query)) ||
        Boolean(course.university && course.university.toLowerCase().includes(query)) ||
        Boolean(course.branches && course.branches.some((b) => b.toLowerCase().includes(query)));
    }

    return matchesUniv && matchesFormat && matchesBranch && matchesSearch;
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
            Explore Courses & Combo Offers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Browse single courses, discounted combo offer packages, live interactive batches, and free demo lessons.
          </p>
        </div>

        {/* Separated 3-Tier Filter Controls Bar */}
        <div className="space-y-4 mb-8 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm">
          
          {/* Row 1: University / Board Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 w-24">
              University:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 w-full no-scrollbar">
              {universityPills.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedUniversity(pill.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                    selectedUniversity === pill.id
                      ? 'bg-[#0f2c59] text-white shadow-sm'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/70'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Format & Mode Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 w-24">
              Format:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 w-full no-scrollbar">
              {formatPills.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedFormat(pill.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                    selectedFormat === pill.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/70'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Branch Selector & Keyword Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            
            {/* Branch Filter Dropdown */}
            <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-700 w-full sm:w-auto shrink-0">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-bold text-slate-600 shrink-0">Branch:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent font-extrabold text-[#0f2c59] focus:outline-none cursor-pointer w-full sm:w-48"
              >
                <option value="ALL">All Branches</option>
                {branchMasterItems.map((branch) => (
                  <option key={branch.id || branch.name} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by course name, subject..."
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
              <div key={n} className="h-80 bg-slate-200/60 animate-pulse rounded-2xl border border-slate-200" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 w-full space-y-3 shadow-xs">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[#0f2c59]">No courses found matching your filter criteria</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try selecting a different category filter or clearing your search.
            </p>
            <button 
              onClick={() => { setSelectedUniversity('ALL'); setSelectedFormat('ALL'); setSelectedBranch('ALL'); setSearchQuery(''); }}
              className="btn-secondary text-xs py-2 px-4 mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredCourses.map((course) => {
              const universityName = course.university && course.university.trim() ? course.university.trim() : 'MSBTE';
              const branchLabel = getBranchLabel(course.branches);

              const originalPrice = course.originalPrice && course.originalPrice > course.price ? course.originalPrice : null;
              const discountPct = originalPrice ? Math.round(((originalPrice - course.price) / originalPrice) * 100) : 0;

              return (
                <div
                  key={course.id}
                  className={`bg-white rounded-2xl border ${
                    course.isCombo ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100' : 'border-slate-200/90 shadow-sm'
                  } overflow-hidden flex flex-col justify-between h-full group hover:shadow-lg transition-all duration-300`}
                >
                  <div>
                    <CourseThumbnail src={course.thumbnailUrl} alt={course.name} isCombo={course.isCombo} />

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-700 tracking-wider uppercase">
                          {universityName}
                        </span>
                        {getModeBadge(course)}
                      </div>

                      <h3 className="text-base font-extrabold text-[#0f2c59] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {course.name}
                      </h3>

                      <p className="text-xs font-semibold text-slate-500 truncate">
                        {branchLabel}
                      </p>

                      {course.isCombo && course.includedCourses && course.includedCourses.length > 0 && (
                        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 space-y-1.5">
                          <span className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                            <Layers className="w-3 h-3 text-indigo-600" /> Included Courses ({course.includedCourses.length}):
                          </span>
                          <ul className="space-y-1 text-xs text-indigo-950 font-semibold">
                            {course.includedCourses.map((inc) => (
                              <li key={inc.id} className="flex items-center gap-1.5 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                <span className="truncate">{inc.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {!course.isCombo && course.description && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal pt-1">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Course Fee</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-[#0f2c59]">
                          {course.price && course.price > 0 ? `₹${course.price.toLocaleString('en-IN')}` : 'FREE'}
                        </span>
                        {originalPrice && (
                          <span className="text-xs font-bold text-slate-400 line-through">
                            ₹{originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {discountPct > 0 && (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            {discountPct}% OFF
                          </span>
                        )}
                      </div>
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
                        className={`text-xs py-2 px-4 whitespace-nowrap shadow-xs cursor-pointer ${
                          course.isCombo ? 'btn-gold' : 'btn-primary'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Access</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
