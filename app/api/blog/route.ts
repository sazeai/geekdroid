import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*)
      `)
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (category) {
      query = query.eq('category', decodeURIComponent(category))
    }

    const { data: posts, error } = await query

    if (error) throw error

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}