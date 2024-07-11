'use server'

import { Gender } from '@prisma/client'
import { IProductColumn } from '../components/form/data-table'
import { handleJustCreateBulk } from './handle-just-create-bulk'
import { handleFullBulk } from './handle-full-bulk'

export interface CreateProductBulkProps {
  code: string
  name: string
  gender: Gender | null
  brandId: number | null
  categoryId: number
  variations: IProductColumn[]
}

export const createProductBulk = async (
  data: CreateProductBulkProps,
  productMasterId?: number,
): Promise<boolean> => {
  try {
    if (productMasterId) {
      const productsBulk = await handleFullBulk(data, productMasterId)

      return !!productsBulk
    }

    const productsBulk = await handleJustCreateBulk(data)

    return !!productsBulk
  } catch (error: any) {
    console.log('[CREATE_PRODUCT_BULK]', error.message)
    return false
  }
}
