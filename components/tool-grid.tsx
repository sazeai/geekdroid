'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useTools } from '@/hooks/use-tools'
import { CategoryFilter } from './category-filter'

export function ToolGrid() {
  const [filter, setFilter] = useState('all')
  const [category, setCategory] = useState<string | undefined>()
  const { tools, isLoading } = useTools(category, filter !== 'all' ? filter : undefined)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0">
            <Card className="animate-pulse h-[400px]" />
          </aside>
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <aside className="w-64 shrink-0">
          <CategoryFilter 
            selectedCategory={category} 
            onCategoryChange={setCategory} 
          />
        </aside>
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'popular' ? 'default' : 'outline'}
                onClick={() => setFilter('popular')}
              >
                Popular
              </Button>
              <Button
                variant={filter === 'new' ? 'default' : 'outline'}
                onClick={() => setFilter('new')}
              >
                New
              </Button>
            </div>
            {category && (
              <Button variant="ghost" onClick={() => setCategory(undefined)}>
                Clear Category
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools?.map((tool) => (
              <Card key={tool.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="object-cover w-full h-full"
                  />
                  {tool.is_new && (
                    <Badge className="absolute top-2 right-2">New</Badge>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{tool.name}</h3>
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => setCategory(tool.category)}
                    >
                      {tool.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-2 font-medium">{tool.rating}</span>
                    </div>
                    <Link href={`/tool/${tool.id}`}>
                      <Button>
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}