'use server'

import prisma from '@/lib/prisma'
import { Brand } from '@prisma/client'

interface CreateBrandProps {
  name: string
}

export const createBrand = async (
  data: CreateBrandProps,
): Promise<Brand | null> => {
  try {
    const brandExists = await prisma.brand.findFirst({
      where: {
        name: data.name,
      },
    })
    if (brandExists) throw new Error('Ya existe una marca con este nombre')

    const brand = await prisma.brand.create({
      data,
    })

    return brand
  } catch (error: any) {
    console.log('[CREATE_BRAND]', error.message)
    return null
  }
}
