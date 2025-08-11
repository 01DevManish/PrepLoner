'use client';

import { useState } from 'react';

export default function AdminTestsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const response = await fetch('/api/admin/tests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        sub_category_id: parseInt(subCategoryId),
      }),
    });

    const result = await response.json();

    if (result.success) {
      setMessage('Test series created successfully!');
      setTitle('');
      setDescription('');
      setSubCategoryId('');
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Tests</h1>
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold">Create New Test Series</h2>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Test Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="subCategoryId" className="block text-sm font-medium text-slate-700">Sub-Category ID</label>
            <input
              type="number"
              id="subCategoryId"
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., 1 for Python, 3 for GATE CS"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Create Test
            </button>
          </div>
          {message && <p className="text-sm text-slate-600 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}