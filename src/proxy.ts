import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/session'

const PROTECTED = ['/account']
const AUTH_PAGES = ['/auth/login', '/auth/register']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('oblako-token')?.value

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p))

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    const session = await verifySessionToken(token)
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  if (isAuthPage && token) {
    const session = await verifySessionToken(token)
    if (session) {
      return NextResponse.redirect(new URL('/account', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/auth/login', '/auth/register'],
}
