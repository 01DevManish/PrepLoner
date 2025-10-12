'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();
    
    if (pathname.startsWith('/test/')) {
        return null;
    }

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            PrepLoner
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your ultimate partner for cracking competitive exams.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <Twitter className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Solutions</h3>
                            <ul className="mt-4 space-y-4">
                                <li><Link href="/exams" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Exams</Link></li>
                                <li><Link href="/previous-year-papers" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Previous Year Papers</Link></li>
                                <li><Link href="/notes" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Notes</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Support</h3>
                            <ul className="mt-4 space-y-4">
                                <li><Link href="/contact-us" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
                            <ul className="mt-4 space-y-4">
                                <li><Link href="/privacy-policy" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-base text-gray-600 dark:text-gray-400 text-center">&copy; {new Date().getFullYear()} PrepLoner. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
