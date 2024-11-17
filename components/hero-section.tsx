'use client'

import { SearchTools } from '@/components/search-tools'

export function HeroSection() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Discover the Best AI Tools
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Explore our curated collection of AI tools to enhance your workflow and boost productivity
        </p>
        <div className="mt-10">
          <SearchTools />
        </div>
      </div>
    </div>
  )
}