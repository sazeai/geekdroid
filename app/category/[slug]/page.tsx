'use client'

import { useTools } from '@/hooks/use-tools'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Schema } from '@/components/seo/schema'
import Head from 'next/head'
import { Breadcrumb } from '@/components/breadcrumb'

const categoryDescriptions: Record<string, string> = {
  'text': 'Text generation and processing tools',
  'image': 'Image generation and editing tools',
  'voice': 'Voice synthesis and recognition tools',
  'video': 'Video creation and editing tools',
  'code': 'Code generation and analysis tools',
  'data-analysis': 'Data processing and analytics tools',
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  const { tools, isLoading } = useTools(category)

  const title = `${category} AI Tools - AI Tools Directory`
  const description = categoryDescriptions[params.slug] || 
    `Discover the best ${category.toLowerCase()} AI tools and services`

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={`https://aitools.directory/category/${params.slug}`} />
      </Head>

      <Schema category={category} categoryCount={tools?.length} />

      <div className="container mx-auto py-8 space-y-6">
        <Breadcrumb
          items={[
            { label: 'Categories', href: '/categories' },
            { label: category }
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category} AI Tools</h1>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
          <Link href="/categories">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Categories
            </Button>
          </Link>
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

        {tools?.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No Tools Found</h2>
            <p className="text-muted-foreground mb-4">
              There are currently no tools in this category.
            </p>
            <Link href="/submit-tool">
              <Button>
                Submit a Tool
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}