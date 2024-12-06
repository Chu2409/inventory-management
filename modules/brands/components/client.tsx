'use client'

import { DataTable } from '@/modules/shared/components/data-table'
import { Header } from '@/modules/shared/components/header'
import { Brand } from '@prisma/client'
import { brandsColumns } from './columns'
import { useState } from 'react'
import { BrandModal } from './modal'

interface BrandsClientProps {
  brands: Brand[]
}

export const BrandsClient: React.FC<BrandsClientProps> = ({ brands }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Header
        title='Marcas'
        description='Administra las marcas de tus productos'
        buttonLabel='Nueva Marca'
        onButtonClick={() => setIsOpen(true)}
      />

      <BrandModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <DataTable columns={brandsColumns} data={brands} />
    </>
  )
}
