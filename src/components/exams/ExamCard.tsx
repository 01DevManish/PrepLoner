// src/components/exams/ExamCard.tsx

import { FiCalendar, FiCheckSquare, } from 'react-icons/fi';

interface ExamCardProps {
  title: string;
  icon: React.ReactNode;
  conductingBody: string;
  date: string;
}

export default function ExamCard({ title, icon, conductingBody, date }: ExamCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transform hover:-translate-y-1.5 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
        </div>
        <div className="space-y-2 text-sm text-slate-500">
            <p className="flex items-center gap-2"><FiCheckSquare /> <strong>Body:</strong> {conductingBody}</p>
            <p className="flex items-center gap-2"><FiCalendar /> <strong>Date:</strong> {date}</p>
        </div>
      </div>
       <div className="border-t border-slate-200 p-4">
        <button className="w-full text-center font-semibold text-sky-600 hover:text-sky-800 transition-colors">
          Explore Exam
        </button>
      </div>
    </div>
  );
}