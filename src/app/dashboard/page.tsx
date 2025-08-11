// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import Image from 'next/image';

// Icons
import { FiHome, FiUser, FiClipboard, FiBarChart2, FiSettings, FiLogOut, FiEdit3 } from 'react-icons/fi';
import { BrainCircuit } from 'lucide-react';

// Import the new components
import Profile from '@/components/dashboard/Profile';
import TestList from '@/components/dashboard/TestList';
import ResultList from '@/components/dashboard/ResultList';
import Performance from '@/components/dashboard/Performance';
import Settings from '@/components/dashboard/Settings';

// Define Tab type
type Tab = 'dashboard' | 'profile' | 'tests' | 'results' | 'performance' | 'settings';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'tests':
        return <TestList />;
      case 'results':
        return <ResultList />;
      case 'performance':
        return <Performance />;
      case 'settings':
        return <Settings />;
      default:
        // This is the new, engaging default dashboard view
        return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p>Loading...</p></div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex-col hidden md:flex">
        <div className="h-16 flex items-center justify-center border-b">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-indigo-600" />
            <span className="text-xl font-bold text-slate-900">PrepLoner</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink icon={<FiHome />} text="Dashboard" onClick={() => setActiveTab('dashboard')} active={activeTab === 'dashboard'} />
          <SidebarLink icon={<FiUser />} text="Profile" onClick={() => setActiveTab('profile')} active={activeTab === 'profile'} />
          <SidebarLink icon={<FiClipboard />} text="Tests" onClick={() => setActiveTab('tests')} active={activeTab === 'tests'} />
          <SidebarLink icon={<FiClipboard />} text="Results" onClick={() => setActiveTab('results')} active={activeTab === 'results'} />
          <SidebarLink icon={<FiBarChart2 />} text="Performance" onClick={() => setActiveTab('performance')} active={activeTab === 'performance'} />
          <SidebarLink icon={<FiSettings />} text="Settings" onClick={() => setActiveTab('settings')} active={activeTab === 'settings'} />
        </nav>
        <div className="px-4 py-6 border-t">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            <FiLogOut className="h-5 w-5" /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pb-0 pb-20"> {/* Padding-bottom for mobile nav */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-800 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">Welcome, {user.displayName || user.email}</span>
            {user.photoURL ? (
              <Image src={user.photoURL} alt="Profile" width={36} height={36} className="rounded-full" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      {/* Mobile Bottom Navigation -- THIS IS NEW */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2">
         <MobileNavLink icon={<FiHome />} text="Home" onClick={() => setActiveTab('dashboard')} active={activeTab === 'dashboard'} />
         <MobileNavLink icon={<FiClipboard />} text="Tests" onClick={() => setActiveTab('tests')} active={activeTab === 'tests'} />
         <MobileNavLink icon={<FiBarChart2 />} text="Stats" onClick={() => setActiveTab('performance')} active={activeTab === 'performance'} />
         <MobileNavLink icon={<FiUser />} text="Profile" onClick={() => setActiveTab('profile')} active={activeTab === 'profile'} />
         <button onClick={handleLogout} className="flex flex-col items-center justify-center text-xs text-slate-600 hover:text-indigo-600 w-16">
            <FiLogOut className="h-6 w-6 mb-1"/>
            <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

// --- Helper Components ---

// New Component for the Default Dashboard View
function DashboardHome({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  // Placeholder data
  const stats = {
    testsTaken: 5,
    averageScore: 78,
    hoursStudied: 12,
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Tests Taken" value={stats.testsTaken.toString()} />
        <StatCard title="Average Score" value={`${stats.averageScore}%`} />
        <StatCard title="Hours Studied" value={stats.hoursStudied.toString()} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready for a challenge?</h2>
        <p className="mt-2 text-slate-600">Start a new mock test now and put your knowledge to the test.</p>
        <button 
          onClick={() => setActiveTab('tests')}
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-lg"
        >
          <FiEdit3 />
          Start New Test
        </button>
      </div>
    </div>
  );
}

// Helper for Stats Cards
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
    </div>
  );
}

// Sidebar Link Helper Component
function SidebarLink({ icon, text, onClick, active }: { icon: React.ReactNode; text: string; onClick: () => void; active: boolean; }) {
  const baseClasses = "w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium cursor-pointer";
  const activeClasses = "bg-indigo-50 text-indigo-600";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";
  return (
    <button onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      {icon}<span>{text}</span>
    </button>
  );
}

// Mobile Nav Link Helper Component -- THIS IS NEW
function MobileNavLink({ icon, text, onClick, active }: { icon: React.ReactNode; text: string; onClick: () => void; active: boolean; }) {
  const activeClasses = "text-indigo-600";
  const inactiveClasses = "text-slate-600 hover:text-indigo-600";
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center text-xs w-16 ${active ? activeClasses : inactiveClasses}`}>
      <div className="h-6 w-6 mb-1">{icon}</div>
      <span>{text}</span>
    </button>
  );
}