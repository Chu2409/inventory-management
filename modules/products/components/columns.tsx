'use client'

import { ColumnDef } from '@tanstack/react-table'

import { IFullProduct } from '../types'

export const columns: ColumnDef<IFullProduct>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
    cell: ({ row }) => row.original.productColor.code,
    accessorFn: (row) => row.productColor.code,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => row.original.productColor.productMaster.name,
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => row.original.productColor.color,
    filterFn: (rows, id, value) =>
      value.includes(rows.original.productColor.color),
  },
  {
    accessorKey: 'size',
    header: 'Tamaño/Talla',
    cell: ({ row }) => row.original.size?.value,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => row.original.stock,
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => row.original.price,
  },
  {
    accessorKey: 'brand',
    header: 'Marca',
    cell: ({ row }) => row.original.productColor.productMaster.brand?.name,
    filterFn: (rows, id, value) =>
      value.includes(
        rows.original.productColor.productMaster.brandId?.toString(),
      ),
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => row.original.productColor.productMaster.category.name,
    filterFn: (rows, id, value) =>
      value.includes(
        rows.original.productColor.productMaster.categoryId?.toString(),
      ),
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
