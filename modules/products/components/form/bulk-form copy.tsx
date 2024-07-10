'use client'

import { useCallback, useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IProductMasterBulk } from '../types'
import debounce from 'just-debounce-it'
import { getProductMasterBulkByCode } from '../actions/get-product-master-bulk-by-code'
import { MultiSelector } from '@/modules/shared/components/multi-selector'
import { Button } from '@/components/ui/button'
import { Option } from '@/modules/shared/types'
import toast from 'react-hot-toast'
import { createProductBulk } from '../actions/create-products-bulk'
import { useRouter } from 'next/navigation'
import { getSizes } from '@/modules/sizes/actions/get-sizes'

interface ProductBulkFormProps {
  categories: Category[]
  brands: Brand[]
  onClose: () => void
}

const productBulkFormSchema = z.object({
  code: z
    .string()
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  gender: z.nativeEnum(Gender).nullable(),
  brandId: z.coerce.number().nullable(),
  categoryId: z.coerce.number().min(1, { message: 'Selecciona una categoría' }),
  colors: z
    .array(z.nativeEnum(Color))
    .min(1, { message: 'Seleccione al menos un color' }),
  price: z.coerce
    .number({ invalid_type_error: 'Ingrese un precio válido' })
    .positive({ message: 'Ingrese un precio válido' })
    .nonnegative({ message: 'Ingrese un precio válido' }),
  stock: z.coerce
    .number({ invalid_type_error: 'Ingrese un stock válido' })
    .int({ message: 'Ingrese un stock válido' })
    .nonnegative({ message: 'Ingrese un stock válido' }),
  sizes: z
    .array(z.coerce.number())
    .min(1, { message: 'Seleccione al menos una talla' }),
})

export const ProductBulkForm: React.FC<ProductBulkFormProps> = ({
  brands,
  categories,
  onClose: onCloseReq,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [code, setCode] = useState('')
  const [productMaster, setProductMaster] = useState<IProductMasterBulk | null>(
    null,
  )
  const [filteredSizes, setFilteredSizes] = useState<Option[]>([])

  const productBulkForm = useForm<z.infer<typeof productBulkFormSchema>>({
    resolver: zodResolver(productBulkFormSchema),
    defaultValues: {
      code: '',
      name: '',
      gender: null,
      brandId: null,
      // @ts-ignore
      categoryId: '',
      colors: [],
      // @ts-ignore
      price: '',
      // @ts-ignore
      stock: '',
      sizes: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof productBulkFormSchema>) => {
    try {
      setIsLoading(true)

      const productBulkSuccess = await createProductBulk(
        values,
        productMaster?.id,
      )
      if (!productBulkSuccess) throw new Error()

      router.refresh()
      toast.success('Productos creado correctamente')
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
      productBulkForm.reset()
      onCloseReq()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetCode = useCallback(
    debounce((code: string) => {
      setCode(code)
    }, 800),
    [],
  )

  useEffect(() => {
    const fetchProductMaster = async () => {
      const productMaster = await getProductMasterBulkByCode(code)
      if (productMaster != null)
        productBulkForm.reset({
          ...productMaster,
          price: productMaster.productColors[0].products[0].price,
        })

      setProductMaster(productMaster)
    }

    fetchProductMaster()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    const fetchSizes = async () => {
      const categoryId =
        Number(productBulkForm.getValues('categoryId')) || undefined

      if (categoryId) {
        const sizes = await getSizes(categoryId)
        const formattedSizes = sizes.map(({ id, value }) => ({
          label: value,
          value: id.toString(),
        }))
        setFilteredSizes(formattedSizes)
      }
    }

    fetchSizes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productBulkForm.watch('categoryId')])

  return (
    <>
      <Form {...productBulkForm}>
        <form
          onSubmit={productBulkForm.handleSubmit(onSubmit)}
          className='flex flex-col gap-y-8'
        >
          <div className='grid gap-x-2 gap-y-2 md:grid-cols-3 grid-cols-2'>
            <FormField
              control={productBulkForm.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      autoFocus
                      className='h-8'
                      placeholder='Z15'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedSetCode(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productBulkForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className='h-8'
                      placeholder='Nike Fast'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productBulkForm.control}
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
                      <SelectTrigger className='h-8 text-left'>
                        <SelectValue placeholder='Seleccione...' />
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
              control={productBulkForm.control}
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
                      <SelectTrigger className='h-8 text-left'>
                        <SelectValue placeholder='Seleccione...' />
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

            <FormField
              control={productBulkForm.control}
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
                      <SelectTrigger className='h-8 text-left'>
                        <SelectValue placeholder='Seleccione...' />
                      </SelectTrigger>

                      <SelectContent className='max-h-52'>
                        {Object.values(Gender).map((gender) => (
                          <SelectItem
                            key={gender}
                            value={gender}
                            className='cursor-pointer h-7'
                          >
                            {gender}
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
              control={productBulkForm.control}
              name='colors'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colores</FormLabel>
                  <FormControl>
                    <div>
                      <MultiSelector
                        title='Seleccione...'
                        values={field.value}
                        options={Object.values(Color).map((color) => ({
                          value: color,
                          label: color,
                        }))}
                        onChange={(value) => {
                          const newValue = field.value
                            ? [...field.value, value]
                            : [value]

                          field.onChange(newValue)
                        }}
                        onRemove={(value) => {
                          const newValue = field.value
                            ? field.value.filter((current) => current !== value)
                            : []
                          field.onChange(newValue)
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productBulkForm.control}
              name='sizes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tallas</FormLabel>
                  <FormControl>
                    <div>
                      <MultiSelector
                        disabled={isLoading || filteredSizes.length === 0}
                        title='Seleccione...'
                        values={field.value.map((size) => size.toString())}
                        options={filteredSizes}
                        onChange={(size) => {
                          const newValue = field.value
                            ? [...field.value, size]
                            : [size]

                          field.onChange(newValue)
                        }}
                        onRemove={(size) => {
                          const newValue = field.value
                            ? field.value.filter(
                                (current) => current.toString() !== size,
                              )
                            : []
                          field.onChange(newValue)
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productBulkForm.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      className='h-8'
                      disabled={isLoading}
                      type='number'
                      placeholder='9.99'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productBulkForm.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      className='h-8'
                      disabled={isLoading}
                      type='number'
                      placeholder='10'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isLoading} className=''>
            Guardar
          </Button>
        </form>
      </Form>
    </>
  )
}
