'use client'

import useSWR from 'swr'
import { useSupabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type Tool = Database['public']['Tables']['tools']['Row']

export function useCategories() {
  const supabase = useSupabase()

  const fetcher = async () => {
    try {
      const { data: tools, error } = await supabase
        .from('tools')
        .select('*')
        .eq('status', 'approved')

      if (error) throw error
      return tools
    } catch (error) {
      console.error('Error fetching tools:', error)
      return []
    }
  }

  const { data: tools, error, isLoading } = useSWR<Tool[]>('categories', fetcher)

  const categories = tools ? Object.entries(
    tools.reduce((acc: Record<string, number>, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1
      return acc
    }, {})
  ).map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count) : []

  return {
    categories,
    isLoading,
    isError: error
  }
}