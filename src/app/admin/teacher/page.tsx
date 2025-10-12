'use client';

import { withAuth } from '@/components/auth/withAuth';

const TeacherPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teacher Panel</h1>
      <p>Welcome, teacher!</p>
    </div>
  );
};

export default withAuth(TeacherPage, 'teacher');
