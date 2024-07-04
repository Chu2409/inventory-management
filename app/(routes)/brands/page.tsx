import { getBrands } from '@/modules/brands/actions/get-brands'
import { BrandsClient } from '@/modules/brands/components/client'

export const revalidate = 0

const BrandsPage = async () => {
  const brands = await getBrands()

  return <BrandsClient brands={brands} />
}

export default BrandsPage
