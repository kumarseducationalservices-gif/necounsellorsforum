'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Bell, Menu, X, ShieldCheck } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-dark">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <ShieldCheck size={22} style={{ color:'#00875A' }} strokeWidth={2.5} />
          <span className="font-display font-bold text-base tracking-tight" style={{ color:'#F1F5F9' }}>
            NECF
          </span>
        </Link>

        {/* Search bar — hidden on mobile */}
        <Link href="/consultants"
          className="hidden md:flex flex-1 max-w-xs items-center gap-2 px-3 py-2 rounded-lg text-sm"
          style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8' }}>
          <Search size={14} />
          Search consultants...
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-1">
          <Link href="/consultants" className="p-2 rounded-lg md:hidden" style={{ color:'#94A3B8' }}>
            <Search size={20} />
          </Link>
          <Link href="/consultants/claim"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background:'rgba(79,70,229,0.15)', color:'#818CF8', border:'1px solid rgba(79,70,229,0.25)' }}>
            For Consultants
          </Link>
          <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} style={{ color:'#94A3B8' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ background:'var(--nav-bg)', borderColor:'var(--nav-border)' }}>
          {[['Find Consultants','/consultants'],['Events','/events'],['Claim Profile','/consultants/claim'],['Get Verified','/consultants/verify']].map(([l,h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm" style={{ color:'#94A3B8' }}>{l}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
