import bcrypt from 'bcrypt'

interface User {
  dni: string
  firstName: string
  lastName: string
  password: string
}

export const users: User[] = [
  {
    dni: '0707047643',
    firstName: 'Daniel',
    lastName: 'Zhu',
    password: bcrypt.hashSync('123456', 10),
  },
]
