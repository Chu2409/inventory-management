'use client'

import { ColumnDef } from '@tanstack/react-table'

import { IProduct } from '../../types'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
    cell: ({ row }) => row.original.productColor.productMaster.code,
    accessorFn: (row) => row.productColor.productMaster.code,
  },
  {
    accessorKey: 'name',
    header: () => <div className='max-lg:hidden'>Nombre</div>,
    cell: ({ row }) => (
      <div className='max-lg:hidden'>
        {row.original.productColor.productMaster.name}
      </div>
    ),
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.original.productColor.color.toLowerCase()}
      </div>
    ),
    filterFn: (rows, id, value) =>
      value.includes(rows.original.productColor.color),
  },
  {
    accessorKey: 'size',
    header: 'Talla',
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
    header: () => <div className='max-lg:hidden'>Marca</div>,
    cell: ({ row }) => (
      <div className='max-lg:hidden'>
        {row.original.productColor.productMaster.brand?.name}
      </div>
    ),
    filterFn: (rows, id, value) =>
      value.includes(
        rows.original.productColor.productMaster.brandId?.toString(),
      ),
  },
  {
    accessorKey: 'category',
    header: () => <div className='max-lg:hidden'>Categoría</div>,
    cell: ({ row }) => (
      <div className='max-lg:hidden'>
        {row.original.productColor.productMaster.category?.name}
      </div>
    ),
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
