// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FiGrid, FiLogOut } from 'react-icons/fi';

// Import the new Logo component
import Logo from './Logo';

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Don't show the public header on dashboard or auth pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto h-16 flex items-center justify-between px-4 md:px-6">
        {/* Left Side: Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-2xl font-bold text-slate-900">PrepLoner</span>
        </Link>
        
        {/* Center: Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/tests" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Tests
          </Link>
          <Link href="exams" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Exams
          </Link>
          <Link href="/papers" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Previous Year Paper
          </Link>
        </nav>

        {/* Right Side: Auth buttons or User Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              {/* Profile Picture */}
              <div className="w-10 h-10 rounded-full cursor-pointer">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Dropdown Menu on Hover */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-slate-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  <FiGrid className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/auth" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block">
                Login
              </Link>
              <Link
                href="/auth"
                className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}