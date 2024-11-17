import { Card } from '@/components/ui/card'
import { SubmitToolForm } from '@/components/submit-tool-form'

export default function SubmitToolPage() {
  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Submit Your AI Tool</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Join our directory and showcase your AI tool to thousands of potential users.
            </p>
          </div>
          <SubmitToolForm />
        </div>
      </Card>
    </div>
  )
}