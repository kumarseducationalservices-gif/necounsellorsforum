import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'NECF — NorthEast Counsellors Forum | Verified Education Consultants',
  description: 'Discover verified education consultants across Northeast India. Proof-backed reviews, establishment verification, and upcoming events — by Sanchaar EduTech Pvt. Ltd.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ overflowX:'hidden' }}>
      <body style={{ overflowX:'hidden' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
