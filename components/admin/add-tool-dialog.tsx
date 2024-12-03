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
import { useSupabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

const toolSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  long_description: z.string().min(50, 'Long description must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  rating: z.number().min(0).max(5),
  image: z.string().url('Must be a valid URL'),
  affiliate_link: z.string().url('Must be a valid URL'),
  features: z.string().transform(str => str.split('\n').filter(Boolean)),
  pricing: z.string(),
  is_new: z.boolean(),
  is_popular: z.boolean(),
  status: z.enum(['pending', 'approved', 'rejected']),
})

type ToolFormData = z.infer<typeof toolSchema>

interface AddToolDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingTool?: Database['public']['Tables']['tools']['Row']
  onSuccess?: () => void
}

export function AddToolDialog({
  open,
  onOpenChange,
  editingTool,
  onSuccess,
}: AddToolDialogProps) {
  const supabase = useSupabase()
  const form = useForm<ToolFormData>({
    resolver: zodResolver(toolSchema),
    defaultValues: editingTool || {
      name: '',
      description: '',
      long_description: '',
      category: '',
      rating: 0,
      image: '',
      affiliate_link: '',
      features: [],
      pricing: '',
      is_new: false,
      is_popular: false,
      status: 'pending',
    },
  })

  const onSubmit = async (data: ToolFormData) => {
    try {
      const { data: toolData, error } = editingTool
        ? await supabase
            .from('tools')
            .update(data)
            .eq('id', editingTool.id)
            .select()
        : await supabase
            .from('tools')
            .insert(data)
            .select()

      if (error) throw error

      toast.success(editingTool ? 'Tool updated successfully' : 'Tool added successfully')
      form.reset()
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error: any) {
      console.error('Error saving tool:', error)
      toast.error(error.message || 'Failed to save tool')
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="long_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Text">Text</SelectItem>
                      <SelectItem value="Image">Image</SelectItem>
                      <SelectItem value="Voice">Voice</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Code">Code</SelectItem>
                      <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0" max="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL for the tool's image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affiliate_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliate Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter features, one per line
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_new"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">New Tool</FormLabel>
                    <FormDescription>
                      Mark this tool as newly added
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_popular"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Popular Tool</FormLabel>
                    <FormDescription>
                      Mark this tool as popular
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingTool ? 'Update' : 'Add'} Tool</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

