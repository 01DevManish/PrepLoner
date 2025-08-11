import { NextResponse } from 'next/server';
// This 'default' import now matches the 'export default' in db.ts
import {pool}  from '../../../lib/db'; 

export const dynamic = 'force-dynamic';

export async function GET() {
  const client = await pool.connect();
  
  try {
    const query = `
      SELECT 
        ts.id, ts.title, ts.description, ts.total_tests, ts.total_questions,
        sc.name as sub_category, c.name as category
      FROM test_series ts
      LEFT JOIN sub_categories sc ON ts.sub_category_id = sc.id
      LEFT JOIN categories c ON sc.category_id = c.id;
    `;

    const { rows } = await client.query(query);
    return NextResponse.json({ success: true, data: rows });

  } catch (error) {
    console.error('Failed to fetch test series:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });

  } finally {
    client.release();
  }
}