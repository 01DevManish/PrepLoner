import { NextResponse } from 'next/server';
import {pool} from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const testId = params.id;
  const client = await pool.connect();

  try {
    // Get the main test details (like title and duration)
    const seriesResult = await client.query(
      'SELECT title FROM test_series WHERE id = $1',
      [testId]
    );

    if (seriesResult.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Test not found' }, { status: 404 });
    }

    // Get all the questions for that test
    const questionsResult = await client.query(
      'SELECT id, question_text, options, correct_option, explanation, topic FROM questions WHERE test_series_id = $1 ORDER BY id',
      [testId]
    );

    const responseData = {
      id: testId,
      title: seriesResult.rows[0].title,
      durationMinutes: 60, // You can add a duration column to your test_series table later
      questions: questionsResult.rows,
    };

    return NextResponse.json({ success: true, data: responseData });

  } catch (error) {
    console.error(`API Error fetching test ${testId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  } finally {
    client.release();
  }
}