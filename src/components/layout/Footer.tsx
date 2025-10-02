'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
    const pathname = usePathname();
    
    // Don't show footer on the test page
    if (pathname.startsWith('/test/')) {
        return null;
    }

    return (
        <footer className="bg-black-200 text-black-100 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} PrepLoner. All Rights Reserved.
                    </p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <Link href="privacy-policy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="terms-of-services" className="hover:text-white">Terms of Service</Link>
                        <Link href="contact-us" className="hover:text-white">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}