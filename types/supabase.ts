export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          name: string
          description: string
          long_description: string
          category: string
          image: string
          rating: number
          is_new: boolean
          is_popular: boolean
          features: string[]
          pricing: string
          affiliate_link: string
          created_at: string
          updated_at: string
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          name: string
          description: string
          long_description: string
          category: string
          image: string
          rating?: number
          is_new?: boolean
          is_popular?: boolean
          features?: string[]
          pricing?: string
          affiliate_link?: string
          created_at?: string
          updated_at?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          name?: string
          description?: string
          long_description?: string
          category?: string
          image?: string
          rating?: number
          is_new?: boolean
          is_popular?: boolean
          features?: string[]
          pricing?: string
          affiliate_link?: string
          created_at?: string
          updated_at?: string
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

