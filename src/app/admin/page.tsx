'use client';

import { withAuth } from '@/components/auth/withAuth';
import { FC } from 'react'; // 1. Import FC (Functional Component) type

// 2. Explicitly type AdminPage as a Functional Component (FC)
const AdminPage: FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p>Welcome, admin!</p>
    </div>
  );
};

export default withAuth(AdminPage, 'admin');