import { getBrands } from '@/modules/brands/actions/get-brands'
import { getCategories } from '@/modules/categories/actions/get-categories'
import { getFullProducts } from '@/modules/products/actions/get-full-products'
import { ProductsClient } from '@/modules/products/components/client'

export const revalidate = 0

const ProductsPage = async () => {
  const brands = await getBrands()
  const categories = await getCategories()
  const fullProducts = await getFullProducts()

  return (
    <ProductsClient
      products={fullProducts}
      brands={brands}
      categories={categories}
    />
  )
}

export default ProductsPage
