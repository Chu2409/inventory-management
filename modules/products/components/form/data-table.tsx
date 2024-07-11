'use client'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'

export interface IProductColumn {
  color: string
  size?: { id: number; value: string }
  stock: {
    value: number
    isEdited?: boolean
  }
  price: {
    value: number
    isEdited?: boolean
  }
  isSaved: boolean
  toDelete: boolean
  toEdit: boolean
}

interface ProductBulkDataTableProps {
  data: IProductColumn[]
  onDelete(isSaved: boolean, color: string, sizeId?: number): void
  onStockBlur(
    isSaved: boolean,
    value: number,
    color: string,
    sizeId?: number,
  ): void
  onPriceBlur(
    isSaved: boolean,
    value: number,
    color: string,
    sizeId?: number,
  ): void
}

export function ProductBulkDataTable({
  data,
  onDelete,
  onStockBlur,
  onPriceBlur,
}: ProductBulkDataTableProps) {
  return (
    <div className='rounded-md border overflow-y-auto max-h-64'>
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
                className={cn(
                  !product.isSaved && 'bg-green-100 hover:bg-green-200',
                  product.toDelete && 'bg-red-100 hover:bg-red-200',
                )}
              >
                <TableCell className='px-0 text-center py-1.5 capitalize'>
                  {product.color.toLowerCase()}
                </TableCell>

                <TableCell className='px-0 text-center py-1.5'>
                  {product.size?.value || 'N/A'}
                </TableCell>

                <TableCell
                  className={cn(
                    'px-0 text-center py-1.5',
                    product.stock.isEdited && 'bg-blue-200 rounded-sm',
                  )}
                >
                  <div className='w-full flex items-center justify-center'>
                    <Input
                      type='number'
                      defaultValue={product.stock.value}
                      disabled={product.toDelete}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value < 0) return
                        onStockBlur(
                          product.isSaved,
                          value,
                          product.color,
                          product.size?.id,
                        )
                      }}
                      min={0}
                      className='max-w-12 text-center p-0 mx-0 h-min bg-transparent border-none disabled:opacity-100'
                    />
                  </div>
                </TableCell>

                <TableCell
                  className={cn(
                    'px-0 text-center py-1.5',
                    product.price.isEdited && 'bg-blue-200 rounded-sm',
                  )}
                >
                  <div className='w-full flex items-center justify-center'>
                    <Input
                      type='number'
                      disabled={product.toDelete}
                      defaultValue={product.price.value}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value < 0) return
                        onPriceBlur(
                          product.isSaved,
                          value,
                          product.color,
                          product.size?.id,
                        )
                      }}
                      min={0}
                      className='max-w-20 text-center p-0 mx-0 h-min bg-transparent border-none disabled:opacity-100'
                    />
                  </div>
                </TableCell>

                <TableCell className='px-0 text-center py-1.5 flex items-center justify-center w-full'>
                  {product.toDelete ? (
                    <ReloadIcon
                      className='h-4 w-4 cursor-pointer text-blue-600'
                      onClick={() =>
                        onDelete(
                          product.isSaved,
                          product.color,
                          product.size?.id,
                        )
                      }
                    />
                  ) : (
                    <Trash
                      className='h-4 w-4 cursor-pointer text-red-600'
                      onClick={() =>
                        onDelete(
                          product.isSaved,
                          product.color,
                          product.size?.id,
                        )
                      }
                    />
                  )}
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
