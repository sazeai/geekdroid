'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTools } from '@/hooks/use-tools'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export type Tool = Omit<Database['public']['Tables']['tools']['Row'], 'features'> & {
  status: 'pending' | 'approved' | 'rejected'
  is_new?: boolean
  is_popular?: boolean
  features: string[] | string
}

interface AdminToolListProps {
  status: 'pending' | 'approved' | 'rejected'
  onEditTool: (tool: Tool) => void
}

export function AdminToolList({ status, onEditTool }: AdminToolListProps) {
  const { tools, mutate } = useTools(undefined, undefined, status)
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (tools) {
      setFilteredTools(tools.filter((tool): tool is Tool => tool.status === status))
    }
  }, [tools, status])

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Tool deleted successfully')
      mutate()
    } catch (error) {
      toast.error('Failed to delete the tool')
    }
  }

  if (!tools) {
    return <div>Loading...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="font-medium">{tool.name}</TableCell>
              <TableCell>{tool.category}</TableCell>
              <TableCell>{tool.rating}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Badge variant={tool.status === 'approved' ? 'default' : tool.status === 'pending' ? 'secondary' : 'destructive'}>
                    {tool.status}
                  </Badge>
                  {tool.is_new && <Badge>New</Badge>}
                  {tool.is_popular && <Badge variant="secondary">Popular</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditTool(tool)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(Number(tool.id))}
                  >
                    <Trash2 className="h-4 w-4" />
</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

