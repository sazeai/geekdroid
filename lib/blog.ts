import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio?: string
    twitter?: string
    github?: string
  }
  category: string
  tags: string[]
  image: string
  readingTime: string
}

export function getAllPosts(): BlogPost[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
        author: data.author,
        category: data.category,
        tags: data.tags || [],
        image: data.image,
        readingTime: readingTime(content).text,
      }
    })

  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      image: data.image,
      readingTime: readingTime(content).text,
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}