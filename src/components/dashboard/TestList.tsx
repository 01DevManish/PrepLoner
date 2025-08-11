import { FiChevronRight } from 'react-icons/fi';

export default function TestList() {
  // Placeholder data - this would come from your database
  const tests = [
    { id: 1, title: 'Full Syllabus Mock Test #1', questions: 100, duration: '180 mins' },
    { id: 2, title: 'Previous Year Paper - 2023', questions: 100, duration: '180 mins' },
    { id: 3, title: 'Topic Test: Algebra', questions: 25, duration: '30 mins' },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Tests</h2>
      <div className="space-y-4">
        {tests.map((test) => (
          <div key={test.id} className="p-4 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-50">
            <div>
              <h3 className="font-semibold text-slate-800">{test.title}</h3>
              <p className="text-sm text-slate-500">{test.questions} Questions &bull; {test.duration}</p>
            </div>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Start Test <FiChevronRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}