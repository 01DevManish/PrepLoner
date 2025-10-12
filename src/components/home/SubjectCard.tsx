'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpenIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

type SubjectCardProps = {
  subject: {
    subjectName: string;
    topics: { name: string; count: number }[];
    questionCount: number;
  };
};

export default function SubjectCard({ subject }: SubjectCardProps) {
  const [lastScores, setLastScores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('prepLonerScores') || '{}');
    setLastScores(storedScores);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="h-8 w-8 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {subject.subjectName}
          </h2>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
          {subject.questionCount} Questions
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {subject.topics.map((topic, topicIndex) => (
          <Link
            key={topicIndex}
            href={`/test/${encodeURIComponent(topic.name)}`}
            className="flex items-center justify-between gap-2 px-3 py-1.5 font-medium text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-800 dark:hover:text-white transition-colors duration-200"
          >
            <span>{topic.name} ({topic.count})</span>
            {lastScores[topic.name] && (
              <span className="ml-2 font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 rounded-md">
                {lastScores[topic.name]}
              </span>
            )}
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
