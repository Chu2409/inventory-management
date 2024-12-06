'use server'

import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

interface UpdateCategoryProps {
  id: number
  data: {
    name: string
  }
}

export const updateCategory = async ({
  id,
  data,
}: UpdateCategoryProps): Promise<Category | null> => {
  try {
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: data.name,
        AND: {
          NOT: {
            id,
          },
        },
      },
    })
    if (categoryExists)
      throw new Error('Ya existe una categoría con este nombre')

    const category = await prisma.category.update({
      where: {
        id,
      },
      data,
    })

    return category
  } catch (error: any) {
    console.log('[UPDATE_CATEGORY]', error.message)
    return null
  }
}
