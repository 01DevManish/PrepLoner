'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuth();

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <nav>
          <ul>
            <li>
              <Link href="/admin" className="block py-2 px-4 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            {(role === 'admin') && (
              <li>
                <Link href="/admin/users" className="block py-2 px-4 hover:bg-gray-700">
                  User Management
                </Link>
              </li>
            )}
            {(role === 'admin' || role === 'editor') && (
              <li>
                <Link href="/admin/editor" className="block py-2 px-4 hover:bg-gray-700">
                  Editor
                </Link>
              </li>
            )}
            {(role === 'admin' || role === 'designer') && (
              <li>
                <Link href="/admin/designer" className="block py-2 px-4 hover:bg-gray-700">
                  Designer
                </Link>
              </li>
            )}
            {(role === 'admin' || role === 'teacher') && (
              <li>
                <Link href="/admin/teacher" className="block py-2 px-4 hover:bg-gray-700">
                  Teacher
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
