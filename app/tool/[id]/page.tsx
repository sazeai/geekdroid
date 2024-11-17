'use client'

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { Star, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTool } from '@/hooks/use-tools'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedTools } from '@/components/related-tools'
import { Schema } from '@/components/seo/schema'
import { Skeleton } from '@/components/ui/skeleton'
import { AffiliatePopup } from '@/components/affiliate-popup'
import { AdUnit } from '@/components/ads/ad-unit'

export default function ToolPage({ params }: { params: { id: string } }) {
  const { tool, isLoading, isError } = useTool(params.id)
  const [showAffiliatePopup, setShowAffiliatePopup] = useState(false)

  if (isLoading) {
    return (
      <div className="container py-8 space-y-6">
        <Skeleton className="h-6 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="aspect-video">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="h-32">
              <Skeleton className="h-full" />
            </Card>
            <Card className="h-32">
              <Skeleton className="h-full" />
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !tool) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Tool Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested tool could not be found.</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Categories', href: '/categories' },
          { label: tool.category, href: `/category/${tool.category.toLowerCase()}` },
          { label: tool.name }
        ]}
      />

      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <Link href={`/category/${tool.category.toLowerCase()}`}>
          <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
            {tool.category}
          </Badge>
        </Link>
        {tool.is_new && <Badge>New</Badge>}
      </div>

      <AdUnit 
        slot="tool-page-top" 
        className="py-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="aspect-video">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <p className="text-lg">{tool.long_description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {tool.features.map((feature: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <AdUnit 
            slot="tool-page-middle" 
            className="py-4"
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-semibold">{tool.rating}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tool.pricing}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Try {tool.name} now</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => setShowAffiliatePopup(true)}
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <AdUnit 
            slot="tool-page-sidebar" 
            format="rectangle"
            className="min-h-[250px]"
          />
        </div>
      </div>

      <RelatedTools currentTool={tool} />

      <AdUnit 
        slot="tool-page-bottom" 
        className="py-4"
      />

      <AffiliatePopup
        isOpen={showAffiliatePopup}
        onOpenChange={setShowAffiliatePopup}
        affiliateLink={tool.affiliate_link}
        toolName={tool.name}
      />
    </div>
  )
}