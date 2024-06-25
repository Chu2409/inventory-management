import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { ToasterProvider } from '@/providers/toast-provider'
import { routes } from '@/data/routes'

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
        {children}
      </body>
    </html>
  )
}

export default RootLayout
