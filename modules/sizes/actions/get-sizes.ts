'use server'

import prisma from '@/lib/prisma'
import { IFullSize } from '../types'

export const getSizes = async (categoryId?: number): Promise<IFullSize[]> => {
  try {
    const sizes = await prisma.size.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        categoryId: 'desc',
      },
      include: {
        category: true,
      },
    })

    return sizes
  } catch (error: any) {
    console.log('[GET_SIZES]', error.message)
    return []
  }
}
