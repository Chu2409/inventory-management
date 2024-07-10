import { ColumnDef } from '@tanstack/react-table'

export interface IProductColumn {
  color: string
  size?: { id: number; value: string }
  stock: number
  price: number
}

export const productBulkColumns: ColumnDef<IProductColumn>[] = [
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='capitalize'>{row.original.color.toLowerCase()}</div>
    ),
  },
  {
    accessorKey: 'size',
    header: 'Talla',
    cell: ({ row }) => row.original.size?.value || '-',
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
]
