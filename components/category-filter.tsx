'use client'

import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCategories } from '@/hooks/use-categories'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Filter tools by category</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Filter tools by category</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start font-normal",
              !selectedCategory && "bg-muted"
            )}
            onClick={() => onCategoryChange(undefined)}
          >
            <div className="flex flex-1 items-center justify-between">
              <span>All Categories</span>
              <span className="text-muted-foreground">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </div>
          </Button>
          {categories.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 justify-start font-normal",
                  selectedCategory === category.name && "bg-muted"
                )}
                onClick={() => onCategoryChange(category.name)}
              >
                <div className="flex flex-1 items-center justify-between">
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">
                    {category.count}
                  </span>
                </div>
              </Button>
              <Link href={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}