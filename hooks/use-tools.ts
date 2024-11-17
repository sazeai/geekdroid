'use client'

import useSWR from 'swr'
import { useSupabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type Tool = Database['public']['Tables']['tools']['Row']

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
      return tools
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

export function useTool(id: string) {
  const supabase = useSupabase()

  const fetcher = async () => {
    try {
      const { data: tool, error } = await supabase
        .from('tools')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return tool
    } catch (error) {
      console.error('Error fetching tool:', error)
      return null
    }
  }

  const { data: tool, error, isLoading } = useSWR<Tool | null>(
    `tool-${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    tool,
    isLoading,
    isError: error
  }
}