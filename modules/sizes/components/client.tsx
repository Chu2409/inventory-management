import { DataTable } from '@/modules/shared/components/data-table'
import { Header } from '@/modules/shared/components/header'
import { sizesColumns } from './columns'
import { IFullSize } from '../types'
import { Filter } from '@/modules/shared/components/filter'
import { Category } from '@prisma/client'
import { FilterValue } from '@/modules/shared/types'

interface SizesClientProps {
  sizes: IFullSize[]
  categories: Category[]
  categoryId?: number
}

export const SizesClient: React.FC<SizesClientProps> = ({
  sizes,
  categories,
  categoryId,
}) => {
  const values: FilterValue[] = categories.map((category) => ({
    id: category.id,
    value: category.name,
  }))

  return (
    <>
      <Header
        title='Tallas/Tamaños'
        description='Administra las tallas o tamaños para tus productos'
        buttonLabel='Nuevo Talla/Tamaño'
      />

      <div className='my-4'>
        <Filter
          data={values}
          baseRoute='/sizes'
          paramKey='categoryId'
          selectedId={categoryId}
          placeholder='Selecciona una categoría...'
          notFoundMessage='No se encontraron categorías'
        />
      </div>

      <DataTable columns={sizesColumns} data={sizes} />
    </>
  )
}
