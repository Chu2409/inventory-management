import {
  Brand,
  Category,
  Product,
  ProductColor,
  ProductMaster,
  Size,
} from '@prisma/client'

export interface IFullProductMaster extends ProductMaster {
  brand: Brand | null
  category: Category
}

export interface IFullProductColor extends ProductColor {
  productMaster: IFullProductMaster
}

export interface IFullProduct extends Product {
  productColor: IFullProductColor
  size: Size | null
}
