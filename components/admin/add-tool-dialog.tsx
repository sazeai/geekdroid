'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

const toolSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  long_description: z.string().min(50, 'Long description must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  rating: z.coerce.number().min(0).max(5),
  image: z.string().url('Must be a valid URL'),
  affiliate_link: z.string().url('Must be a valid URL'),
  features: z.string(),
  pricing: z.string(),
  is_new: z.boolean(),
  is_popular: z.boolean(),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
})

type ToolSchemaType = z.infer<typeof toolSchema>;

interface AddToolDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingTool?: ToolSchemaType
  onSuccess?: () => void
}

export function AddToolDialog({
  open,
  onOpenChange,
  editingTool,
  onSuccess,
}: AddToolDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<ToolSchemaType>({
    resolver: zodResolver(toolSchema),
    defaultValues: editingTool || {
      name: '',
      description: '',
      long_description: '',
      category: '',
      rating: 0,
      image: '',
      affiliate_link: '',
      features: '',
      pricing: '',
      is_new: false,
      is_popular: false,
      status: 'pending',
    },
  })

  const onSubmit = async (data: ToolSchemaType) => {
    setIsSubmitting(true)
    try {
      console.log('Submitting data:', data)
      
      const { data: savedTool, error } = editingTool
        ? await supabase
            .from('tools')
            .update(data)
            .eq('id', editingTool.id)
            .select()
        : await supabase
            .from('tools')
            .insert([data])
            .select()

      if (error) {
        console.error('Error saving tool:', error)
        throw new Error(error.message || 'Failed to save tool')
      }

      if (!savedTool) {
        throw new Error('No data returned from Supabase')
      }

      console.log('Tool saved successfully:', savedTool)
      toast.success(editingTool ? 'Tool updated successfully' : 'Tool added successfully')
      form.reset()
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error: any) {
      console.error('Error in onSubmit:', error)
      toast.error(error.message || 'Failed to save tool')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingTool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
          <DialogDescription>
            {editingTool ? 'Edit the tool details' : 'Add a new AI tool to the directory'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Form fields remain the same */}
            {/* ... */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : editingTool ? 'Update' : 'Add'} Tool
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

