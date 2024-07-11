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
import { IProductMasterBulk, SizesByColor } from '../../types'
import debounce from 'just-debounce-it'
import { getProductMasterBulkByCode } from '../../actions/get-product-master-bulk-by-code'
import {
  MultiSelector,
  MultiSelectorOption,
} from '@/modules/shared/components/multi-selector'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { getSizes } from '@/modules/sizes/actions/get-sizes'
import { IProductColumn, ProductBulkDataTable } from './data-table'
import { Separator } from '@/components/ui/separator'

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

  const [code, setCode] = useState('')
  const [productMaster, setProductMaster] = useState<IProductMasterBulk | null>(
    null,
  )
  const [productsTable, setProductsTable] = useState<IProductColumn[]>([])
  useEffect(() => {
    const fetchProductMaster = async () => {
      setIsLoading(true)
      const productMaster = await getProductMasterBulkByCode(code)
      if (productMaster != null) {
        productBulkForm.reset({
          ...productMaster,
        })

        const productsTable: IProductColumn[] = productMaster.productColors
          .map((productColor) =>
            productColor.products.map((product) => ({
              color: productColor.color,
              size: product.size
                ? {
                    id: product.size.id,
                    value: product.size.value,
                  }
                : undefined,
              stock: { value: product.stock },
              price: { value: product.price },
              isSaved: true,
              toDelete: false,
              toEdit: false,
            })),
          )
          .flat()
        setProductsTable(productsTable)

        const sizesByColor = productMaster.productColors.map(
          (productColor) => ({
            color: productColor.color,
            sizeIds: productColor.products
              .filter((product) => product.size != null)
              .map((product) => product.size!.id),
          }),
        )
        setSizesByColor(sizesByColor)
      } else {
        setProductMaster(productMaster)
        setProductsTable([])
        setSizesByColor([])
      }
      setIsLoading(false)
    }

    fetchProductMaster()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const [sizesByCategory, setSizesByCategory] = useState<MultiSelectorOption[]>(
    [],
  )
  const [color, setColor] = useState<Color | null>(null)
  const [sizesByColor, setSizesByColor] = useState<SizesByColor[]>([])
  useEffect(() => {
    const fetchSizes = async () => {
      setIsLoading(true)

      const categoryId = Number(productBulkForm.getValues('categoryId'))

      const sizes = await getSizes(categoryId)
      const formattedSizes = sizes.map(({ id, value }) => ({
        label: value,
        value: id,
      }))
      setSizesByCategory(formattedSizes)
      // setProductsTable([]) // Reset products table TODO

      if (sizes.length === 0) setSizesByColor([])

      setIsLoading(false)
    }

    fetchSizes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productBulkForm.watch('categoryId')])

  const onSubmit = async (values: z.infer<typeof productBulkFormSchema>) => {
    try {
      setIsLoading(true)

      console.log(values)
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
      // productBulkForm.reset()
      // onCloseReq()
    }
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <Form {...productBulkForm}>
        <form
          onSubmit={productBulkForm.handleSubmit(onSubmit)}
          className='grid gap-x-2 gap-y-2 md:grid-cols-3 grid-cols-2'
          id='form'
        >
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
        </form>
      </Form>

      <Separator />

      <div className='grid gap-x-2 gap-y-2 md:grid-cols-3 grid-cols-2'>
        <div className='space-y-3'>
          <div className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Colores
          </div>

          <Select
            disabled={isLoading}
            // eslint-disable-next-line react/jsx-handler-names
            onValueChange={(value) => setColor(value as Color)}
            value={color || ''}
          >
            <SelectTrigger className='h-8 text-left capitalize'>
              <SelectValue placeholder='Seleccione...' />
            </SelectTrigger>
            <SelectContent className='max-h-40'>
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
        </div>

        <div className='space-y-3'>
          {sizesByCategory.length > 0 ? (
            <>
              <div className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Tallas
              </div>

              <MultiSelector
                disabled={
                  isLoading || color == null || sizesByCategory.length === 0
                }
                title='Seleccione...'
                values={
                  sizesByColor.find((size) => size.color === color)?.sizeIds ||
                  []
                }
                options={sizesByCategory}
                onChange={(size) => {
                  const colorIndex = sizesByColor.findIndex(
                    (item) => item.color === color,
                  )
                  const updatedSizesByColor = [...sizesByColor]

                  if (colorIndex !== -1) {
                    updatedSizesByColor[colorIndex].sizeIds.push(size)
                    setSizesByColor(updatedSizesByColor)
                  } else {
                    setSizesByColor([
                      ...updatedSizesByColor,
                      { color: color!, sizeIds: [size] },
                    ])
                  }

                  const updatedProductsTable = productsTable.concat({
                    color: color!,
                    size: {
                      id: size,
                      value: sizesByCategory.find(
                        (item) => item.value === size,
                      )!.label,
                    },
                    stock: { value: 1 },
                    price: { value: 30 },
                    isSaved: false,
                    toDelete: false,
                    toEdit: false,
                  })
                  setProductsTable(updatedProductsTable)
                }}
                onRemove={() => {}}
              />
            </>
          ) : (
            color && (
              <>
                <div className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 invisible'>
                  Variaciones
                </div>
                <Button
                  className='h-8'
                  onClick={() => {
                    if (
                      productsTable.some((product) => product.color === color)
                    )
                      return

                    const updatedProductsTable = productsTable.concat({
                      color: color!,
                      stock: { value: 1 },
                      price: { value: 30 },
                      isSaved: false,
                      toDelete: false,
                      toEdit: false,
                    })
                    setProductsTable(updatedProductsTable)
                  }}
                >
                  Agregar variación
                </Button>
              </>
            )
          )}
        </div>
      </div>

      <ProductBulkDataTable
        data={productsTable}
        onDelete={(isSaved: boolean, color: string, sizeId?: number) => {
          if (isSaved) {
            const updatedProductsTable = productsTable.map((product) => {
              if (product.color === color && product.size?.id === sizeId) {
                return {
                  ...product,
                  toDelete: product.toDelete ? !product.toDelete : true,
                }
              }
              return product
            })
            setProductsTable(updatedProductsTable)
          } else {
            const updatedSizesByColor = sizesByColor.map((size) => ({
              color: size.color,
              sizeIds:
                size.color === color
                  ? size.sizeIds.filter((id) => id !== sizeId)
                  : size.sizeIds,
            }))
            setSizesByColor(updatedSizesByColor)

            const updatedProductsTable = productsTable.filter(
              (product) =>
                product.color !== color || product.size?.id !== sizeId,
            )
            setProductsTable(updatedProductsTable)
          }
        }}
        onPriceBlur={(
          isSaved: boolean,
          value: number,
          color: string,
          sizeId?: number,
        ) => {
          const updatedProductsTable = productsTable.map((product) => {
            if (product.color === color && product.size?.id === sizeId) {
              return {
                ...product,
                price: { value, isEdited: !!isSaved },
                toEdit: !!isSaved,
              }
            }
            return product
          })
          setProductsTable(updatedProductsTable)
        }}
        onStockBlur={(
          isSaved: boolean,
          value: number,
          color: string,
          sizeId?: number,
        ) => {
          const updatedProductsTable = productsTable.map((product) => {
            if (product.color === color && product.size?.id === sizeId) {
              return {
                ...product,
                stock: { value, isEdited: !!isSaved },
                toEdit: !!isSaved,
              }
            }
            return product
          })
          setProductsTable(updatedProductsTable)
        }}
      />

      <div className='ml-auto'>
        <Button type='submit' disabled={isLoading} form='form' className='w-44'>
          Guardar
        </Button>
      </div>
    </div>
  )
}
