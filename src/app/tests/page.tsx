// src/app/tests/page.tsx
'use client';

import { useState, useEffect, useMemo, ReactNode } from 'react';
import TestCard from '@/components/tests/TestCard';
import { FiCode, FiCpu, FiAward, FiSearch, FiSlack, FiLoader } from 'react-icons/fi';

// Define the shape of the data we expect from the API
interface TestSeries {
  id: number;
  title: string;
  category: string;
  sub_category: string;
  total_tests: number;
  total_questions: number;
  // You might want to add duration to your DB schema later
  duration?: number; 
}

// These can now be simplified as we'll filter based on API data
const categoryFilters = ['All', 'Programming', 'GATE', 'Government'];

const categoryIcons: Record<string, ReactNode> = {
    Programming: <FiCode className="w-6 h-6"/>,
    GATE: <FiCpu className="w-6 h-6"/>,
    Government: <FiAward className="w-6 h-6"/>,
}

export default function TestsPage() {
  const [allTests, setAllTests] = useState<TestSeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch data from our API when the component mounts
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/tests');
        const result = await response.json();
        if (result.success) {
          setAllTests(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch tests", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTests();
  }, []);
  

  // The filtering logic now works on the state fetched from the DB
  const filteredTests = useMemo(() => {
    return allTests.filter(test => {
        const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, allTests]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Explore Test Series</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Find the perfect practice tests to sharpen your skills and ace your exams.</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-white/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select id="category" onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                {categoryFilters.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input type="text" id="search" placeholder="Search for tests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Test Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <FiLoader className="w-10 h-10 text-indigo-600 animate-spin mx-auto"/>
            <p className="mt-4 text-slate-500">Loading Tests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTests.length > 0 ? (
              filteredTests.map(test => (
  <TestCard
    key={test.id}
    id={test.id} // 👈 Add this line
    title={test.title}
    categoryIcon={categoryIcons[test.category] || <FiAward />}
    testCount={test.total_tests}
    questionCount={test.total_questions}
    duration={test.duration || 180} 
  />
))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16">
                  <div className="inline-block bg-slate-200 p-4 rounded-full"><FiSlack className="w-10 h-10 text-slate-500"/></div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-800">No Tests Found</h3>
                  <p className="mt-2 text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}