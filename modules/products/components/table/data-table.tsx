'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '../../../shared/components/data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import { useProductModal } from '../../hooks/use-product-modal'
import { Option } from '@/modules/shared/types'
import { Eye } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  categories: Option[]
  brands: Option[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  brands,
  categories,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const onOpen = useProductModal((state) => state.onOpen)
  const setCode = useProductModal((state) => state.setCode)
  const setColor = useProductModal((state) => state.setColor)

  const onClick = (code: string, color: string) => {
    setCode(code)
    setColor(color)
    onOpen()
  }

  return (
    <div className='space-y-4 pb-8'>
      <DataTableToolbar table={table} categories={categories} brands={brands} />

      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className='font-bold px-0 text-center py-3 h-min'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
                <TableHead className='px-0 text-center py-0 h-min' />
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className=''
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='px-0 text-center py-3.5'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className='px-0 text-center w-min flex items-center justify-center py-3.5'>
                    <Eye
                      className='w-4 h-4 text-gray-600 cursor-pointer hover:text-black'
                      onDoubleClick={() =>
                        onClick(
                          // @ts-ignore
                          row.original.productColor.productMaster.code,
                          // @ts-ignore
                          row.original.productColor.color,
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}
