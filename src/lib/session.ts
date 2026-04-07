/**
 * Edge-compatible JWT utilities (no Node.js crypto)
 * Used by proxy.ts (runs in Edge Runtime)
 */
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'oblako-storefront-secret-2026'
)

export interface SessionPayload {
  sub: string
  name: string
  phone: string
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}
