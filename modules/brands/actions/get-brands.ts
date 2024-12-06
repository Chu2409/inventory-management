'use server'

import prisma from '@/lib/prisma'
import { Brand } from '@prisma/client'

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    return brands
  } catch (error: any) {
    console.log('[GET_BRANDS]', error.message)
    return []
  }
}
