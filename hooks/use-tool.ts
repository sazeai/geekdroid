'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Tool {
  id: number
  name: string
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
  addTool: (tool: Omit<Tool, 'id'>) => void
  deleteTool: (id: number) => void
  updateTool: (id: number, tool: Partial<Tool>) => void
}

export const useTool = create<ToolStore>()(
  persist(
    (set) => ({
      tools: [],
      addTool: (tool) =>
        set((state) => ({
          tools: [
            ...state.tools,
            {
              ...tool,
              id: state.tools.length ? Math.max(...state.tools.map((t) => t.id)) + 1 : 1,
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
            tool.id === id ? { ...tool, ...updatedTool } : tool
          ),
        })),
    }),
    {
      name: 'tool-storage',
    }
  )
)