'use client'

import { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { IProduct } from '../types'
import { Brand, Category, Color, Gender } from '@prisma/client'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ImageUpload } from './image-upload'

interface ProductFormProps {
  initialData: IProduct | null
  categories: Category[]
  brands: Brand[]
  onClose: () => void
}

const productMasterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  gender: z.nativeEnum(Gender).nullable(),
  brandId: z.coerce.number().nullable(),
  categoryId: z.coerce.number().min(1, { message: 'Selecciona una categoría' }),
})

const productColorFormSchema = z.object({
  code: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  color: z.nativeEnum(Color).nullable(),
  images: z.array(z.string()),
})

const productFormSchema = z.object({
  price: z.coerce
    .number({ invalid_type_error: 'Precio inválido' })
    .positive({ message: 'Precio inválido' })
    .nonnegative({ message: 'Precio inválido' }),
  stock: z.coerce
    .number({ invalid_type_error: 'Precio inválido' })
    .int({ message: 'Stock inválido' })
    .nonnegative({ message: 'Stock inválido' }),
  sizeId: z.coerce.number().optional(),
})

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  brands,
  categories,
  onClose: onCloseReq,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const productMasterForm = useForm<z.infer<typeof productMasterFormSchema>>({
    resolver: zodResolver(productMasterFormSchema),
    // @ts-ignore
    defaultValues: initialData
      ? {
          ...initialData.productColor.productMaster,
        }
      : {
          name: '',
          gender: null,
          brandId: null,
          categoryId: '',
        },
  })

  const productColorForm = useForm<z.infer<typeof productColorFormSchema>>({
    resolver: zodResolver(productColorFormSchema),
    defaultValues: initialData
      ? {
          ...initialData.productColor,
        }
      : {
          code: '',
          color: null,
          images: [],
        },
  })

  const onClose = () => {
    setIsLoading(false)
    productMasterForm.reset()
    onCloseReq()
  }

  const onSubmit = async (values: z.infer<typeof productMasterFormSchema>) => {
    console.log(values)
  }

  const onSubmit1 = async (values: z.infer<typeof productColorFormSchema>) => {
    console.log(values)
  }

  return (
    <>
      <Form {...productMasterForm}>
        <form onSubmit={productMasterForm.handleSubmit(onSubmit)}>
          <div className='grid gap-x-4 gap-y-2 md:grid-cols-2'>
            <FormField
              control={productMasterForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      autoFocus
                      className='h-8'
                      placeholder='Nombre del producto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productMasterForm.control}
              name='brandId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className='h-8'>
                        <SelectValue placeholder='Selecciona una marca' />
                      </SelectTrigger>

                      <SelectContent className='max-h-52'>
                        {brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={brand.id.toString()}
                            className='cursor-pointer h-7'
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productMasterForm.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger className='h-8'>
                        <SelectValue placeholder='Selecciona una género' />
                      </SelectTrigger>

                      <SelectContent className='max-h-52'>
                        {Object.values(Gender).map((gender) => (
                          <SelectItem
                            key={gender}
                            value={gender}
                            className='cursor-pointer h-7 capitalize'
                          >
                            {gender.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productMasterForm.control}
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
                    >
                      <SelectTrigger className='h-8'>
                        <SelectValue placeholder='Selecciona una categoría' />
                      </SelectTrigger>

                      <SelectContent className='max-h-52'>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                            className='cursor-pointer h-7'
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
          </div>

          {/* <Button type='submit' disabled={isLoading}>
          {initialData ? 'Actualizar' : 'Agregar'}
        </Button> */}
        </form>
      </Form>

      <Separator className='my-4' />

      <Form {...productColorForm}>
        <form onSubmit={productColorForm.handleSubmit(onSubmit1)}>
          <div className='grid gap-x-4 gap-y-2 md:grid-cols-2'>
            <FormField
              control={productColorForm.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Código del producto'
                      className='h-8'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productColorForm.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger className='h-8'>
                        <SelectValue placeholder='Selecciona un color' />
                      </SelectTrigger>

                      <SelectContent className='max-h-52'>
                        {Object.values(Color).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className='cursor-pointer h-7 capitalize'
                          >
                            {color.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productColorForm.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imágenes</FormLabel>
                  <FormControl className='z-auto'>
                    <ImageUpload
                      imagesUrl={field.value}
                      isDisabled={isLoading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter((current) => current !== url),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <Button type='submit' disabled={isLoading}>
            {initialData ? 'Actualizar' : 'Agregar'}
          </Button> */}
        </form>
      </Form>

      <Separator className='my-4' />
    </>
  )
}
