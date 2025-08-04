// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ['/login', '/register'];

  // ⛔ If logged in, prevent access to login/register
  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ If not logged in, protect private routes
  if (!token && !publicPaths.includes(path) && !path.startsWith("/api")) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', 
    '/login', 
    '/register', 
    '/profile', 
    '/dashboard', // if you have
    '/((?!_next|favicon.ico|.*\\..*).*)', // ✅ catch all except public files
  ],
};
