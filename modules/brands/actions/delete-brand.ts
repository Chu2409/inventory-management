'use server'

import prisma from '@/lib/prisma'

export const deleteBrand = async (id: number) => {
  try {
    const products = await prisma.productMaster.findMany({
      where: {
        brandId: id,
      },
    })

    if (products.length) {
      throw new Error(
        'Elimine los productos asociados a esta marca antes de eliminarla',
      )
    }

    const brand = await prisma.brand.delete({
      where: {
        id,
      },
    })

    return !!brand
  } catch (error: any) {
    console.log('[DELETE_BRAND]', error.message)
    return false
  }
}
