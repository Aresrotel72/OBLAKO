/**
 * Server-side auth utilities (Node.js runtime only — do NOT import from proxy.ts)
 */
import { SignJWT, jwtVerify } from 'jose'
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import type { SessionPayload } from './session'

export type { SessionPayload }

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'oblako-storefront-secret-2026'
)

const COOKIE_NAME = 'oblako-token'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 дней

// ============================================
// Password hashing (Node.js crypto)
// ============================================

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const hashBuf = Buffer.from(hash, 'hex')
  const derived = scryptSync(password, salt, 64)
  return timingSafeEqual(hashBuf, derived)
}

// ============================================
// JWT
// ============================================

async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET)
}

async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

// ============================================
// Cookie helpers (Server Components / Actions)
// ============================================

export async function setSession(payload: SessionPayload): Promise<void> {
  const token = await signToken(payload)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
