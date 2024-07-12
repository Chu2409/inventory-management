'use server'

import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const getUserByDni = async (dni: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        dni,
      },
    })

    return user
  } catch (error: any) {
    console.log('[GET_USER_BY_DNI]', error.message)
    return null
  }
}
