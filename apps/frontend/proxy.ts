import { NextResponse, NextRequest } from 'next/server';

const publicAuthRoutes = ['/auth/login', '/auth/register'];

const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth') && !publicAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/auth/:path*',
};

export default proxy;