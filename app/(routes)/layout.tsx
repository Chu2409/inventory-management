import { Container } from '@/modules/shared/components/container'
import { Navbar } from '@/modules/shared/components/navbar'
import { routes } from '@/modules/shared/data/routes'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerSession(authOptions)

  // if (!session) redirect('/auth/login')

  return (
    <>
      <Navbar routes={routes} />
      <Container>{children}</Container>
    </>
  )
}

export default HomeLayout
