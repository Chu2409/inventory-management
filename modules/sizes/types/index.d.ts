import { Category, Size } from '@prisma/client'

export interface IFullSize extends Size {
  category: Category
}
