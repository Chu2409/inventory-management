'use client'

import { Modal } from '@/modules/shared/components/modal'
import { useProductModal } from '../hooks/use-product-modal'
import { Brand, Category } from '@prisma/client'
import { ProductForm } from './form'

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
      title={fullProduct ? 'Editar producto' : 'Nuevo producto'}
      description={
        fullProduct ? 'Edita el producto' : 'Agrega un nuevo producto'
      }
      isOpen={isOpen}
      onClose={onClose}
      className='md:max-w-2xl max-w-md'
    >
      <ProductForm
        initialData={fullProduct}
        brands={brands}
        categories={categories}
        onClose={onClose}
      />
    </Modal>
  )
}
