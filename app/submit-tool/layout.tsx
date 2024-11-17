import { Suspense } from 'react'
import Loading from './form/loading'

export default function SubmitToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}