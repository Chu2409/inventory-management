'use client'

import { DataTable } from '@/modules/shared/components/data-table'
import { Header } from '@/modules/shared/components/header'
import { Category } from '@prisma/client'
import { categoriesColumns } from './columns'
import { CategoryModal } from './modal'
import { useState } from 'react'

interface CategoriesClientProps {
  categories: Category[]
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Header
        title='Categorías'
        description='Administra las categorías de tus productos'
        buttonLabel='Nuevo Categoría'
        onButtonClick={() => setIsOpen(true)}
      />

      <CategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <DataTable columns={categoriesColumns} data={categories} />
    </>
  )
}
