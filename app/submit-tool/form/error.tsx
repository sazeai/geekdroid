'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function SubmitToolFormError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error('Submit tool form error:', error)
  }, [error])

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-muted-foreground">
            We encountered an error while loading the form. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Go home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}