'use server'

import prisma from '@/lib/prisma'
import { Color } from '@prisma/client'
import { IProductColumn } from '../components/form/data-table'
import { CreateProductBulkProps } from './create-products-bulk'

interface ProductVariation {
  color: string
  variations: {
    size: number | undefined
    stock: number
    price: number
    isSaved: boolean
    toDelete: boolean
    toEdit: boolean
  }[]
}

export const handleFullBulk = async (
  data: CreateProductBulkProps,
  productMasterId: number,
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
        isSaved: variation.isSaved,
        toDelete: variation.toDelete,
        toEdit: variation.toEdit,
      })),
    }))

    const toAdd: ProductVariation[] = []
    const toEdit: ProductVariation[] = []
    const toDelete: ProductVariation[] = []

    productColors.forEach((productColor) => {
      const addVariations = productColor.variations.filter(
        (variation) => !variation.isSaved,
      )
      const editVariations = productColor.variations.filter(
        (variation) => variation.toEdit,
      )
      const deleteVariations = productColor.variations.filter(
        (variation) => variation.toDelete,
      )

      if (addVariations.length > 0) {
        toAdd.push({ color: productColor.color, variations: addVariations })
      }
      if (editVariations.length > 0) {
        toEdit.push({ color: productColor.color, variations: editVariations })
      }
      if (deleteVariations.length > 0) {
        toDelete.push({
          color: productColor.color,
          variations: deleteVariations,
        })
      }
    })

    return await prisma.$transaction(async (prisma) => {
      if (toAdd.length > 0) {
        toAdd.map(async (productColor) => {
          await prisma.productColor.create({
            data: {
              color: productColor.color as Color,
              images: [],
              productMasterId,
              products: {
                create: productColor.variations.map((variation) => ({
                  stock: variation.stock,
                  price: variation.price,
                  sizeId: variation.size,
                })),
              },
            },
          })
        })
      }

      if (toEdit.length > 0) {
        toEdit.forEach((productColor) => {
          productColor.variations.forEach(async (variation) => {
            await prisma.product.updateMany({
              where: {
                productColor: {
                  productMasterId,
                  color: productColor.color as Color,
                },
                sizeId: variation.size,
              },
              data: {
                stock: variation.stock,
                price: variation.price,
              },
            })
          })
        })
      }

      if (toDelete.length > 0) {
        toDelete.forEach((productColor) => {
          productColor.variations.forEach(async (variation) => {
            await prisma.product.deleteMany({
              where: {
                productColor: {
                  productMasterId,
                  color: productColor.color as Color,
                },
                sizeId: variation.size,
              },
            })
          })
        })
      }

      await prisma.productMaster.update({
        where: {
          id: productMasterId,
        },
        data: {
          code: data.code.toUpperCase(),
          name: data.name,
          gender: data.gender,
          brandId: data.brandId || undefined,
        },
      })

      await prisma.productColor.deleteMany({
        where: {
          productMasterId,
          products: {
            none: {},
          },
        },
      })

      await prisma.productMaster.deleteMany({
        where: {
          productColors: {
            none: {},
          },
        },
      })

      return true
    })
  } catch (error: any) {
    console.log('[HANDLE_FULL_CREATE_PRODUCT_BULK]', error.message)
    return false
  }
}
