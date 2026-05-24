'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShieldCheck, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark border-b' : 'bg-transparent'}`}
      style={{ borderColor: 'var(--ti-border)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#4F46E5,#818CF8)' }}>
            <ShieldCheck size={15} color="white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="font-display font-bold text-sm tracking-tight" style={{ color: 'var(--ti-text)' }}>NECF</span>
            <span className="hidden sm:block text-xs" style={{ color: 'var(--ti-muted)', marginTop: -2 }}>by Sanchaar EduTech</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {[['Find Consultants','/consultants'],['Events','/events'],['Claim Profile','/consultants/claim']].map(([label,href]) => (
            <Link key={href} href={href} className="px-4 py-2 rounded-xl text-sm transition-colors duration-150"
              style={{ color: 'var(--ti-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color='var(--ti-text)')}
              onMouseLeave={e => (e.currentTarget.style.color='var(--ti-muted)')}>
              {label}
            </Link>
          ))}
          <Link href="/consultants/verify"
            className="ml-2 btn-primary text-xs py-2 px-4 rounded-xl"
            style={{ padding: '8px 16px', fontSize: 13 }}>
            Get Verified
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: 'var(--ti-muted)' }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-1 glass-dark"
          style={{ borderColor: 'var(--ti-border)' }}>
          {[['Find Consultants','/consultants'],['Events','/events'],['Claim Profile','/consultants/claim'],['Get Verified','/consultants/verify']].map(([l,h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm" style={{ color: 'var(--ti-muted)' }}>{l}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
