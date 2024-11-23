'use client'

import useSWR from 'swr'
import { useSupabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

export type Tool = Database['public']['Tables']['tools']['Row'] & {
  slug: string;
  status: 'pending' | 'approved' | 'rejected';
  is_new?: boolean;
  is_popular?: boolean;
  features: string[] | string;
}

export function useTools(
  category?: string,
  filter?: string,
  status: 'pending' | 'approved' | 'rejected' = 'approved'
) {
  const supabase = useSupabase()

  const fetcher = async () => {
    try {
      let query = supabase
        .from('tools')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false })

      if (category) {
        query = query.eq('category', category)
      }

      if (filter === 'new') {
        query = query.eq('is_new', true)
      } else if (filter === 'popular') {
        query = query.eq('is_popular', true)
      }

      const { data: tools, error } = await query

      if (error) throw error

      // Generate slug for each tool and ensure status is included
      const toolsWithSlug = tools?.map(tool => ({
        ...tool,
        slug: tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        status: tool.status || status, // Ensure status is always present
        features: Array.isArray(tool.features) ? tool.features : tool.features.split(',')
      })) as Tool[]

      return toolsWithSlug
    } catch (error) {
      console.error('Error fetching tools:', error)
      return []
    }
  }

  const { data: tools, error, isLoading, mutate } = useSWR<Tool[]>(
    `tools-${category}-${filter}-${status}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    tools: tools || [],
    isLoading,
    isError: error,
    mutate
  }
}

