export type Database = {
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
          features: string[]
          pricing: {
            free: boolean
            starter: number
            pro: number
          }
          affiliate_link: string
          created_at: string
          updated_at: string
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
          features?: string[]
          pricing?: {
            free: boolean
            starter: number
            pro: number
          }
          affiliate_link?: string
          created_at?: string
          updated_at?: string
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
          features?: string[]
          pricing?: {
            free: boolean
            starter: number
            pro: number
          }
          affiliate_link?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
