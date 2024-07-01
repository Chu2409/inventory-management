'use client'

import Link from 'next/link'
import { CircleUser, Menu, Package2 } from 'lucide-react'

import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../../../components/ui/dropdown-menu'
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../../components/ui/sheet'

import { IRoute } from '@/types/types'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface NavbarProps {
  routes: IRoute[]
}

export const Navbar: React.FC<NavbarProps> = ({ routes }) => {
  const pathname = usePathname()

  const [open, setIsOpen] = useState(false)

  return (
    <header className='sticky z-50 top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6'>
      <nav className='max-md:hidden gap-10 flex flex-row items-center font-medium'>
        <Link href='#'>
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Link>

        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'transition-colors hover:text-primary',
              route.href === pathname
                ? 'text-black font-bold dark:text-white '
                : 'text-muted-foreground',
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>

          <nav className='flex flex-col gap-6 text-lg font-medium'>
            <Link href='#' className='flex items-center gap-2 text-lg'>
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Acme Inc</span>
            </Link>

            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  route.href === pathname
                    ? 'text-black font-bold dark:text-white '
                    : 'text-muted-foreground',
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
            Configuración
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
            Salir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
