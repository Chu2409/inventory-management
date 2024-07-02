'use client'

import { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Modal } from '@/modules/shared/components/modal'
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
import { Category } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { createSize } from '../actions/create-size'
import { updateSize } from '../actions/update-size'

interface SizeModalProps {
  initialData?: any
  categories: Category[]
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: 'Mínimo 1 caracter' })
    .max(5, { message: 'Máximo 5 caracteres' }),
  categoryId: z.coerce.number().min(1, { message: 'Selecciona una categoría' }),
})

export const SizeModal: React.FC<SizeModalProps> = ({
  initialData,
  categories,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          value: initialData.value,
          categoryId: initialData.categoryId,
        }
      : {
          value: '',
          categoryId: '',
        },
  })

  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      console.log('values', values)

      let result
      if (initialData)
        result = await updateSize({ id: initialData.id, data: values })
      else result = await createSize(values)

      if (!result) throw new Error()

      router.refresh()
      toast.success(
        initialData ? 'Talla/Tamaño actualizada' : 'Talla/Tamaño creada',
      )
    } catch (error) {
      toast.error('Algo salió mal, intenta de nuevo')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      title={initialData ? 'Editar tamaño' : 'Nuevo tamaño'}
      description={initialData ? 'Edita el tamaño' : 'Agrega un nuevo tamaño'}
      isOpen
      onClose={() => {}}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex gap-4 flex-col'
        >
          <FormField
            control={form.control}
            name='value'
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    // disabled={isLoading}
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
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Select
                    // disabled={isLoading || initialData !== null}
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
            {initialData ? 'Actualizar' : 'Agregar'}
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
