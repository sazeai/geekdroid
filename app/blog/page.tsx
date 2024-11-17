import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogHero } from '@/components/blog/blog-hero'
import { Schema } from '@/components/seo/schema'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - AI Tools Directory',
  description: 'Discover insights about AI tools and technology',
  openGraph: {
    title: 'Blog - AI Tools Directory',
    description: 'Discover insights about AI tools and technology',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <Schema type="website" />

      <div className="min-h-screen">
        <BlogHero />
        
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}