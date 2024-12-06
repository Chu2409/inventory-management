import { Modal } from '@/modules/shared/components/modal'
import { Size } from '@prisma/client'
import { SizeForm } from './form'

interface SizeModalProps {
  size?: Size
  isOpen: boolean
  onClose: () => void
}

export const SizeModal: React.FC<SizeModalProps> = ({
  size,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      title={size ? 'Editar tamaño' : 'Nuevo tamaño'}
      description={size ? 'Edita el tamaño' : 'Agrega un nuevo tamaño'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <SizeForm size={size} onClose={onClose} />
    </Modal>
  )
}
