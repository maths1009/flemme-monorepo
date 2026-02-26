import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('connect.sid');
  const { pathname } = request.nextUrl;

  // 1. Exclude public assets and APIs from Middleware logic logic to keep it fast
  // (Even though matcher handles most, explicit check is safer for edge cases)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // files like favicon.ico, images
  ) {
    return NextResponse.next();
  }


  // 2. Auth Routes (Login, Register, etc.)
  // Users allowed: Guest ONLY (if logged in -> redirect Home)
  const isAuthRoute = pathname.startsWith('/auth');

  if (isAuthRoute) {
    if (session) {
      // User is already logged in, redirect to Home
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Guest user on auth page -> Allow
    return NextResponse.next();
  }

  // 3. Protected Routes (Everything else)
  // Users allowed: Logged in ONLY (if guest -> redirect Login)
  if (!session) {
    // Save the strictly protected logic
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // User is logged in and visiting a protected page -> Allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
