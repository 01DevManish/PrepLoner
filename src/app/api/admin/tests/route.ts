import { NextResponse } from 'next/server';
import {pool }from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // Note: In a real app, you would add admin authentication here

  const { title, description, sub_category_id } = await req.json();

  if (!title || !sub_category_id) {
    return NextResponse.json({ success: false, error: 'Title and sub-category are required' }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO test_series (title, description, sub_category_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await client.query(query, [title, description, sub_category_id]);
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  } finally {
    client.release();
  }
}