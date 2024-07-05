'use client'

import { Modal } from '@/modules/shared/components/modal'
import { useProductModal } from '../hooks/use-product-modal'

interface ProductModalProps {}

export const ProductModal: React.FC<ProductModalProps> = () => {
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
    >
      {fullProduct && fullProduct.id}
    </Modal>
  )
}
