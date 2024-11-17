'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SearchTools } from '@/components/search-tools'
import Link from 'next/link'
import { useTools } from '@/hooks/use-tools'
import { Skeleton } from '@/components/ui/skeleton'

const featuredTools = [
  { name: 'loopin', logo: '/logos/chatgpt.jpg' },
  { name: 'bing chat', logo: '/logos/chatgpt.jpg' },
  { name: 'Adobe', logo: '/logos/chatgpt.jpg' },
  { name: 'monica', logo: '/logos/chatgpt.jpg' },
  { name: 'Chat GPT', logo: '/logos/chatgpt.jpg' },
  { name: 'Jasper', logo: '/logos/chatgpt.jpg' },
]

export function FeaturedTools() {
  const { tools, isLoading } = useTools(undefined, 'popular')

  if (isLoading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20">
        <div className="container relative space-y-12">
          <div className="mx-auto max-w-[800px] text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <div className="pt-4">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="container relative space-y-12">
        <div className="mx-auto max-w-[800px] text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover <span className="text-red-500">AI</span>{' '}
            <span className="text-purple-500">Tools</span> for Your{' '}
            <span className="text-blue-500">Business!</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Streamline Your Workflow with Our List of AI tools. Find Your Perfect Solution.
          </p>
          <div className="pt-4">
            <SearchTools />
          </div>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/tools">
              <Button size="lg" className="rounded-full">
                Explore {tools?.length}+ AI Tools
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="rounded-full">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {featuredTools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center gap-2">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-card p-4 ring-2 ring-border hover:ring-primary transition-all duration-200 cursor-pointer">
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}