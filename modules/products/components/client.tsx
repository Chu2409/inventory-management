'use client'

import { Header } from '@/modules/shared/components/header'
import { Brand, Category } from '@prisma/client'
import { DataTable } from './data-table'
import { columns } from './columns'
import { IFullProduct } from '../types'

interface ProductsClientProps {
  products: IFullProduct[]
  categories: Category[]
  brands: Brand[]
}

export interface Option {
  label: string
  value: string
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

  return (
    <>
      <Header
        title='Productos'
        description='Administra los productos de tu tienda'
        buttonLabel='Nuevo Producto'
        onButtonClick={() => {}}
      />

      <DataTable
        data={products}
        columns={columns}
        categories={categoriesOptions}
        brands={brandsOptions}
      />
    </>
  )
}
