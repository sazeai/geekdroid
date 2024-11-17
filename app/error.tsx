'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}