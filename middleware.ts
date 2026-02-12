import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptUrlPath } from './src/security/url-encryption';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // List of paths that should not be encrypted or decrypted (public paths, API routes, static assets)
  const publicPaths = [
    '/',
    '/login',
    '/chat',
    '/games',
    '/community',
    '/profile',
    '/admin',
    '/api',
    '/_next/static',
    '/_next/image',
    '/favicon.ico',
    '/assets',
  ];

  // Check if the path is a public path, if so, skip decryption
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Attempt to decrypt the path
  const decryptedPath = decryptUrlPath(path);

  // If the path was successfully decrypted and is different from the original, rewrite the URL
  if (decryptedPath && decryptedPath !== path) {
    return NextResponse.rewrite(new URL(decryptedPath, request.url));
  }

  // If no decryption or rewrite is needed, continue to the next middleware or page
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
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
