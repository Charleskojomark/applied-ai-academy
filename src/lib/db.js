import { neon } from '@neondatabase/serverless';

const DEFAULT_DATABASE_URL = "postgresql://neondb_owner:npg_gIUdPma04KEo@ep-spring-butterfly-b4uo93q8-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export function getDb() {
  const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
  return neon(url);
}

/**
 * Ensure the users table exists in Neon PostgreSQL
 */
export async function ensureUsersTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak INTEGER DEFAULT 1,
      completed_sections JSONB DEFAULT '[]'::jsonb,
      completed_quizzes JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS achievements JSONB DEFAULT '[]'::jsonb;
    `;
  } catch (e) {
    // Column may already exist or table alteration not permitted
  }
}

/**
 * Get user by username
 */
export async function getUserByUsername(username) {
  if (!username || typeof username !== 'string') return null;
  const sql = getDb();
  await ensureUsersTable();
  
  const cleanUsername = username.trim().toLowerCase();
  const rows = await sql`
    SELECT * FROM users 
    WHERE LOWER(username) = ${cleanUsername}
    LIMIT 1
  `;
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Create user with username, or return existing
 */
export async function createOrGetUser(username) {
  if (!username || typeof username !== 'string') {
    throw new Error('Valid username is required');
  }
  
  const sql = getDb();
  await ensureUsersTable();

  const cleanUsername = username.trim();
  const lowerUsername = cleanUsername.toLowerCase();

  // Try to find existing first
  const existing = await sql`
    SELECT * FROM users 
    WHERE LOWER(username) = ${lowerUsername}
    LIMIT 1
  `;

  if (existing.length > 0) {
    return { user: existing[0], created: false };
  }

  // Insert new user
  const inserted = await sql`
    INSERT INTO users (username, xp, level, streak, completed_sections, completed_quizzes, achievements)
    VALUES (${cleanUsername}, 0, 1, 1, '[]'::jsonb, '{}'::jsonb, '[]'::jsonb)
    RETURNING *
  `;

  return { user: inserted[0], created: true };
}

/**
 * Update user progress
 */
export async function updateUserProgress(username, { xp, level, streak, completedSections, completedQuizzes, achievements }) {
  if (!username) throw new Error('Username is required');
  const sql = getDb();
  await ensureUsersTable();

  const lowerUsername = username.trim().toLowerCase();

  const updated = await sql`
    UPDATE users
    SET 
      xp = COALESCE(${xp}, xp),
      level = COALESCE(${level}, level),
      streak = COALESCE(${streak}, streak),
      completed_sections = COALESCE(${completedSections ? JSON.stringify(completedSections) : null}::jsonb, completed_sections),
      completed_quizzes = COALESCE(${completedQuizzes ? JSON.stringify(completedQuizzes) : null}::jsonb, completed_quizzes),
      achievements = COALESCE(${achievements ? JSON.stringify(achievements) : null}::jsonb, achievements),
      updated_at = CURRENT_TIMESTAMP
    WHERE LOWER(username) = ${lowerUsername}
    RETURNING *
  `;

  return updated.length > 0 ? updated[0] : null;
}
