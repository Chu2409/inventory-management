import { Color, Gender } from '@prisma/client'

interface ProductMaster {
  code: string
  name: string
  gender?: Gender
  brandId?: number
  categoryId: number
}

interface ProductColor {
  color: Color
  images: string[]
  productMasterId: number
}

interface Product {
  price: number
  stock: number
  productColorId: number
  sizeId?: number
}

export const productMasters: ProductMaster[] = [
  {
    code: 'C21',
    name: 'T-shirt',
    gender: Gender.UNISEX,
    brandId: 1,
    categoryId: 1,
  },
  {
    code: 'P32',
    name: 'Pants',
    gender: Gender.HOMBRE,
    brandId: 2,
    categoryId: 2,
  },
  {
    code: 'Z231',
    name: 'Shoes',
    gender: Gender.MUJER,
    brandId: 3,
    categoryId: 3,
  },
]

export const productColors: ProductColor[] = [
  {
    color: Color.NEGRO,
    images: [],
    productMasterId: 1,
  },
  {
    color: Color.BLANCO,
    images: [],
    productMasterId: 1,
  },
  {
    color: Color.ROJO,
    images: [],
    productMasterId: 2,
  },
  {
    color: Color.VERDE,
    images: [],
    productMasterId: 2,
  },
  {
    color: Color.AZUL,
    images: [],
    productMasterId: 3,
  },
  {
    color: Color.AMARILLO,
    images: [],
    productMasterId: 3,
  },
]

export const products: Product[] = [
  {
    price: 34,
    stock: 4,
    productColorId: 1,
    sizeId: 1,
  },
  {
    price: 34,
    stock: 2,
    productColorId: 1,
    sizeId: 4,
  },
  {
    price: 34,
    stock: 3,
    productColorId: 1,
    sizeId: 3,
  },
  {
    price: 38,
    stock: 6,
    productColorId: 2,
    sizeId: 2,
  },
  {
    price: 38,
    stock: 1,
    productColorId: 2,
    sizeId: 5,
  },
  {
    price: 38,
    stock: 2,
    productColorId: 2,
    sizeId: 6,
  },

  {
    price: 42,
    stock: 2,
    productColorId: 3,
    sizeId: 7,
  },
  {
    price: 42,
    stock: 3,
    productColorId: 3,
    sizeId: 8,
  },
  {
    price: 42,
    stock: 3,
    productColorId: 3,
    sizeId: 9,
  },
  {
    price: 44,
    stock: 2,
    productColorId: 4,
    sizeId: 10,
  },
  {
    price: 44,
    stock: 2,
    productColorId: 4,
    sizeId: 11,
  },
  {
    price: 44,
    stock: 3,
    productColorId: 4,
    sizeId: 12,
  },

  {
    price: 50,
    stock: 3,
    productColorId: 5,
    sizeId: 17,
  },
  {
    price: 50,
    stock: 1,
    productColorId: 5,
    sizeId: 18,
  },
  {
    price: 50,
    stock: 2,
    productColorId: 5,
    sizeId: 19,
  },
  {
    price: 48,
    stock: 3,
    productColorId: 6,
    sizeId: 20,
  },
  {
    price: 48,
    stock: 1,
    productColorId: 6,
    sizeId: 21,
  },
  {
    price: 48,
    stock: 2,
    productColorId: 6,
    sizeId: 22,
  },
]
