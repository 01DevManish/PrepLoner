export const runtime = 'edge';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Firebase token not provided' }, { status: 400 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid: firebase_uid, email, name } = decodedToken;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let supabaseUserId: string;

    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 is "No rows found"
      throw selectError;
    }

    if (existingUser) {
      supabaseUserId = existingUser.id;
    } else {
      const { data: { user: newUser }, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        email_confirm: true,
        user_metadata: {
          full_name: name,
          firebase_uid: firebase_uid,
        }
      });
      if (createError) throw createError;
      if (!newUser) throw new Error("Failed to create a new user in Supabase Auth.");

      const { error: insertError } = await supabaseAdmin.from('users').insert({
        id: newUser.id,
        full_name: name,
        email: email,
      });
      if (insertError) throw insertError;
      
      supabaseUserId = newUser.id;
    }
    
    const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!supabaseJwtSecret) throw new Error('Supabase JWT Secret is not set');

    const payload = {
      sub: supabaseUserId,
      email: email,
      role: 'authenticated',
      aud: 'authenticated',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expires in 1 hour
    };
    const supabaseToken = jwt.sign(payload, supabaseJwtSecret);
    
    const cookieStore = await cookies(); 
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) { return cookieStore.get(name)?.value },
            set(name: string, value: string, options) { cookieStore.set({ name, value, ...options }) },
            remove(name: string, options) { cookieStore.set({ name, value: '', ...options }) },
          },
        }
    );
      
    const { error: sessionError } = await supabase.auth.setSession({
        access_token: supabaseToken,
        refresh_token: 'dummy-refresh-token',
    });

    if (sessionError) throw sessionError;

    return NextResponse.json({ message: 'Authentication successful' });

  } catch (error: unknown) { // THE FIX IS HERE
    console.error('Error during Supabase auth:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: 'Authentication failed', details: errorMessage }, { status: 500 });
  }

}
