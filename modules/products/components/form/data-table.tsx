'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Trash } from 'lucide-react'

export interface IProductColumn {
  color: string
  size?: { id: number; value: string }
  stock: number
  price: number
  isMarked?: boolean
}

interface ProductBulkDataTableProps {
  data: IProductColumn[]
  onDelete(color: string, sizeId?: number): void
}

export function ProductBulkDataTable({
  data,
  onDelete,
}: ProductBulkDataTableProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader className='bg-primary'>
          <TableRow className='hover:bg-primary'>
            <TableHead className='font-bold text-center py-2 h-min text-white'>
              Color
            </TableHead>

            <TableHead className='font-bold text-center py-2 h-min text-white'>
              Talla
            </TableHead>

            <TableHead className='font-bold text-center py-2 h-min text-white'>
              Stock
            </TableHead>

            <TableHead className='font-bold text-center py-2 h-min text-white'>
              Precio
            </TableHead>

            <TableHead className='font-bold text-center py-2 h-min text-white' />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((product) => (
              <TableRow
                key={`${product.color}${product.size?.id}`}
                className={cn(product.isMarked ? 'bg-gray-200' : '')}
              >
                <TableCell className='px-0 text-center py-1.5 capitalize'>
                  {product.color.toLowerCase()}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5'>
                  {product.size?.value || 'N/A'}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5'>
                  {product.stock}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5'>
                  {product.price}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5 flex items-center justify-center w-full'>
                  <Trash
                    className='h-4 w-4 cursor-pointer text-red-800'
                    onClick={() => onDelete(product.color, product.size?.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center'>
                No hay productos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
