'use client'

import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearch } from '@/hooks/use-search'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import Link from 'next/link'
import { Badge } from './ui/badge'

export function SearchTools() {
  const [showResults, setShowResults] = useState(false)
  const { query, setQuery, results, isLoading } = useSearch()
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside of search component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative flex-1 max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search AI tools..."
          className="w-full pl-10 pr-4 h-12 rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
      </div>

      {showResults && (query || isLoading) && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <CardContent className="p-2">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tool/${tool.id}`}
                    onClick={() => {
                      setShowResults(false)
                      setQuery('')
                    }}
                    className="block"
                  >
                    <div className="p-2 hover:bg-muted rounded-md transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{tool.name}</h3>
                        <Badge variant="secondary">{tool.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="p-4 text-center text-muted-foreground">
                No tools found
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  )
}