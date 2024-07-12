'use client'

import { Modal } from '@/modules/shared/components/modal'
import { Brand, Category } from '@prisma/client'
import { useProductModal } from '../../hooks/use-product-modal'
import { ProductBulkForm } from './bulk-form'

interface ProductModalProps {
  categories: Category[]
  brands: Brand[]
}

export const ProductModal: React.FC<ProductModalProps> = ({
  categories,
  brands,
}) => {
  const isOpen = useProductModal((state) => state.isOpen)
  const onClose = useProductModal((state) => state.onClose)
  const code = useProductModal((state) => state.code)
  const color = useProductModal((state) => state.color)

  return (
    <Modal
      title={code ? 'Editar productos' : 'Nuevos productos'}
      description={code ? 'Editar los productos' : 'Agrega nuevos productos'}
      isOpen={isOpen}
      onClose={onClose}
      className='md:max-w-2xl max-w-md max-h-[90vh] overflow-y-auto'
    >
      <ProductBulkForm
        code={code}
        color={color}
        brands={brands}
        categories={categories}
        onClose={onClose}
      />
    </Modal>
  )
}
