'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IFullSize } from '../types'
import { CellActions } from '@/modules/shared/components/cell-actions'
import { deleteSize } from '../actions/delete-size'

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
        <CellActions
          id={row.original.id}
          message='Talla/Tamaño eliminado'
          onDelete={deleteSize}
          errorMessage='Elimine los productos asociados a esta talla/tamaño primero'
          refresh
        />
      )
    },
  },
]
