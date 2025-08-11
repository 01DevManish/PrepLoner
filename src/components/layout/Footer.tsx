// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();

    // Don't show the footer on dashboard or auth pages
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth')) {
        return null;
    }

    return (
      <footer className="w-full bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto py-12 px-4 md:px-6 grid md:grid-cols-3 gap-8">
              {/* Column 1: Brand */}
              <div className="space-y-4">
                  <Link href="/" className="flex items-center gap-2">
                    <BrainCircuit className="h-7 w-7 text-indigo-600" />
                    <span className="text-2xl font-bold text-slate-900">PrepLoner</span>
                  </Link>
                  <p className="text-sm text-slate-500">
                    Your personal AI study partner for exam success.
                  </p>
                  <p className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} PrepLoner. All Rights Reserved.
                  </p>
              </div>

              {/* Column 2: Links */}
              <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                      <li><Link href="/#features" className="text-sm text-slate-600 hover:text-indigo-600">Features</Link></li>
                      <li><Link href="/auth" className="text-sm text-slate-600 hover:text-indigo-600">Sign Up</Link></li>
                  </ul>
              </div>

              {/* Column 3: Legal */}
              <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
                  <ul className="space-y-2">
                      <li><Link href="#" className="text-sm text-slate-600 hover:text-indigo-600">Terms of Service</Link></li>
                      <li><Link href="#" className="text-sm text-slate-600 hover:text-indigo-600">Privacy Policy</Link></li>
                  </ul>
              </div>
          </div>
      </footer>
    );
}