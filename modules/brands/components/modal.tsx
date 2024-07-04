import { Modal } from '@/modules/shared/components/modal'
import { Brand } from '@prisma/client'
import { BrandForm } from './form'

interface BrandModalProps {
  brand?: Brand
  isOpen: boolean
  onClose: () => void
}

export const BrandModal: React.FC<BrandModalProps> = ({
  brand,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      title={brand ? 'Editar marca' : 'Nueva marca'}
      description={brand ? 'Edita la marca' : 'Agrega una nueva marca'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <BrandForm brand={brand} onClose={onClose} />
    </Modal>
  )
}
