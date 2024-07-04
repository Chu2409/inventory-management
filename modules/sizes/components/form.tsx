'use client'
import { Size } from '@prisma/client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { createSize } from '../actions/create-size'
import { updateSize } from '../actions/update-size'
import { useCategories } from '../hooks/use-categories'

interface SizeFormProps {
  size?: Size
  onClose: () => void
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: 'Mínimo 1 caracter' })
    .max(5, { message: 'Máximo 5 caracteres' }),
  categoryId: z.coerce.number().min(1, { message: 'Selecciona una categoría' }),
})

export const SizeForm: React.FC<SizeFormProps> = ({
  size,
  onClose: onCloseReq,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const categories = useCategories((state) => state.categories)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: size ? size.value : '',
      // @ts-ignore
      categoryId: size ? size.categoryId : '',
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
      if (size) result = await updateSize({ id: size.id, data: values })
      else result = await createSize(values)

      if (!result) throw new Error()

      router.refresh()
      toast.success(size ? 'Talla/Tamaño actualizada' : 'Talla/Tamaño creada')
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
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  autoFocus
                  placeholder='Valor de la talla/tamaño'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select
                  disabled={isLoading}
                  // eslint-disable-next-line react/jsx-handler-names
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder='Selecciona una categoría'
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id.toString()}
                        value={category.id.toString()}
                        className='cursor-pointer'
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {size ? 'Actualizar' : 'Agregar'}
        </Button>
      </form>
    </Form>
  )
}
