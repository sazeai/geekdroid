import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container py-8 space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  )
}