'use client'; 

import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

import gaQuestions from '@/data/ga-questions.json';
import mathQuestions from '@/data/math-questions.json';
import dlQuestions from '@/data/dl-questions.json';
import coaQuestions from '@/data/coa-questions.json';
import dsQuestions from '@/data/ds-questions.json';
import algoQuestions from '@/data/algo-questions.json';
import tocQuestions from '@/data/toc-questions.json';
import cdQuestions from '@/data/cd-questions.json';
import osQuestions from '@/data/os-questions.json';
import dbmsQuestions from '@/data/dbms-questions.json';
import cnQuestions from '@/data/cn-questions.json';
// You had a 'dm-questions.json' import, make sure the file exists or remove the import if not.
// For this example, I'll assume it exists. If not, delete the import and the line in processSubject below.
import dmQuestions from '@/data/dm-questions.json';


type SubjectGroup = {
  subjectName: string;
  topics: { name: string; count: number }[];
  questionCount: number;
};

// THE FIX IS HERE: Replaced 'any[]' with a more specific type
const processSubject = (subjectName: string, questions: { topic: string }[]): SubjectGroup | null => {
  if (!questions || questions.length === 0) {
    return null;
  }
  
  const topicCounts = new Map<string, number>();
  for (const q of questions) {
    topicCounts.set(q.topic, (topicCounts.get(q.topic) || 0) + 1);
  }

  return {
    subjectName,
    topics: Array.from(topicCounts, ([name, count]) => ({ name, count })),
    questionCount: questions.length,
  };
};

export default function HomePage() {
  const [lastScores, setLastScores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('prepLonerScores') || '{}');
    setLastScores(storedScores);
  }, []);

  const subjectsWithTopics = [
    processSubject("General Aptitude", gaQuestions),
    processSubject("Engineering Mathematics", mathQuestions),
    processSubject("Discrete Mathematics", dmQuestions),
    processSubject("Digital Logic", dlQuestions),
    processSubject("Computer Organization and Architecture", coaQuestions),
    processSubject("Programming and Data Structures", dsQuestions),
    processSubject("Algorithms", algoQuestions),
    processSubject("Theory of Computation", tocQuestions),
    processSubject("Compiler Design", cdQuestions),
    processSubject("Operating Systems", osQuestions),
    processSubject("Database Management Systems (DBMS)", dbmsQuestions),
    processSubject("Computer Networks", cnQuestions),
  ].filter((s): s is SubjectGroup => s !== null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            PrepLoner
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Select a subject and topic to begin your practice.
          </p>
        </header>
        
        <main className="space-y-8">
          {subjectsWithTopics.map((subject, subjectIndex) => (
            <div key={subjectIndex} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpenIcon className="h-7 w-7 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    {subject.subjectName}
                  </h2>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {subject.questionCount} Questions
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {subject.topics.map((topic, topicIndex) => (
                  <Link
                    key={topicIndex}
                    href={`/test/${encodeURIComponent(topic.name)}`}
                    className="flex items-center justify-between gap-4 px-4 py-2 font-medium text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    <span>{topic.name} ({topic.count})</span>
                    {lastScores[topic.name] && (
                      <span className="ml-2 font-bold text-blue-600 bg-blue-100 px-2 rounded-md">
                        {lastScores[topic.name]}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}