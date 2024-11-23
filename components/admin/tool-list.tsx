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
import { AddToolDialog } from './add-tool-dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

type Tool = Database['public']['Tables']['tools']['Row'] & {
  status: 'pending' | 'approved' | 'rejected'
}

interface AdminToolListProps {
  status: 'pending' | 'approved' | 'rejected'
}

export function AdminToolList({ status }: AdminToolListProps) {
  const { tools, mutate } = useTools()
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (tools) {
      setFilteredTools(tools.filter((tool): tool is Tool => 'status' in tool && tool.status === status))
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

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool)
  }

  if (!tools) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => setIsAddDialogOpen(true)}>Add New Tool</Button>
      </div>
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
                      onClick={() => handleEdit(tool)}
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
      <AddToolDialog
        open={!!editingTool || isAddDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditingTool(null)
            setIsAddDialogOpen(false)
          }
        }}
        editingTool={editingTool}
        onSuccess={() => {
          setEditingTool(null)
          setIsAddDialogOpen(false)
          mutate()
        }}
      />
    </>
  )
}

