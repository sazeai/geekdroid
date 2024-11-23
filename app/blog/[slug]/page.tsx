import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { BlogContent } from '@/components/blog/blog-content'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { RelatedPosts } from '@/components/blog/related-posts'
import { AuthorCard } from '@/components/blog/author-card'
import { Breadcrumb } from '@/components/breadcrumb'
import { Schema } from '@/components/seo/schema'
import { AdUnit } from '@/components/ads/ad-unit'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author.name],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark' }],
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Schema type="article" post={post} />

      <article className="min-h-screen py-12">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title }
            ]}
          />

          <AdUnit 
            slot="blog-post-top" 
            className="py-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-8">
            <div className="lg:col-span-3">
              <BlogContent post={post}>
                <MDXRemote source={post.content} options={options} />
              </BlogContent>

              <AdUnit 
                slot="blog-post-middle" 
                className="py-6"
              />

              <AuthorCard author={post.author} className="mt-12" />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6">
              <TableOfContents />
              <RelatedPosts currentPost={post} />
              <AdUnit 
                slot="blog-post-sidebar" 
                format="rectangle"
                className="min-h-[250px]"
              />
            </aside>
          </div>

          <AdUnit 
            slot="blog-post-bottom" 
            className="py-6"
          />
        </div>
      </article>
    </>
  )
}

