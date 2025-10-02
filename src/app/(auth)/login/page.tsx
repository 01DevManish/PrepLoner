'use client';

import { useState } from 'react';
// FIX: Removed unused 'useRouter' import.
import Link from 'next/link';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
// NOTE: The supabaseClient import is not needed here as per your provided code.
// If you need it later, you would import `createClient`.

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.545,44,27.938,44,20C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleFirebaseLogin = async (user: User) => {
    const firebaseToken = await user.getIdToken();
    const res = await fetch('/api/auth/supabase-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: firebaseToken }),
    });

    if (!res.ok) {
        const { error, details } = await res.json();
        throw new Error(details || error || 'Authentication failed.');
    }
    
    window.location.assign('/');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleFirebaseLogin(userCredential.user);
    } catch (error: unknown) { // FIX: Changed 'error: any' to 'error: unknown'
      if (error instanceof Error) {
        setMessage(error.message.replace('Firebase: ', ''));
      } else {
        setMessage('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleFirebaseLogin(result.user);
    } catch (error: unknown) { // FIX: Changed 'error: any' to 'error: unknown'
      if (error instanceof Error) {
        setMessage(error.message.replace('Firebase: ', ''));
      } else {
        setMessage('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back to PrepLoner</h1>
          <p className="mt-2 text-gray-600">Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full p-3 h-11 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full p-3 h-11 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
          </div>
          {message && <p className="text-center text-sm font-medium text-red-500">{message}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">OR</span></div></div>

        <button onClick={handleGoogleSignIn} disabled={loading} className="w-full py-3 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-3 transition-colors">
          <GoogleIcon />
          Sign in with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          {/* FIX: Replaced ' with &apos; to fix the unescaped entity error. */}
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}