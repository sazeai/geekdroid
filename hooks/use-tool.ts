'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Tool {
  id: number
  name: string
  slug: string
  description: string
  longDescription: string
  category: string
  rating: number
  image: string
  affiliateLink: string
  features: string[]
  pricing: string
  isNew: boolean
  isPopular: boolean
}

interface ToolStore {
  tools: Tool[]
  addTool: (tool: Omit<Tool, 'id' | 'slug'>) => void
  deleteTool: (id: number) => void
  updateTool: (id: number, tool: Partial<Tool>) => void
  getToolBySlug: (slug: string) => Tool | undefined
}

export const useTool = create<ToolStore>()(
  persist(
    (set, get) => ({
      tools: [],
      addTool: (tool) =>
        set((state) => ({
          tools: [
            ...state.tools,
            {
              ...tool,
              id: state.tools.length ? Math.max(...state.tools.map((t) => t.id)) + 1 : 1,
              slug: tool.name.toLowerCase().replace(/\s+/g, '-'),
            },
          ],
        })),
      deleteTool: (id) =>
        set((state) => ({
          tools: state.tools.filter((tool) => tool.id !== id),
        })),
      updateTool: (id, updatedTool) =>
        set((state) => ({
          tools: state.tools.map((tool) =>
            tool.id === id
              ? {
                  ...tool,
                  ...updatedTool,
                  slug: updatedTool.name
                    ? updatedTool.name.toLowerCase().replace(/\s+/g, '-')
                    : tool.slug,
                }
              : tool
          ),
        })),
      getToolBySlug: (slug) => get().tools.find((tool) => tool.slug === slug),
    }),
    {
      name: 'tool-storage',
    }
  )
)

