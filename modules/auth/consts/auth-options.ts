import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        dni: { label: 'Cédula', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { dni: credentials?.dni },
        })
        if (!user) throw new Error('Usuario no encontrado')

        verify(credentials?.password || '', user.password)

        return {
          id: user.id.toString(),
          name: user.firstName + ' ' + user.lastName,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 28800,
    updateAge: 14400,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
} satisfies NextAuthOptions

const verify = (password: string, hash: string) => {
  const passwordMatch = bcrypt.compareSync(password, hash)

  if (!passwordMatch) throw new Error('Contraseña incorrecta')
}
