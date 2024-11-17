import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'
import { getPostsByCategory } from '@/lib/blog'

interface RelatedPostsProps {
  currentPost: BlogPost
  maxPosts?: number
}

export function RelatedPosts({ currentPost, maxPosts = 3 }: RelatedPostsProps) {
  const relatedPosts = getPostsByCategory(currentPost.category)
    .filter(post => post.slug !== currentPost.slug)
    .slice(0, maxPosts)

  if (relatedPosts.length === 0) return null

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="flex gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(post.date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}