import { Timestamp } from 'firebase/firestore'; // Assuming you might use this from Firestore

export type Question = {
  id: number;
  question_type: 'MCQ' | 'MSQ' | 'NAT';
  question_text: string;
  options: { text: string }[];
  // FIX: Replaced 'any' with a specific type for different answer formats
  correct_answer: { 
    index?: number;      // For MCQ
    indices?: number[];    // For MSQ
    value?: number;        // For NAT
  };
  explanation: string;
  marks_correct: number;
  marks_incorrect: number;
};

export type Test = {
  id: number;
  title: string;
  description: string;
  duration_minutes: number;
};

export type UserProfile = {
  id: string; // This could be Firebase UID or Supabase UUID depending on your final auth
  full_name: string;
  xp: number;
  level: number;
  role?: string;
};

export type TestAttempt = {
  id: number | string; // ID can be number from Supabase or string from Firestore
  user_id: string;
  test_id: number;
  score: number;
  xp_gained: number;
  // FIX: Replaced 'any' with a safer, more generic object type
  submitted_answers: Record<string, unknown>; // Represents a JSON object of answers
  completed_at: string | Timestamp; // Can be string or Firestore Timestamp
};