'use client'

import { useCategories } from '@/hooks/use-categories'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart2, Code, Image, MessageSquare, Video, Wand2, Music, Box, Briefcase, Grid } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

// Map of category names to their icons and descriptions
const categoryMeta: Record<string, { icon: any; description: string; color: string }> = {
  'Text': {
    icon: MessageSquare,
    description: 'Text generation, processing, and language models for content creation.',
    color: 'from-blue-500/20'
  },
  'Image': {
    icon: Image,
    description: 'AI-powered image generation, editing, and enhancement tools.',
    color: 'from-purple-500/20'
  },
  'Voice': {
    icon: Wand2,
    description: 'Voice synthesis, recognition, and audio processing solutions.',
    color: 'from-green-500/20'
  },
  'Video': {
    icon: Video,
    description: 'Video creation, editing, and AI-enhanced production tools.',
    color: 'from-red-500/20'
  },
  'Code': {
    icon: Code,
    description: 'Code generation, analysis, and development assistance tools.',
    color: 'from-yellow-500/20'
  },
  'Data Analysis': {
    icon: BarChart2,
    description: 'Advanced data processing, visualization, and analytics platforms.',
    color: 'from-cyan-500/20'
  },
  'Audio': {
    icon: Music,
    description: 'Audio processing, music generation, and sound editing tools.',
    color: 'from-indigo-500/20'
  },
  '3D': {
    icon: Box,
    description: '3D modeling, animation, and visualization tools.',
    color: 'from-pink-500/20'
  },
  'Business': {
    icon: Briefcase,
    description: 'Business automation, productivity, and management tools.',
    color: 'from-orange-500/20'
  },
  'Other': {
    icon: Grid,
    description: 'Other innovative AI tools and solutions.',
    color: 'from-violet-500/20'
  }
}

export default function CategoriesPage() {
  const { categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Categories</h1>
          <p className="text-muted-foreground text-lg">
            Explore our curated collection of AI tools across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const meta = categoryMeta[category.name] || {
              icon: Grid,
              description: `Discover ${category.name.toLowerCase()} AI tools and solutions.`,
              color: 'from-gray-500/20'
            }
            const Icon = meta.icon

            return (
              <Link 
                key={category.name} 
                href={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary">
                  <div className="p-6 space-y-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${meta.color} to-transparent flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{category.name}</h3>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-muted-foreground">
                        {meta.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        {category.count} {category.count === 1 ? 'tool' : 'tools'} available
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/submit-tool">
            <Button size="lg">
              Submit Your AI Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}