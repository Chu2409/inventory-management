import { Badge } from '@/components/ui/badge'
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
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { Option } from '../types'

interface MultiSelectorProps {
  title: string
  values: string[]
  options: Option[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

export const MultiSelector: React.FC<MultiSelectorProps> = ({
  title,
  values,
  options,
  onChange,
  onRemove,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 bg-white border border-black border-opacity-20 w-full'
        >
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {title}

          {values?.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {values.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {values.length > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {values.length} seleccionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => values.includes(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal capitalize'
                      >
                        {option.label.toLowerCase()}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='p-0 bg-white w-[300px]' align='start'>
        <Command className='max-h-52'>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No hay opciones disponibles</CommandEmpty>

            <CommandGroup>
              {options.map((option, index) => {
                const isSelected = values.includes(option.value)
                return (
                  <CommandItem
                    key={`${option.value}${index}`}
                    onSelect={() => {
                      if (isSelected) onRemove(option.value)
                      else onChange(option.value)
                    }}
                    className='cursor-pointer capitalize'
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>

                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
