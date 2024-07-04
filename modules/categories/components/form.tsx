'use client'
import { Category } from '@prisma/client'

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
import { createCategory } from '../actions/create-category'
import { updateCategory } from '../actions/update-category'

interface CategoryFormProps {
  category?: Category
  onClose: () => void
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Mínimo 1 caracter' })
    .max(30, { message: 'Máximo 30 caracteres' }),
})

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onClose: onCloseReq,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category ? category.name : '',
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
      if (category)
        result = await updateCategory({ id: category.id, data: values })
      else result = await createCategory(values)

      if (!result) throw new Error()

      router.refresh()
      toast.success(category ? 'Categoría actualizada' : 'Categoría agregada')
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
                  placeholder='Nombre de la categoría'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {category ? 'Actualizar' : 'Agregar'}
        </Button>
      </form>
    </Form>
  )
}
