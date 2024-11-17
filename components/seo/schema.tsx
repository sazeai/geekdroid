import { Database } from '@/types/supabase'
import type { BlogPost } from '@/lib/blog'

type Tool = Database['public']['Tables']['tools']['Row']

interface SchemaProps {
  tool?: Tool
  category?: string
  categoryCount?: number
  type?: 'website' | 'article' | 'tool'
  post?: BlogPost
}

function validateSchemaData(schema: any) {
  try {
    if (!schema['@context'] || !schema['@type']) {
      return false
    }
    if (schema.url && !isValidUrl(schema.url)) {
      return false
    }
    return true
  } catch (error) {
    console.error('Schema validation error:', error)
    return false
  }
}

function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function Schema({ tool, category, categoryCount, type, post }: SchemaProps) {
  const schemas = []

  // Base Website Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Tools Directory',
    url: 'https://aitools.directory',
    description: 'Discover and explore the best AI tools for your needs',
    publisher: {
      '@type': 'Organization',
      name: 'AI Tools Directory',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aitools.directory/logo.png'
      }
    }
  })

  if (type === 'article' && post) {
    // Article Schema with enhanced metadata
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: post.author.twitter ? `https://twitter.com/${post.author.twitter}` : undefined,
        image: post.author.avatar,
        description: post.author.bio
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Tools Directory',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aitools.directory/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://aitools.directory/blog/${post.slug}`
      },
      keywords: post.tags.join(', '),
      articleSection: post.category,
      wordCount: post.content.split(/\s+/).length,
      articleBody: post.content
    })
  }

  if (tool) {
    // Software Application Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: tool.category,
      operatingSystem: 'Web',
      url: `https://aitools.directory/tool/${tool.id}`,
      image: tool.image,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: tool.pricing
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating.toString(),
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1'
      }
    })

    // Review Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        image: tool.image,
        applicationCategory: tool.category
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: tool.rating,
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@type': 'Organization',
        name: 'AI Tools Directory'
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Tools Directory'
      },
      datePublished: tool.created_at,
      reviewBody: tool.long_description,
      positiveNotes: tool.features.map(feature => ({
        '@type': 'ListItem',
        position: 1,
        name: feature
      }))
    })
  }

  if (category) {
    // Collection Page Schema with enhanced metadata
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${category} AI Tools`,
      description: `Discover the best ${category.toLowerCase()} AI tools and services`,
      url: `https://aitools.directory/category/${category.toLowerCase()}`,
      numberOfItems: categoryCount || 0,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: categoryCount || 0,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Thing',
              name: `${category} AI Tools`,
              description: `Collection of ${category.toLowerCase()} AI tools and services`
            }
          }
        ]
      }
    })
  }

  // Breadcrumb Schema for all pages
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'https://aitools.directory',
          name: 'Home'
        }
      },
      ...(category ? [
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `https://aitools.directory/category/${category.toLowerCase()}`,
            name: category
          }
        }
      ] : []),
      ...(tool ? [
        {
          '@type': 'ListItem',
          position: category ? 3 : 2,
          item: {
            '@id': `https://aitools.directory/tool/${tool.id}`,
            name: tool.name
          }
        }
      ] : []),
      ...(post ? [
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': 'https://aitools.directory/blog',
            name: 'Blog'
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': `https://aitools.directory/blog/${post.slug}`,
            name: post.title
          }
        }
      ] : [])
    ]
  })

  const validSchemas = schemas.filter(validateSchemaData)

  if (validSchemas.length === 0) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(validSchemas) }}
    />
  )
}