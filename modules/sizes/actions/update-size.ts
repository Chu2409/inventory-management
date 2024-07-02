'use server'

import prisma from '@/lib/prisma'
import { Size } from '@prisma/client'

interface UpdateSizeProps {
  id: number
  data: {
    value: string
    categoryId: number
  }
}

export const updateSize = async ({
  id,
  data,
}: UpdateSizeProps): Promise<Size | null> => {
  try {
    const sizeExists = await prisma.size.findFirst({
      where: {
        value: data.value,
        categoryId: data.categoryId,
        AND: {
          NOT: {
            id,
          },
        },
      },
    })
    if (sizeExists) throw new Error('Ya existe una talla en esta categoría')

    const size = await prisma.size.update({
      where: {
        id,
      },
      data,
    })

    return size
  } catch (error: any) {
    console.log('[UPDATE_SIZE]', error.message)
    return null
  }
}
