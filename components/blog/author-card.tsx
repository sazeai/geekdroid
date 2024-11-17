import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Github, Twitter } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'

interface AuthorCardProps {
  author: BlogPost['author']
  className?: string
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start gap-4">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{author.name}</h3>
          {author.bio && (
            <p className="text-muted-foreground mt-2">{author.bio}</p>
          )}
          <div className="flex gap-4 mt-4">
            {author.twitter && (
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {author.github && (
              <a
                href={`https://github.com/${author.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}