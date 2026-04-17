import type { Metadata } from 'next'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Flowk', template: '%s · Flowk' },
  description: 'Finance, clearly. Track income, expenses, and debts with full traceability.',
  icons: {
    icon: [
      { url: '/flowk-favicon-32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/flowk-apple-touch-180.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}