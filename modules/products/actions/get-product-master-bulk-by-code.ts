'use server'

import prisma from '@/lib/prisma'
import { IProductMasterBulk } from '../types'

export const getProductMasterBulkByCode = async (
  code: string,
): Promise<IProductMasterBulk | null> => {
  try {
    const productMaster = await prisma.productMaster.findFirst({
      where: {
        code: {
          equals: code,
          mode: 'insensitive',
        },
      },
      include: {
        productColors: {
          include: {
            products: {
              include: {
                size: true,
              },
            },
          },
        },
      },
    })

    return productMaster
  } catch (error: any) {
    console.log('[GET_PRODUCT_MASTER_BULK_BY_NAME]', error.message)
    return null
  }
}
