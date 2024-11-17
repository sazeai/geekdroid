import { Suspense } from 'react'
import { FeaturedTools } from '@/components/featured-tools'
import { CategoryGrid } from '@/components/category-grid'
import { ToolGrid } from '@/components/tool-grid'
import { FeaturedPosts } from '@/components/featured-posts'
import { Skeleton } from '@/components/ui/skeleton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <FeaturedTools />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <CategoryGrid />
      </Suspense>
      <div className="container py-12">
        <Suspense fallback={<Skeleton className="h-[600px]" />}>
          <ToolGrid />
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <FeaturedPosts />
      </Suspense>
    </div>
  )
}