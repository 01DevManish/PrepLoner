// src/app/papers/page.tsx
'use client';

import { useState, useMemo } from 'react';
import PaperCard from '@/components/papers/PaperCard';
import { FiSearch, FiSlack } from 'react-icons/fi';

// --- Mock Data for Previous Year Papers ---
const allPapers = [
  { id: 1, title: 'JEE Main - Session 1', exam: 'JEE Main', year: 2024 },
  { id: 2, title: 'NEET (UG) - National', exam: 'NEET', year: 2024 },
  { id: 3, title: 'UPSC Civil Services (Prelims) - GS Paper 1', exam: 'UPSC CSE', year: 2024 },
  { id: 4, title: 'SSC CGL - Tier 2', exam: 'SSC CGL', year: 2023 },
  { id: 5, title: 'GATE Computer Science', exam: 'GATE CS', year: 2023 },
  { id: 6, title: 'CAT - Slot 1', exam: 'CAT', year: 2023 },
  { id: 7, title: 'JEE Main - Session 2', exam: 'JEE Main', year: 2023 },
  { id: 8, title: 'UPSC Civil Services (Prelims) - GS Paper 1', exam: 'UPSC CSE', year: 2023 },
  { id: 9, title: 'NEET (UG) - National', exam: 'NEET', year: 2022 },
];

// --- Filter Definitions ---
const examFilters = ['All', 'JEE Main', 'NEET', 'UPSC CSE', 'SSC CGL', 'GATE CS', 'CAT'];
const yearFilters = ['All', 2024, 2023, 2022];

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');

  const filteredPapers = useMemo(() => {
    return allPapers.filter(paper => {
      const matchesExam = selectedExam === 'All' || paper.exam === selectedExam;
      const matchesYear = selectedYear === 'All' || paper.year === selectedYear;
      const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesExam && matchesYear && matchesSearch;
    });
  }, [searchQuery, selectedExam, selectedYear]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Previous Year Papers</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Analyze past trends and practice with official papers to ace your exam.</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-white/80">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Exam Filter */}
            <div className="w-full md:col-span-1">
              <label htmlFor="exam" className="block text-sm font-medium text-slate-700 mb-1">Exam</label>
              <select 
                id="exam" 
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)} 
                className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              >
                {examFilters.map(exam => <option key={exam} value={exam}>{exam}</option>)}
              </select>
            </div>
            {/* Year Filter */}
            <div className="w-full md:col-span-1">
              <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-1">Year</label>
              <select 
                id="year" 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : parseInt(e.target.value))} 
                className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              >
                {yearFilters.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            {/* Search Bar */}
            <div className="w-full md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search Papers</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input
                  type="text"
                  id="search"
                  placeholder="e.g., Session 1, Tier 2..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPapers.length > 0 ? (
            filteredPapers.map(paper => (
              <PaperCard
                key={paper.id}
                title={paper.title}
                exam={paper.exam}
                year={paper.year}
              />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-16">
              <div className="inline-block bg-slate-200 p-4 rounded-full">
                  <FiSlack className="w-10 h-10 text-slate-500"/>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-800">No Papers Found</h3>
              <p className="mt-2 text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}