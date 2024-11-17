'use client'

import { useState } from 'react'
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
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { useTools } from '@/hooks/use-tools'
import { AddToolDialog } from './add-tool-dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface AdminToolListProps {
  status?: 'pending' | 'approved' | 'rejected'
}

export function AdminToolList({ status }: AdminToolListProps) {
  const { tools, mutate } = useTools(undefined, undefined, status)
  const [editingTool, setEditingTool] = useState<any>(null)
  const supabase = createClientComponentClient()

  const handleDelete = async (id: string) => {
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

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('tools')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      toast.success(`Tool ${newStatus} successfully`)
      mutate()
    } catch (error) {
      toast.error(`Failed to ${newStatus} the tool`)
    }
  }

  const handleEdit = (tool: any) => {
    setEditingTool({
      ...tool,
      features: Array.isArray(tool.features) ? tool.features.join('\n') : tool.features,
    })
  }

  if (!tools) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools?.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.name}</TableCell>
                <TableCell>{tool.category}</TableCell>
                <TableCell>{tool.submitted_by || 'Admin'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge variant={
                      tool.status === 'approved' ? 'default' :
                      tool.status === 'rejected' ? 'destructive' :
                      'secondary'
                    }>
                      {tool.status}
                    </Badge>
                    {tool.is_new && <Badge>New</Badge>}
                    {tool.is_popular && <Badge variant="secondary">Popular</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {tool.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(tool.id, 'approved')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(tool.id, 'rejected')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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
                      onClick={() => handleDelete(tool.id)}
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
        open={!!editingTool}
        onOpenChange={(open) => !open && setEditingTool(null)}
        editingTool={editingTool}
        onSuccess={() => {
          setEditingTool(null)
          mutate()
        }}
      />
    </>
  )
}