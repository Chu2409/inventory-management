'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DataTableFilter } from './data-table-filter'
import { Color } from '@prisma/client'
import { Option } from '@/modules/shared/types'

const colors = Object.values(Color).map((color) => ({
  label: color,
  value: color,
}))

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  categories: Option[]
  brands: Option[]
}

export function DataTableToolbar<TData>({
  table,
  brands,
  categories,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex flex-1 items-center gap-2 flex-wrap'>
      <Input
        placeholder='Buscar productos...'
        value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          return table.getColumn('code')?.setFilterValue(event.target.value)
        }}
        className='h-8 w-[200px] lg:w-[250px] bg-white'
      />

      {table.getColumn('color') && (
        <DataTableFilter
          column={table.getColumn('color')}
          title='Color'
          options={colors}
        />
      )}

      {table.getColumn('brand') && (
        <DataTableFilter
          column={table.getColumn('brand')}
          title='Marca'
          options={brands}
        />
      )}

      {table.getColumn('category') && (
        <DataTableFilter
          column={table.getColumn('category')}
          title='Categoría'
          options={categories}
        />
      )}

      {isFiltered && (
        <Button
          variant='default'
          onClick={() => table.resetColumnFilters()}
          className='h-8 px-2 lg:px-3 bg-gray-200 hover:bg-gray-300 text-black text-center items-center flex'
        >
          Limpiar filtros
          <Cross2Icon className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  )
}
