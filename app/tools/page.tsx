'use client'

import { ToolGrid } from '@/components/tool-grid'
import { AdUnit } from '@/components/ads/ad-unit'
import { Breadcrumb } from '@/components/breadcrumb'

export default function ToolsPage() {
  return (
    <div className="container py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Tools' }
        ]}
      />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">AI Tools Directory</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive collection of AI tools and solutions
        </p>
      </div>

      <AdUnit 
        slot="tools-page-top" 
        className="py-4"
      />

      <ToolGrid />

      <AdUnit 
        slot="tools-page-bottom" 
        className="py-4"
      />
    </div>
  )
}