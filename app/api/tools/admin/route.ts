import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@auth0/nextjs-auth0'

export async function GET(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const { data: { session } } = await supabase.auth.getSession()
    if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'

    const { data: tools, error } = await supabase
      .from('tools')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(tools)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

}

export async function PATCH(request: Request) {
  try {
    const session = await getSession()
    
    // Check if user is admin
    if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await request.json()
    const { id, status } = json

    const { data: tool, error } = await supabase
      .from('tools')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error updating tool:', error)
    return NextResponse.json({ error: 'Failed to update tool' }, { status: 500 })
  }
}