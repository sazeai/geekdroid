import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/blog-card'

export function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest from Our Blog</h2>
            <p className="text-muted-foreground">
              Stay updated with the latest insights about AI tools and technology
            </p>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 hover:text-primary">
            View All Posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}