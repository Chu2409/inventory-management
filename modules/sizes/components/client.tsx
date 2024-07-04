'use client'

import { DataTable } from '@/modules/shared/components/data-table'
import { Header } from '@/modules/shared/components/header'
import { sizesColumns } from './columns'
import { IFullSize } from '../types'
import { Filter } from '@/modules/shared/components/filter'
import { SizeModal } from './size-modal'
import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useCategories } from '../hooks/use-categories'

interface SizesClientProps {
  sizes: IFullSize[]
  categories: Category[]
  categoryId?: number
}

export const SizesClient: React.FC<SizesClientProps> = ({
  sizes,
  categories,
  categoryId,
}) => {
  const categoriesValues = categories.map((category) => ({
    id: category.id,
    value: category.name,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const setCategories = useCategories((state) => state.setCategories)

  useEffect(() => {
    setCategories(categories)
  }, [categories, setCategories])

  return (
    <>
      <Header
        title='Tallas/Tamaños'
        description='Administra las tallas o tamaños para tus productos'
        buttonLabel='Nuevo Talla/Tamaño'
        onButtonClick={() => setIsOpen(true)}
      />

      <SizeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className='my-4'>
        <Filter
          data={categoriesValues}
          baseRoute='/sizes'
          paramKey='categoryId'
          selectedId={categoryId}
          placeholder='Selecciona una categoría...'
          notFoundMessage='No se encontraron categorías'
        />
      </div>

      <DataTable columns={sizesColumns} data={sizes} />
    </>
  )
}
