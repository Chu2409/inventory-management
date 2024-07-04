import { getCategories } from '@/modules/categories/actions/get-categories'
import { CategoriesClient } from '@/modules/categories/components/client'

export const revalidate = 0

const CategoriesPage = async () => {
  const categories = await getCategories()

  return <CategoriesClient categories={categories} />
}

export default CategoriesPage
