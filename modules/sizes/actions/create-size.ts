'use server'

import prisma from '@/lib/prisma'
import { Size } from '@prisma/client'

interface CreateSizeProps {
  value: string
  categoryId: number
}

export const createSize = async (
  data: CreateSizeProps,
): Promise<Size | null> => {
  try {
    const sizeExists = await prisma.size.findFirst({
      where: {
        value: data.value,
        categoryId: data.categoryId,
      },
    })
    if (sizeExists) throw new Error('Ya existe una talla en esta categoría')

    const size = await prisma.size.create({
      data,
    })

    return size
  } catch (error: any) {
    console.log('[CREATE_SIZE]', error.message)
    return null
  }
}
