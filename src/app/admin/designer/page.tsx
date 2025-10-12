'use client';

import { withAuth } from '@/components/auth/withAuth';

const DesignerPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Designer Panel</h1>
      <p>Welcome, designer!</p>
    </div>
  );
};

export default withAuth(DesignerPage, 'designer');
