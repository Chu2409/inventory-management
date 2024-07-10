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
import { IProductMasterBulk, IProductTable } from '../../types'
import debounce from 'just-debounce-it'
import { getProductMasterBulkByCode } from '../../actions/get-product-master-bulk-by-code'
import { MultiSelector } from '@/modules/shared/components/multi-selector'
import { Button } from '@/components/ui/button'
import { Option } from '@/modules/shared/types'
import toast from 'react-hot-toast'
import { createProductBulk } from '../../actions/create-products-bulk'
import { useRouter } from 'next/navigation'
import { getSizes } from '@/modules/sizes/actions/get-sizes'
import { ProductBulkDataTable } from './data-table'
import { productBulkColumns } from './columns'

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

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetCode = useCallback(
    debounce((code: string) => {
      setCode(code)
    }, 800),
    [],
  )

  const [productsTable, setProductsTable] = useState<IProductTable[]>([])

  const [code, setCode] = useState('')
  const [productMaster, setProductMaster] = useState<IProductMasterBulk | null>(
    null,
  )
  useEffect(() => {
    const fetchProductMaster = async () => {
      const productMaster = await getProductMasterBulkByCode(code)
      if (productMaster != null) {
        productBulkForm.reset({
          ...productMaster,
          price: productMaster.productColors[0].products[0].price,
        })

        const productsTable = productMaster.productColors
          .map((productColor) =>
            productColor.products.map((product) => ({
              ...product,
              productColor,
            })),
          )
          .flat()

        setProductsTable(productsTable)
      } else {
        setProductMaster(productMaster)
        setProductsTable([])
      }
    }

    fetchProductMaster()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const [filteredSizes, setFilteredSizes] = useState<Option[]>([])
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
          </div>

          <ProductBulkDataTable
            columns={productBulkColumns}
            data={productsTable}
          />

          <Button type='submit' disabled={isLoading}>
            Guardar
          </Button>
        </form>
      </Form>
    </>
  )
}
