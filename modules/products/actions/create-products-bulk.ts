'use server'

import prisma from '@/lib/prisma'
import { Color, Gender } from '@prisma/client'

interface CreateProductBulkProps {
  code: string
  name: string
  gender: Gender | null
  brandId: number | null
  categoryId: number
  price: number
  stock: number
  colors: Color[]
  sizes: number[]
}

export const createProductBulk = async (
  data: CreateProductBulkProps,
  productMasterId?: number,
): Promise<boolean> => {
  try {
    if (productMasterId) {
      const productsBulk = data.colors.map(
        async (color) =>
          await prisma.productColor.create({
            data: {
              color,
              images: [],
              productMasterId,
              products: {
                create: data.sizes.map((size) => ({
                  price: data.price,
                  stock: data.stock,
                  sizeId: size,
                })),
              },
            },
          }),
      )

      return !!productsBulk
    }

    const productsBulk = await prisma.productMaster.create({
      data: {
        code: data.code.toUpperCase(),
        name: data.name,
        gender: data.gender,
        brandId: data.brandId,
        categoryId: data.categoryId,
        productColors: {
          create: data.colors.map((color) => ({
            color,
            images: [],
            products: {
              create: data.sizes.map((size) => ({
                price: data.price,
                stock: data.stock,
                sizeId: size,
              })),
            },
          })),
        },
      },
    })

    return !!productsBulk
  } catch (error: any) {
    console.log('[CREATE_PRODUCT_BULK]', error.message)
    return false
  }
}
