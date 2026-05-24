'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShieldCheck } from 'lucide-react'

const links = [
  { href: '/consultants', label: 'Find Consultants' },
  { href: '/events', label: 'Events' },
  { href: '/consultants/claim', label: 'Claim Profile' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #E8A238 0%, #F5C842 100%)' }}>
            <ShieldCheck size={16} color="#0D0F14" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
            NE Counsellors Forum
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-lg text-sm transition-colors duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              {l.label}
            </Link>
          ))}
          <Link href="/consultants/verify"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)', border: '1px solid rgba(232,162,56,0.2)' }}>
            Get Verified
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: 'var(--text-secondary)' }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-1" style={{ borderColor: 'var(--border)', background: 'var(--surface-1)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm"
              style={{ color: 'var(--text-secondary)' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/consultants/verify" onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg text-sm font-medium text-center"
            style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)' }}>
            Get Verified
          </Link>
        </div>
      )}
    </nav>
  )
}
