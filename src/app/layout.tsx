import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"; // Correct import for App Router
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from 'next-themes';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | PrepLoner',
    default: 'PrepLoner - Your Ultimate Test Prep Partner',
  },
  description: 'Topic-wise and subject-wise tests for GATE, SSC, and more. Prepare for your exams with our extensive question bank.',
  keywords: ['GATE', 'SSC', 'Test Prep', 'Engineering', 'Computer Science', 'General Aptitude'],
  robots: 'index, follow',
  openGraph: {
    title: 'PrepLoner - Your Ultimate Test Prep Partner',
    description: 'Topic-wise and subject-wise tests for GATE, SSC, and more.',
    images: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
              <Analytics />
            </>
          )}
          {/* --- END ANALYTICS --- */}
        </ThemeProvider>
      </body>
    </html>
  );
}
