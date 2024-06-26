import { getCategories } from '@/modules/categories/actions/get-categories'
import { getSizes } from '@/modules/sizes/actions/get-sizes'
import { SizesClient } from '@/modules/sizes/components/client'
import { redirect } from 'next/navigation'

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

  if (
    categoryId != null &&
    !categories.some((category) => category.id === categoryId)
  ) {
    redirect('/sizes')
  }
  const values = categories.map((category) => ({
    id: category.id,
    value: category.name,
  }))

  return (
    <SizesClient sizes={sizes} categories={values} categoryId={categoryId} />
  )
}

export default SizesPage
