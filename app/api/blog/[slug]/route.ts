import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*),
        sections:post_sections(*)
      `)
      .eq('slug', params.slug)
      .eq('published', true)
      .single()

    if (error) throw error

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Increment view count
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ views: (post.views || 0) + 1 })
      .eq('id', post.id)

    if (updateError) {
      console.error('Error updating view count:', updateError)
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}
