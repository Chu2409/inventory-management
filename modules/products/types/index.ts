import {
  Brand,
  Category,
  Product,
  ProductColor,
  ProductMaster,
  Size,
} from '@prisma/client'

export interface IProductMaster extends ProductMaster {
  brand: Brand | null
  category: Category
}

export interface IProductColor extends ProductColor {
  productMaster: IProductMaster
}

export interface IProduct extends Product {
  productColor: IProductColor
  size: Size | null
}

// Bulk types

interface IProductBulk extends Product {
  size: Size | null
}

export interface IProductColorBulk extends ProductColor {
  products: IProductBulk[]
}

export interface IProductMasterBulk extends ProductMaster {
  productColors: IProductColorBulk[]
}

// Bulk columns type
export interface IProductTable extends Product {
  productColor: ProductColor
  size: Size | null
}
