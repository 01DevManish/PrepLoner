// src/components/tests/TestCard.tsx

import Link from 'next/link'; // 👈 Import the Link component
import { FiBookOpen, FiClock, FiFileText } from 'react-icons/fi';

interface TestCardProps {
  id: number; // 👈 Add the id prop
  title: string;
  categoryIcon: React.ReactNode;
  testCount: number;
  questionCount: number;
  duration: number;
}

export default function TestCard({ id, title, categoryIcon, testCount, questionCount, duration }: TestCardProps) {
  return (
    // 👇 Wrap the entire card in a Link component
    <Link href={`/tests/${id}`} className="block"> 
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transform hover:-translate-y-1.5 transition-transform duration-300 flex flex-col h-full">
        <div className="p-6 flex-grow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              {categoryIcon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <span className="flex items-center gap-2"><FiFileText /> {testCount} Tests</span>
            <span className="flex items-center gap-2"><FiBookOpen /> {questionCount} Questions</span>
            <span className="flex items-center gap-2"><FiClock /> {duration} Mins</span>
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-4 text-center font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
          Start Test
        </div>
      </div>
    </Link>
  );
}