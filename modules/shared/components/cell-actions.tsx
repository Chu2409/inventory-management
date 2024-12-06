'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { AlertModal } from '@/modules/shared/components/alert-modal'
import { Edit, Trash } from 'lucide-react'

interface CellActionsProps {
  id: number
  message: string
  errorMessage?: string
  refresh?: boolean
  onDelete: (id: number) => Promise<boolean>
}

export const CellActions: React.FC<CellActionsProps> = ({
  id,
  message,
  onDelete,
  refresh,
  errorMessage,
}) => {
  const router = useRouter()
  const pathName = usePathname()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteClick = async () => {
    try {
      setIsLoading(true)
      const deleted = await onDelete(id)

      if (!deleted) throw new Error()

      toast.success(message)
      router.refresh()
    } catch (error) {
      toast.error(errorMessage || 'Error al eliminar')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className='flex gap-x-4'>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDeleteClick}
      />

      <Button
        variant='ghost'
        onClick={() => router.push(`${pathName}/${id}`)}
        className='p-0'
      >
        <Edit className='h-4 w-4' />
      </Button>

      <Button variant='ghost' onClick={() => setIsOpen(true)} className='p-0'>
        <Trash className='h-4 w-4' />
      </Button>
    </div>
  )
}
