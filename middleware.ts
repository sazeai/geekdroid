import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Only run this middleware for admin routes
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return res
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Allow access to the login page
  if (req.nextUrl.pathname === '/admin/login') {
    return res
  }

  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Check if user has admin role
  const { data: profile, error } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', session.user.id)
  .single()

if (error || !profile || profile.role !== 'admin') {
  return NextResponse.redirect(new URL('/', req.url))
}
  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}