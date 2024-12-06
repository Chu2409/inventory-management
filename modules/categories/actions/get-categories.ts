'use server'

import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    return categories
  } catch (error: any) {
    console.log('[GET_CATEGORIES]', error.message)
    return []
  }
}
