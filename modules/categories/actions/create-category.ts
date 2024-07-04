'use server'

import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

interface CreateCategoryProps {
  name: string
}

export const createCategory = async (
  data: CreateCategoryProps,
): Promise<Category | null> => {
  try {
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: data.name,
      },
    })
    if (categoryExists)
      throw new Error('Ya existe una categoría con este nombre')

    const category = await prisma.category.create({
      data,
    })

    return category
  } catch (error: any) {
    console.log('[CREATE_CATEGORY]', error.message)
    return null
  }
}
