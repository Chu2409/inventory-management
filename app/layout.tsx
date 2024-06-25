import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'
import { routes } from '@/data/routes'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inventory Management System',
  description: 'A simple inventory management system',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ToasterProvider />
        <Navbar routes={routes} />
        <Container>{children}</Container>
      </body>
    </html>
  )
}

export default RootLayout
