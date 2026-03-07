import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  // Protect profile and match routes
  if (!session && (req.nextUrl.pathname.startsWith('/profile') || req.nextUrl.pathname.startsWith('/match'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/profile/:path*', '/match/:path*'],
};
