import { NextResponse } from 'next/server';
import { createOrGetUser, getUserByUsername, updateUserProgress } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username query parameter is required' },
        { status: 400 }
      );
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { username } = body || {};

    if (!username || typeof username !== 'string' || username.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Username must be at least 2 characters long' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().substring(0, 30);
    const { user, created } = await createOrGetUser(cleanUsername);

    return NextResponse.json({
      success: true,
      user,
      created,
      message: created
        ? `Welcome, ${user.username}! Your profile has been created in Neon PostgreSQL.`
        : `Welcome back, ${user.username}! Loaded progress from Neon PostgreSQL.`,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { username, xp, level, streak, completedSections, completedQuizzes } = body || {};

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username is required to update progress' },
        { status: 400 }
      );
    }

    const user = await updateUserProgress(username, {
      xp: typeof xp === 'number' ? xp : undefined,
      level: typeof level === 'number' ? level : undefined,
      streak: typeof streak === 'number' ? streak : undefined,
      completedSections: Array.isArray(completedSections) ? completedSections : undefined,
      completedQuizzes: typeof completedQuizzes === 'object' ? completedQuizzes : undefined,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found for update' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
      message: 'Progress synced to Neon PostgreSQL',
    });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
