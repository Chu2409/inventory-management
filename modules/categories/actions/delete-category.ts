'use server'

import prisma from '@/lib/prisma'

export const deleteCategory = async (id: number) => {
  try {
    const products = await prisma.productMaster.findMany({
      where: {
        categoryId: id,
      },
    })

    if (products.length) {
      throw new Error(
        'Elimine los productos asociados a esta categoría antes de eliminarla',
      )
    }

    const category = await prisma.category.delete({
      where: {
        id,
      },
    })

    return !!category
  } catch (error: any) {
    console.log('[DELETE_CATEGORY]', error.message)
    return false
  }
}
