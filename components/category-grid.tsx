'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useCategories } from '@/hooks/use-categories'
import { Skeleton } from '@/components/ui/skeleton'

export function CategoryGrid() {
  const { categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <div className="py-20 bg-gradient-to-b from-background/80 to-background">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Only show top 8 categories on homepage
  const topCategories = categories.slice(0, 8)

  return (
    <div className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">AI Tool Categories</h2>
            <p className="text-muted-foreground">
              Unlock innovation with our diverse range of cutting-edge solutions
            </p>
          </div>
          <Link href="/categories" className="group flex items-center gap-2 hover:text-primary">
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="group relative overflow-hidden"
            >
              <div className="p-6 rounded-xl bg-gradient-to-br from-gray-500/20 to-transparent border backdrop-blur-sm hover:border-primary transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {category.count} {category.count === 1 ? 'tool' : 'tools'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Explore {category.name.toLowerCase()} AI tools and solutions
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}