'use client'

import { Brand } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { BrandsCellActions } from './cell-actions'
import { deleteBrand } from '../actions/delete-brand'

export const brandsColumns: ColumnDef<Brand>[] = [
  {
    header: 'Nombre',
    cell: ({ row }) => row.original.name,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return (
        <BrandsCellActions
          brand={{
            id: row.original.id,
            name: row.original.name,
          }}
          message='Marca eliminada correctamente'
          onDelete={deleteBrand}
          errorMessage='Elimine los productos asociados a esta marca antes de eliminarla'
        />
      )
    },
  },
]
