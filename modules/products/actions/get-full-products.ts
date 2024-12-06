'use server'

import prisma from '@/lib/prisma'
import { IProduct } from '../types'

export const getFullProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productColor: {
          include: {
            productMaster: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
        size: true,
      },
      orderBy: {
        productColorId: 'desc',
      },
    })

    return products
  } catch (error: any) {
    console.log('[GET_FULL_PRODUCTS]', error.message)
    return []
  }
}
