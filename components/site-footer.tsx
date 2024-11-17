import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold">AI Tools Directory</h3>
            <p className="text-sm text-muted-foreground">
              Discover and explore the best AI tools for your needs. Find tools for text, image, voice, video processing and more.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/text" className="text-muted-foreground hover:text-foreground transition-colors">
                  Text AI Tools
                </Link>
              </li>
              <li>
                <Link href="/category/image" className="text-muted-foreground hover:text-foreground transition-colors">
                  Image AI Tools
                </Link>
              </li>
              <li>
                <Link href="/category/voice" className="text-muted-foreground hover:text-foreground transition-colors">
                  Voice AI Tools
                </Link>
              </li>
              <li>
                <Link href="/category/video" className="text-muted-foreground hover:text-foreground transition-colors">
                  Video AI Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  View All Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/submit-tool" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Tools Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}