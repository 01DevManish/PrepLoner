'use client';

import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Profile</h2>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="flex-shrink-0">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-5xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
            Change Picture
          </button>
        </div>
        <div className="flex-grow w-full">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user.displayName || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user.email || ''}
                disabled
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm bg-slate-100 cursor-not-allowed"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}