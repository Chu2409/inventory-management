'use server'

import prisma from '@/lib/prisma'
import { Color } from '@prisma/client'
import { IProductColumn } from '../components/form/data-table'
import { CreateProductBulkProps } from './create-products-bulk'

export const handleJustCreateBulk = async (
  data: CreateProductBulkProps,
): Promise<boolean> => {
  try {
    const variationsByColor = data.variations.reduce(
      (acc, variation) => {
        if (!acc[variation.color]) {
          acc[variation.color] = []
        }
        acc[variation.color].push(variation)
        return acc
      },
      {} as Record<string, IProductColumn[]>,
    )

    const productColors = Object.keys(variationsByColor).map((color) => ({
      color,
      variations: variationsByColor[color].map((variation) => ({
        size: variation.size?.id,
        stock: variation.stock.value,
        price: variation.price.value,
      })),
    }))

    const productsBulk = await prisma.productMaster.create({
      data: {
        code: data.code.toUpperCase(),
        name: data.name,
        gender: data.gender,
        brandId: data.brandId || undefined,
        categoryId: data.categoryId,
        productColors: {
          create: productColors.map((productColor) => ({
            color: productColor.color as Color,
            images: [],
            products: {
              create: productColor.variations.map((variation) => ({
                stock: variation.stock,
                price: variation.price,
                sizeId: variation.size,
              })),
            },
          })),
        },
      },
    })

    return !!productsBulk
  } catch (error: any) {
    console.log('[HANDLE_JUST_CREATE_PRODUCT_BULK]', error.message)
    return false
  }
}
