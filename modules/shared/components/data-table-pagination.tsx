import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center justify-end gap-x-4 lg:gap-x-6 pb-16'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>Items por página</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>

          <SelectContent side='bottom' className='absolute'>
            {[10, 20, 30].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`} className='h-6'>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()}
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Ir a la anterior página</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Ir a la siguiente página</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
