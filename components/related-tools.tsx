'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useTools } from '@/hooks/use-tools'
import { Database } from '@/types/supabase'

type Tool = Database['public']['Tables']['tools']['Row']

interface RelatedToolsProps {
  currentTool: Tool
  maxTools?: number
}

export function RelatedTools({ currentTool, maxTools = 3 }: RelatedToolsProps) {
  const { tools } = useTools(currentTool.category)
  
  const relatedTools = tools
    .filter(tool => tool.id !== currentTool.id)
    .slice(0, maxTools)

  if (relatedTools.length === 0) return null

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTools.map((tool) => (
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
                <Badge variant="secondary">{tool.category}</Badge>
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
    </div>
  )
}