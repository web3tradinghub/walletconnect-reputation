// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware file is intentionally left blank.
// Its sole purpose is to force the Next.js build process to generate the
// `middleware-manifest.json` file.
// This file is required by the Firebase Hosting deployment process to correctly
// configure the Next.js server.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}
