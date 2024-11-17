import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const ADMIN_EMAIL = 'admin@aitools.directory'
const ADMIN_PASSWORD = 'admin123456'

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'default-secret-key-change-it'
)

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create JWT token
      const token = await new SignJWT({
        email,
        role: 'admin'
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1w')
        .sign(secret)

      const response = NextResponse.json({ success: true })
      
      // Set JWT token as cookie
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })

      return response
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}