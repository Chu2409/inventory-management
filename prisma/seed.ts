import { PrismaClient } from '@prisma/client'
import {
  brands,
  categories,
  productColors,
  productMasters,
  products,
  sizes,
} from './data'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.category.createMany({
    data: categories,
  })

  await prisma.brand.createMany({
    data: brands,
  })

  await prisma.size.createMany({
    data: sizes,
  })

  await prisma.productMaster.createMany({
    data: productMasters,
  })

  await prisma.productColor.createMany({
    data: productColors,
  })

  await prisma.product.createMany({
    data: products,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })
