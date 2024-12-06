'use client'

import { Header } from '@/modules/shared/components/header'
import { Brand, Category } from '@prisma/client'
import { DataTable } from './table/data-table'
import { columns } from './table/columns'
import { IProduct } from '../types'
import { ProductModal } from './form/modal'
import { useProductModal } from '../hooks/use-product-modal'
import { Option } from '@/modules/shared/types'

interface ProductsClientProps {
  products: IProduct[]
  categories: Category[]
  brands: Brand[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
  products,
  brands,
  categories,
}) => {
  const categoriesOptions: Option[] = categories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }))

  const brandsOptions: Option[] = brands.map((brand) => ({
    label: brand.name,
    value: brand.id.toString(),
  }))

  const onOpen = useProductModal((state) => state.onOpen)
  const setCode = useProductModal((state) => state.setCode)
  const setColor = useProductModal((state) => state.setColor)

  const onButtonClick = () => {
    setCode(null)
    setColor(null)
    onOpen()
  }

  return (
    <>
      <Header
        title='Productos'
        description='Administra los productos de tu tienda'
        buttonLabel='Nuevo Producto'
        onButtonClick={onButtonClick}
      />

      <ProductModal categories={categories} brands={brands} />

      <DataTable
        data={products}
        columns={columns}
        categories={categoriesOptions}
        brands={brandsOptions}
      />
    </>
  )
}
