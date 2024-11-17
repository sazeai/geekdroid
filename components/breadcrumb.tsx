'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
    >
      <ol className="flex items-center space-x-1" itemScope itemType="https://schema.org/BreadcrumbList">
        <li 
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link 
            href="/"
            className="flex items-center hover:text-foreground"
            itemProp="item"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only" itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, index) => (
          <li 
            key={item.label}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="h-4 w-4" />
            {item.href ? (
              <Link 
                href={item.href}
                className="ml-1 hover:text-foreground"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="ml-1" itemProp="name">{item.label}</span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}