'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from './use-debounce'
import { useSupabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type Tool = Database['public']['Tables']['tools']['Row']

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const supabase = useSupabase()

  useEffect(() => {
    const searchTools = async () => {
      if (!debouncedQuery) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const { data: tools, error } = await supabase
          .from('tools')
          .select('*')
          .eq('status', 'approved')
          .or(`name.ilike.%${debouncedQuery}%,description.ilike.%${debouncedQuery}%,category.ilike.%${debouncedQuery}%`)
          .order('is_popular', { ascending: false })
          .limit(10)

        if (error) throw error
        setResults(tools || [])
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    searchTools()
  }, [debouncedQuery, supabase])

  return {
    query,
    setQuery,
    results,
    isLoading
  }
}