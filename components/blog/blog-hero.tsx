'use client'

import { SearchTools } from '@/components/search-tools'

export function BlogHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="container relative space-y-8">
        <div className="mx-auto max-w-[800px] text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Insights About <span className="text-primary">AI Tools</span> and Technology
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover the latest trends, tips, and best practices in AI technology
          </p>
          <div className="pt-4">
            <SearchTools />
          </div>
        </div>
      </div>
    </div>
  )
}