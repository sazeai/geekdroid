import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)

    // Check if the file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Read the MDX file
    const fileContent = await fs.readFile(filePath, 'utf8')
    
    // Parse the frontmatter and content
    const { data: frontmatter, content } = matter(fileContent)

    // Return the blog post data
    return NextResponse.json({
      slug,
      frontmatter,
      content
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

