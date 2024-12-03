import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Tool schema for validation
const toolSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(200, 'Description must be at most 200 characters'),
  long_description: z.string().min(50, 'Long description must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL'),
  affiliate_link: z.string().url('Must be a valid URL'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  pricing: z.string().min(1, 'Pricing information is required'),
  is_new: z.boolean().optional(),
  is_popular: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
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
      .insert({
        ...tool,
        user_id: session.user.id,
        status: tool.status || 'pending',
        is_new: tool.is_new !== undefined ? tool.is_new : true,
        is_popular: tool.is_popular || false,
        rating: tool.rating || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

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

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const json = await request.json()
    const { id, ...toolData } = toolSchema.parse(json)

    if (!id) {
      return NextResponse.json({ error: 'Tool ID is required for updates' }, { status: 400 })
    }

    // Update the tool in the database
    const { data, error } = await supabase
      .from('tools')
      .update({
        ...toolData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json({ message: 'Tool updated successfully', data })
  } catch (error) {
    console.error('Error updating tool:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

