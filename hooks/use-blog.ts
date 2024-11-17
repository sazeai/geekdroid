'use client'

import useSWR from 'swr'

// Define types for your MDX-based blog posts
type BlogPost = {
  slug: string
  title: string
  content: string
  date: string
  author: Author
  // Add any other fields your MDX blog posts have
}

type Author = {
  name: string
  // Add any other author fields
}

type PostSection = {
  id: string
  content: string
  // Add any other section fields
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export function useBlogPosts(category?: string) {
  const { data, error, isLoading } = useSWR(
    `/api/blog${category ? `?category=${encodeURIComponent(category)}` : ''}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    posts: data?.posts as BlogPost[] || [],
    isLoading,
    isError: error
  }
}

export function useBlogPost(slug: string) {
  const { data, error, isLoading } = useSWR(
    `/api/blog/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    post: data as (BlogPost & { 
      sections: PostSection[]
    }) | null,
    isLoading,
    isError: error
  }
}