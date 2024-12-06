'use server'

import prisma from '@/lib/prisma'
import { Brand } from '@prisma/client'

interface UpdateBrandProps {
  id: number
  data: {
    name: string
  }
}

export const updateBrand = async ({
  id,
  data,
}: UpdateBrandProps): Promise<Brand | null> => {
  try {
    const brandExists = await prisma.brand.findFirst({
      where: {
        name: data.name,
        AND: {
          NOT: {
            id,
          },
        },
      },
    })
    if (brandExists) throw new Error('Ya existe una marca con este nombre')

    const brand = await prisma.brand.update({
      where: {
        id,
      },
      data,
    })

    return brand
  } catch (error: any) {
    console.log('[UPDATE_BRAND]', error.message)
    return null
  }
}
