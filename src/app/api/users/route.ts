import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; // adjust path if needed

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return NextResponse.json({ success: true, users: result.rows });
  } catch (error) {
    console.error('Database error:', error);

    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    // If it's not an Error instance, handle it as an unknown error
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}