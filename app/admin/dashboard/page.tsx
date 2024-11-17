'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminToolList } from '@/components/admin/tool-list'
import { AddToolDialog } from '@/components/admin/add-tool-dialog'
import { AuthButton } from '@/components/admin/auth-button'
import { useAdminAuth } from '@/hooks/useAdminAuth'


export default function AdminDashboard() {
  useAdminAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI tools directory</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Tool
          </Button>
          <AuthButton />
        </div>
      </div>
      <AdminToolList />
      <AddToolDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}