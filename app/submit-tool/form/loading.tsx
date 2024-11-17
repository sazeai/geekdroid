import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export default function SubmitToolFormLoading() {
  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-full mt-6" />
          </div>
        </div>
      </Card>
    </div>
  )
}