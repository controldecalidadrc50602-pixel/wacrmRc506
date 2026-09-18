import { type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'es'
});

export default async function middleware(request: NextRequest) {
  const supabaseResponse = intlMiddleware(request);

  // Demo Bypass: Return immediately without querying Supabase to prevent 504 timeouts
  // in environments where Supabase variables are not set or the DB is paused.
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
