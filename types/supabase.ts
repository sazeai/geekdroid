export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          role: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          role?: string
        }
      }
      tools: {
        Row: {
          id: number
          created_at: string
          name: string
          description: string
          long_description: string
          category: string
          rating: number
          image: string
          affiliate_link: string
          features: string[]
          pricing: string
          is_new: boolean
          is_popular: boolean
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          description: string
          long_description: string
          category: string
          rating: number
          image: string
          affiliate_link: string
          features?: string[]
          pricing: string
          is_new?: boolean
          is_popular?: boolean
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          description?: string
          long_description?: string
          category?: string
          rating?: number
          image?: string
          affiliate_link?: string
          features?: string[]
          pricing?: string
          is_new?: boolean
          is_popular?: boolean
          status?: 'pending' | 'approved' | 'rejected'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      tool_status: 'pending' | 'approved' | 'rejected'
    }
  }
}

