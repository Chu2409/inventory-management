'use server'

import prisma from '@/lib/prisma'
import { IFullProduct } from '../types'

export const getFullProducts = async (): Promise<IFullProduct[]> => {
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
