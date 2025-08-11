// src/app/page.tsx
import Link from 'next/link';
import { BookOpen, BarChart3, BrainCircuit } from 'lucide-react';

export default function HomePage() {
  return (
    // The <main> tag is now the top-level element here
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-32 lg:pt-32 lg:pb-40 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                Powered by LearnLoner
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                Stop Guessing. Start Improving.
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-slate-600 sm:text-xl">
                PrepLoner is your personal AI study partner. Take realistic mock tests and get targeted feedback to conquer your exams with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-md bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700 scale-100 hover:scale-105"
              >
                Start Your First Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A Smarter Way to Prepare
              </h2>
              <p className="max-w-3xl text-lg text-slate-600">
                Go beyond simple practice. Our platform provides the tools you need to understand your performance and improve strategically.
              </p>
            </div>
            <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
                title="Unlimited Mock Tests"
                description="Practice as much as you need with a vast library of questions across all your subjects."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-indigo-600" />}
                title="Detailed Reports"
                description="Analyze your performance with in-depth reports on accuracy, speed, and topic-wise strength."
              />
              <FeatureCard
                icon={<BrainCircuit className="h-8 w-8 text-indigo-600" />}
                title="Gemini AI Suggestions"
                description="Receive personalized, actionable advice from Gemini AI to target your specific weak areas."
              />
            </div>
          </div>
        </section>
    </main>
  );
}

// Helper component for Feature Cards to keep the main component clean
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="flex flex-col items-start p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all">
      <div className="mb-4 p-3 bg-indigo-100 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-base text-slate-600">{description}</p>
    </div>
  );
}