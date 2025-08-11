import { FiDownload } from 'react-icons/fi';

export default function ResultList() {
    // Placeholder data
    const results = [
        { id: 1, title: 'Full Syllabus Mock Test #1', score: '75/100', date: 'Aug 10, 2025' },
    ];

    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Results</h2>
            <div className="space-y-4">
                {results.map((result) => (
                    <div key={result.id} className="p-4 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-800">{result.title}</h3>
                            <p className="text-sm text-slate-500">Attempted on {result.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-lg text-indigo-600">{result.score}</span>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100">
                                View Report <FiDownload />
                            </button>
                        </div>
                    </div>
                ))}
                 <div className="text-center pt-4">
                    <p className="text-slate-500">You have no other test results.</p>
                </div>
            </div>
        </div>
    );
}