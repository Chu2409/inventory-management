'use server'

import prisma from '@/lib/prisma'

export const deleteSize = async (id: number) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        sizeId: id,
      },
    })

    if (products.length) {
      throw new Error(
        'Elimine los productos asociados a esta talla/tamaño primero',
      )
    }

    const size = await prisma.size.delete({
      where: {
        id,
      },
    })

    return !!size
  } catch (error: any) {
    console.log('[DELETE_SIZE]', error.message)
    return false
  }
}
