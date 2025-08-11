// src/app/auth/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/auth/AuthForm'; // We will create this new component
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Show a loading state while checking auth
  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4">
       <div className="absolute top-4 left-4">
         <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <BrainCircuit className="h-6 w-6" />
            <span className="font-semibold">PrepLoner</span>
          </Link>
       </div>
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}