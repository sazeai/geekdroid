'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminToolList } from '@/components/admin/tool-list'
import { AddToolDialog } from '@/components/admin/add-tool-dialog'
import { AuthButton } from '@/components/admin/auth-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import type { Tool } from '@/components/admin/tool-list'

export default function AdminPage() {
  useAdminAuth()
  const [open, setOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)

  const handleAddTool = () => {
    setEditingTool(null)
    setOpen(true)
  }

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool)
    setOpen(true)
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI tools directory</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleAddTool}>
            <Plus className="mr-2 h-4 w-4" />
            Add Tool
          </Button>
          <AuthButton />
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <AdminToolList status="pending" onEditTool={handleEditTool} />
        </TabsContent>
        <TabsContent value="approved">
          <AdminToolList status="approved" onEditTool={handleEditTool} />
        </TabsContent>
        <TabsContent value="rejected">
          <AdminToolList status="rejected" onEditTool={handleEditTool} />
        </TabsContent>
      </Tabs>

      <AddToolDialog 
        open={open} 
        onOpenChange={setOpen} 
        editingTool={editingTool}
        onSuccess={() => {
          setEditingTool(null)
          setOpen(false)
        }}
      />
    </div>
  )
}

