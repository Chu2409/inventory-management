import { Modal } from '@/modules/shared/components/modal'
import { Category } from '@prisma/client'
import { CategoryForm } from './form'

interface CategoryModalProps {
  category?: Category
  isOpen: boolean
  onClose: () => void
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      title={category ? 'Editar categoría' : 'Nueva categoría'}
      description={
        category ? 'Edita la categoría' : 'Agrega una nueva categoría'
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <CategoryForm category={category} onClose={onClose} />
    </Modal>
  )
}
