import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Toaster } from 'sonner'
import { Schema } from '@/components/seo/schema'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aitools.directory'),
  title: {
    default: 'AI Tools Directory - Discover the Best AI Tools',
    template: '%s | AI Tools Directory'
  },
  description: 'Discover and explore the best AI tools for your needs. Find tools for text, image, voice, video processing and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://aitools.directory" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <Toaster />
            <Schema />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}