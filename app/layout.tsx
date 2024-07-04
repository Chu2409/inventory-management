import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'
import AuthProvider from '@/providers/auth-provider'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inventory Management System',
  description: 'A simple inventory management system',
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await getServerSession()

  return (
    <html lang='es'>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ToasterProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
