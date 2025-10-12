'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebaseClient';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

import {
  FileText,
  Flame,
  History,
  Award,
  Star,
} from 'lucide-react';
import React from 'react';

// --- Type Definitions ---
interface UserData {
  fullName: string;
  xp: number;
  streak: number;
  lastLogin: Timestamp;
}

interface TestAttempt {
  id: string;
  topic: string;
  score: number;
  totalQuestions: number;
  createdAt: Timestamp;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}

// Helper function to calculate level
const getLevelConfig = (streak: number) => {
  if (streak >= 30) return { level: 5 };
  if (streak >= 20) return { level: 4 };
  if (streak >= 10) return { level: 3 };
  if (streak >= 5) return { level: 2 };
  return { level: 1 };
};

// Stat Card Component
const StatCard = ({ title, value, icon, description }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      {icon}
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
  </div>
);

// Main Dashboard Page Component
const DashboardPage = () => {
  // The 'user' state was unused, so it's removed. We only need userData.
  const [userData, setUserData] = useState<UserData | null>(null);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (loggedInUser) => {
      try {
        if (loggedInUser) {
          const userDocRef = doc(db, 'users', loggedInUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
          const testAttemptsRef = collection(db, 'testAttempts');
          const q = query(testAttemptsRef, where('userId', '==', loggedInUser.uid), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          
          const attempts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as TestAttempt[];
          
          setTestAttempts(attempts);
        } else {
          setUserData(null);
          setTestAttempts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
     return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalTests = testAttempts.length;
  // 'averageScore' was calculated but not used, so it's removed.
  
  const { level } = getLevelConfig(userData?.streak || 0);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <aside className="w-64">
        {/* Your real sidebar content would go here */}
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Welcome back, {userData?.fullName?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-500 mt-1">Here&apos;s your progress summary. Keep up the great work!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Current Level"
            value={level}
            icon={<Award className="h-5 w-5 text-purple-500" />}
            description="Based on your streak."
          />
          <StatCard
            title="Total XP"
            value={userData?.xp || 0}
            icon={<Star className="h-5 w-5 text-yellow-500" />}
            description="Keep learning to earn more!"
          />
          <StatCard
            title="Current Streak"
            value={userData?.streak || 0}
            icon={<Flame className="h-5 w-5 text-orange-500" />}
            description="Don't miss a day!"
          />
          <StatCard
            title="Tests Taken"
            value={totalTests}
            icon={<FileText className="h-5 w-5 text-indigo-500" />}
            description="Practice makes perfect."
          />
        </div>

        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold flex items-center mb-4">
            <History className="h-6 w-6 mr-3 text-blue-500" />
            Recent History
          </h2>
          <div className="space-y-4">
            {testAttempts.length > 0 ? testAttempts.map((attempt) => (
              <div key={attempt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                 <div>
                    <p className="font-bold text-slate-700">{attempt.topic}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(attempt.createdAt.seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <div className="text-left sm:text-right">
                      <p className="text-lg font-bold text-blue-600">{attempt.score} / {attempt.totalQuestions}</p>
                      <p className="text-sm text-slate-500">{((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-500 py-8">You haven&apos;t attempted any tests yet. Start a test to see your history!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;