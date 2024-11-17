'use client'

import type { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogContentProps {
  post: BlogPost
  children: React.ReactNode
  className?: string
}

export function BlogContent({ post, children, className }: BlogContentProps) {
  return (
    <article className={cn("space-y-8", className)}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </div>

        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <img
        src={post.image}
        alt={post.title}
        className="w-full aspect-[2/1] object-cover rounded-lg"
      />

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20">
        {children}
      </div>
    </article>
  )
}