import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient as createServerClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Create a single instance of the Supabase client for the browser
export const createClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}

// Create a Supabase client for server-side usage
export const createServerSideClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables')
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Helper function to get the client in components
export function useSupabase() {
  return createClient()
}

// Export the server-side client
export const supabase = createServerSideClient()