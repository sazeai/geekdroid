import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const { data: { user } } = await supabase.auth.getUser()
    const isAdmin = user?.user_metadata?.role === 'admin'

    if (!isAdmin) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        email: user.email,
        role: user.user_metadata.role
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}