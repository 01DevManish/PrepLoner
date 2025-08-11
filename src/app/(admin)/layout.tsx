import { FiGrid, FiClipboard, FiHelpCircle, FiFileText } from 'react-icons/fi';
import Link from 'next/link';
import Logo from '@/components/layout/Logo'; // Assuming your logo component

// Helper component for sidebar links
function AdminSidebarLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 transition-all hover:text-slate-900 hover:bg-slate-100">
      {icon}
      {text}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-slate-100/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6" />
              <span>PrepLoner Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <AdminSidebarLink href="/admin/dashboard" icon={<FiGrid className="h-4 w-4" />} text="Dashboard" />
              <AdminSidebarLink href="/admin/tests" icon={<FiClipboard className="h-4 w-4" />} text="Tests" />
              <AdminSidebarLink href="/admin/exams" icon={<FiFileText className="h-4 w-4" />} text="Exams" />
              <AdminSidebarLink href="/admin/questions" icon={<FiHelpCircle className="h-4 w-4" />} text="Questions" />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}