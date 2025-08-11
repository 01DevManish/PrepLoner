// src/components/papers/PaperCard.tsx

import { FiDownload, FiFileText } from 'react-icons/fi';

interface PaperCardProps {
  title: string;
  year: number;
  exam: string;
}

export default function PaperCard({ title, year, exam }: PaperCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm transform hover:-translate-y-1.5 transition-transform duration-300">
      <div className="p-6">
        <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{exam}</span>
        <h3 className="text-lg font-bold text-slate-900 mt-3">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">Year: {year}</p>
      </div>
      <div className="border-t border-slate-200 p-4 flex items-center justify-between gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100">
            <FiFileText /> Question Paper
        </button>
         <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100">
            <FiDownload /> Answer Key
        </button>
      </div>
    </div>
  );
}