// src/app/exams/page.tsx
'use client';

import { useState, useMemo, ReactNode } from 'react';
import ExamCard from '@/components/exams/ExamCard';
import { FiSearch, FiBriefcase, FiHeart, FiCpu, FiBook, FiSlack } from 'react-icons/fi';

// --- Mock Data for Exams ---
const allExams = [
  { id: 1, title: 'JEE Main & Advanced', category: 'Engineering', body: 'NTA', date: 'Jan & Apr 2026' },
  { id: 2, title: 'NEET (UG)', category: 'Medical', body: 'NTA', date: 'May 5, 2026' },
  { id: 3, title: 'CAT', category: 'MBA', body: 'IIMs', date: 'Nov 26, 2025' },
  { id: 4, title: 'UPSC Civil Services', category: 'Government', body: 'UPSC', date: 'May 26, 2026' },
  { id: 5, title: 'GATE', category: 'Engineering', body: 'IITs', date: 'Feb 2026' },
  { id: 6, title: 'SSC CGL', category: 'Government', body: 'SSC', date: 'Sep-Oct 2025' },
  { id: 7, title: 'AIIMS PG', category: 'Medical', body: 'AIIMS, New Delhi', date: 'May 2026' },
  { id: 8, title: 'XAT', category: 'MBA', body: 'XLRI Jamshedpur', date: 'Jan 7, 2026' },
  { id: 9, title: 'BITSAT', category: 'Engineering', body: 'BITS Pilani', date: 'May-June 2026' },
];

// --- Filter & Icon Definitions ---
type ExamCategory = 'Engineering' | 'Medical' | 'MBA' | 'Government';

const categoryFilters: ExamCategory[] = ['Engineering', 'Medical', 'MBA', 'Government'];

const categoryIcons: Record<ExamCategory, ReactNode> = {
    Engineering: <FiCpu className="w-6 h-6"/>,
    Medical: <FiHeart className="w-6 h-6"/>,
    MBA: <FiBriefcase className="w-6 h-6"/>,
    Government: <FiBook className="w-6 h-6"/>,
};

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'All'>('All');

  const filteredExams = useMemo(() => {
    return allExams.filter(exam => {
        const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory;
        const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || exam.body.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Upcoming & Popular Exams</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Find all the information you need for major competitive exams in India.</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-white/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div className="w-full md:col-span-1">
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Stream</label>
              <select 
                id="category" 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ExamCategory | 'All')} 
                className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="All">All Streams</option>
                {categoryFilters.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            {/* Search Bar */}
            <div className="w-full md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search Exam or Body</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input
                  type="text"
                  id="search"
                  placeholder="e.g., JEE, NEET, NTA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExams.length > 0 ? (
            filteredExams.map(exam => (
              <ExamCard
                key={exam.id}
                title={exam.title}
                icon={categoryIcons[exam.category as ExamCategory]}
                conductingBody={exam.body}
                date={exam.date}
              />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-16">
              <div className="inline-block bg-slate-200 p-4 rounded-full">
                  <FiSlack className="w-10 h-10 text-slate-500"/>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-800">No Exams Found</h3>
              <p className="mt-2 text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}