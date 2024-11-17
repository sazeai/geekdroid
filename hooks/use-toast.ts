'use client'

import { toast } from 'sonner'

export function useToast() {
  return {
    toast: {
      title: (title: string) => toast(title),
      description: (description: string) => toast(description),
      error: (error: string) => toast.error(error),
      success: (message: string) => toast.success(message),
    },
  }
}