import { getCategories } from '@/modules/categories/actions/get-categories'
import { getSizes } from '@/modules/sizes/actions/get-sizes'
import { SizesClient } from '@/modules/sizes/components/client'

export const revalidate = 0

const SizesPage = async ({
  searchParams,
}: {
  searchParams: {
    categoryId: string
  }
}) => {
  const categoryId = Number(searchParams.categoryId) || undefined

  const sizes = await getSizes(categoryId)
  const categories = await getCategories()

  return (
    <SizesClient
      sizes={sizes}
      categories={categories}
      categoryId={categoryId}
    />
  )
}

export default SizesPage
