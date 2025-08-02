import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/learn') {
    return NextResponse.redirect(new URL('/select-topic', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/learn',
};
