'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { AlertModal } from '@/modules/shared/components/alert-modal'
import { Edit, Trash } from 'lucide-react'
import { Size } from '@prisma/client'
import { SizeModal } from './modal'

interface SizesCellActionsProps {
  size: Size
  message: string
  errorMessage?: string
  onDelete: (id: number) => Promise<boolean>
}

export const SizesCellActions: React.FC<SizesCellActionsProps> = ({
  size,
  message,
  onDelete,
  errorMessage,
}) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const [isEditOpen, setIsEditOpen] = useState(false)

  const onDeleteClick = async () => {
    try {
      setIsLoading(true)
      const deleted = await onDelete(size.id)

      if (!deleted) throw new Error()

      toast.success(message)
      router.refresh()
    } catch (error) {
      toast.error(errorMessage || 'Error al eliminar')
    } finally {
      setIsLoading(false)
      setIsAlertOpen(false)
    }
  }

  return (
    <div className='flex gap-x-4'>
      <Button
        variant='ghost'
        onClick={() => setIsEditOpen(true)}
        className='p-0'
      >
        <Edit className='h-4 w-4' />
      </Button>

      <SizeModal
        isOpen={isEditOpen}
        size={size}
        onClose={() => setIsEditOpen(false)}
      />

      <Button
        variant='ghost'
        onClick={() => setIsAlertOpen(true)}
        className='p-0'
      >
        <Trash className='h-4 w-4' />
      </Button>

      <AlertModal
        isOpen={isAlertOpen}
        isLoading={isLoading}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={onDeleteClick}
      />
    </div>
  )
}
