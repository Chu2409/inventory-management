'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullSize } from '../types'
import { deleteSize } from '../actions/delete-size'
import { SizesCellActions } from './cell-actions'

export const sizesColumns: ColumnDef<IFullSize>[] = [
  {
    header: 'Valor',
    cell: ({ row }) => row.original.value,
  },
  {
    header: 'Categoría',
    cell: ({ row }) => row.original.category.name,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return (
        <SizesCellActions
          size={{
            id: row.original.id,
            value: row.original.value,
            categoryId: row.original.categoryId,
          }}
          message='Talla/Tamaño eliminado'
          onDelete={deleteSize}
          errorMessage='Elimine los productos asociados a esta talla/tamaño primero'
        />
      )
    },
  },
]
