'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AuthContextType {
  isAdmin: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session?.user) {
          setIsAdmin(session.user.user_metadata?.role === 'admin')
        } else {
          setIsAdmin(false)
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Session check error:', error)
        toast.error('Authentication error')
        router.push('/admin/login')
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setIsAdmin(session.user.user_metadata?.role === 'admin')
      } else {
        setIsAdmin(false)
        router.push('/admin/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success('Signed out successfully')
      router.push('/admin/login')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
    }
  }

  return (
    <AuthContext.Provider value={{ isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)