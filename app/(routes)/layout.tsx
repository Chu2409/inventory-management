import { authOptions } from '@/modules/auth/consts/auth-options'
import { Container } from '@/modules/shared/components/container'
import { Navbar } from '@/modules/shared/components/navbar'
import { routes } from '@/modules/shared/data/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth')

  return (
    <>
      <Navbar routes={routes} />
      <Container>{children}</Container>
    </>
  )
}

export default HomeLayout
