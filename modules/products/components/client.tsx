'use client'

import { Header } from '@/modules/shared/components/header'
import { Product } from '@prisma/client'

interface ProductsClientProps {
  products: Product[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ products }) => {
  return (
    <>
      <Header
        title='Productos'
        description='Administra los productos de tu tienda'
        buttonLabel='Nuevo Producto'
        onButtonClick={() => {}}
      />
    </>
  )
}
