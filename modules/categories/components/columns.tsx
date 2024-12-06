'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { CategoriesCellActions } from './cell-actions'
import { deleteCategory } from '../actions/delete-category'

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    header: 'Nombre',
    cell: ({ row }) => row.original.name,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return (
        <CategoriesCellActions
          category={{
            id: row.original.id,
            name: row.original.name,
          }}
          message='Categoría eliminada correctamente'
          onDelete={deleteCategory}
          errorMessage='Elimine los productos asociados a esta categoría antes de eliminarla'
        />
      )
    },
  },
]
