'use client';

import { withAuth } from '@/components/auth/withAuth';

const EditorPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editor Panel</h1>
      <p>Welcome, editor!</p>
    </div>
  );
};

export default withAuth(EditorPage, 'editor');
