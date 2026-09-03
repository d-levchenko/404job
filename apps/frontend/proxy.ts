import { NextResponse, NextRequest } from 'next/server';

const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/auth') &&
    pathname !== '/auth/login' &&
    pathname !== '/auth/register'
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/auth/:path*',
};

export default proxy;
