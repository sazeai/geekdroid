import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Tool schema for validation
const toolSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  long_description: z.string().min(50, 'Long description must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL'),
  affiliate_link: z.string().url('Must be a valid URL'),
  features: z.string(),
  pricing: z.string(),
})

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const json = await request.json()
    const tool = toolSchema.parse(json)

    // Check if user has submitted a tool in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentSubmissions, error: fetchError } = await supabase
      .from('tools')
      .select('created_at')
      .eq('user_id', session.user.id)
      .gte('created_at', oneHourAgo)

    if (fetchError) throw fetchError

    if (recentSubmissions && recentSubmissions.length >= 5) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
    }

    // Add the tool to the database
    const { data, error } = await supabase
      .from('tools')
      .insert({ ...tool, user_id: session.user.id, status: 'pending' })

    if (error) throw error

    return NextResponse.json({ message: 'Tool submitted successfully', data })
  } catch (error) {
    console.error('Error submitting tool:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}