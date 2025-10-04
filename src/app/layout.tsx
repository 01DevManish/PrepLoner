import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"; // Correct import for App Router
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrepLoner - Your Ultimate Test Prep Partner',
  description: 'Topic-wise and subject-wise tests for GATE, SSC, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />

        {/* --- ANALYTICS --- */}
        {/* This ensures analytics only run on your live website */}
        {process.env.NODE_ENV === "production" && (
          <>
            <GoogleAnalytics />
            <Analytics />
          </>
        )}
        {/* --- END ANALYTICS --- */}
        
      </body>
    </html>
  );
}