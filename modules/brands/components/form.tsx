'use client'
import { Brand } from '@prisma/client'

import { useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { createBrand } from '../actions/create-brand'
import { updateBrand } from '../actions/update-brand'

interface BrandFormProps {
  brand?: Brand
  onClose: () => void
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Mínimo 1 caracter' })
    .max(30, { message: 'Máximo 30 caracteres' }),
})

export const BrandForm: React.FC<BrandFormProps> = ({
  brand,
  onClose: onCloseReq,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: brand ? brand.name : '',
    },
  })

  const onClose = () => {
    setIsLoading(false)
    form.reset()
    onCloseReq()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      let result
      if (brand) result = await updateBrand({ id: brand.id, data: values })
      else result = await createBrand(values)

      if (!result) throw new Error()

      router.refresh()
      toast.success(brand ? 'Marca actualizada' : 'Marca agregada')
    } catch (error) {
      toast.error('Algo salió mal, intenta de nuevo')
    } finally {
      onClose()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-4 flex-col'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  disabled={isLoading}
                  placeholder='Nombre de la marca'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {brand ? 'Actualizar' : 'Agregar'}
        </Button>
      </form>
    </Form>
  )
}
