'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  className?: string
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  className,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn('rounded-md max-w-sm md:max-w-lg', className)}
      >
        <DialogHeader className='text-left'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
