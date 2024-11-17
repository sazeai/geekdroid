import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:border-primary">
        <div className="aspect-[16/9] relative">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <Badge className="absolute top-4 right-4">
            {post.category}
          </Badge>
        </div>
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-4">
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
      </Card>
    </Link>
  )
}