import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'NE Counsellors Forum — Verified Education Consultants in Northeast India',
  description: 'Discover and verify education consultants across Northeast India. Proof-backed reviews, establishment verification, and upcoming education events.',
  keywords: ['education consultants', 'study abroad', 'northeast india', 'assam'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
