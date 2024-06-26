'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from './modal'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      title='Estas seguro?'
      description='Esta acción no se puede deshacer'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={isLoading} variant='outline' onClick={onClose}>
          Cancelar
        </Button>

        <Button disabled={isLoading} variant='destructive' onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  )
}
