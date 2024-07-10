import { ColumnDef } from '@tanstack/react-table'
import { IProductTable } from '../../types'

export const productBulkColumns: ColumnDef<IProductTable>[] = [
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.original.productColor.color?.toLowerCase()}
      </div>
    ),
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
]
