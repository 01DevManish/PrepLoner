import SubjectCard from '@/components/home/SubjectCard';
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
import dmQuestions from '@/data/dm-questions.json';

type SubjectGroup = {
  subjectName: string;
  topics: { name: string; count: number }[];
  questionCount: number;
};

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome to PrepLoner
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your ultimate partner for cracking competitive exams. Choose a subject and start your journey to success.
          </p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjectsWithTopics.map((subject, subjectIndex) => (
            <SubjectCard key={subjectIndex} subject={subject} />
          ))}
        </main>
      </div>
    </div>
  );
}
