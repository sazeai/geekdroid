'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('')
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .map((element, index) => {
        // If element doesn't have an ID, assign one
        if (!element.id) {
          element.id = `heading-${index}`
        }
        return {
          id: element.id,
          text: element.textContent || '',
          level: parseInt(element.tagName[1])
        }
      })
    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    elements.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <Card className="p-6 sticky top-6">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={`toc-${heading.id}`}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            }}
            className={cn(
              "block py-1 text-sm transition-colors hover:text-foreground",
              heading.level === 2 && "font-medium",
              heading.level === 3 && "pl-4",
              heading.level === 4 && "pl-8",
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </Card>
  )
}