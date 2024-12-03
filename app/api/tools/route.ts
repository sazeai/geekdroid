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
  features: z.string().transform(str => str.split('\n').filter(Boolean)),
  pricing: z.string().transform(str => str.split('\n').filter(Boolean)),
  rating: z.number().min(0).max(5).default(0), // Add default rating
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

    // Add the tool to the database
    const { data, error } = await supabase
      .from('tools')
      .insert({ ...tool, status: 'pending' })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({ message: 'Tool submitted successfully', data })
  } catch (error) {
    console.error('Error submitting tool:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

