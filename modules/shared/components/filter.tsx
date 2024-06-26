'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FilterValue } from '../types'

interface FilterProps {
  data: FilterValue[]
  baseRoute: string
  paramKey: string
  selectedId?: number
  placeholder?: string
  notFoundMessage?: string
}

export const Filter: React.FC<FilterProps> = ({
  data,
  baseRoute,
  paramKey,
  selectedId,
  placeholder,
  notFoundMessage,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const selected = useMemo(() => {
    return data.find((item) => item.id === selectedId)
  }, [data, selectedId])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-64 justify-between font-light bg-white rounded-sm border'
        >
          {selected
            ? `${selected.value}`
            : placeholder || 'Selecciona una opción...'}

          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-64 p-0'>
        <Command>
          <CommandInput
            placeholder={placeholder || 'Buscar...'}
            className='h-10'
          />

          <CommandEmpty>
            {notFoundMessage || 'No se encontraron resultados'}
          </CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-72'>
            <CommandList>
              {data.map((data) => (
                <CommandItem
                  className='cursor-pointer'
                  key={data.id}
                  value={data.value}
                  onSelect={() => {
                    if (data.id === selectedId) router.replace(baseRoute)
                    else router.replace(`${baseRoute}?${paramKey}=${data.id}`)
                  }}
                >
                  {data.value}

                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedId === data.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
