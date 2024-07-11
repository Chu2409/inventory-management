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
  const fullProduct = useProductModal((state) => state.fullProduct)

  return (
    <Modal
      title={fullProduct ? 'Editar productos' : 'Nuevos productos'}
      description={
        fullProduct ? 'Edita el producto' : 'Agrega nuevos productos'
      }
      isOpen={isOpen}
      onClose={onClose}
      className='md:max-w-2xl max-w-md max-h-[90vh] overflow-y-auto'
    >
      <ProductBulkForm
        brands={brands}
        categories={categories}
        onClose={onClose}
      />
    </Modal>
  )
}
