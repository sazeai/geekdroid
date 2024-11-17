'use client'

import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function AuthButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast.success('Signed out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}