'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Tests', href: '/tests' }, // We will create this page later
  { name: 'Results', href: '/results' }, // We will create this page later
  { name: 'Leaderboard', href: '/leaderboard' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600">PrepLoner</h2>
      </div>
      <nav className="px-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <div
                  className={`flex items-center px-4 py-3 my-1 rounded-lg cursor-pointer transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}