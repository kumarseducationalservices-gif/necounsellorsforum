'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

const CATEGORIES = [
  { icon:'🩺', label:'MBBS Abroad',  q:'MBBS Abroad' },
  { icon:'🍁', label:'Canada',        q:'Canada' },
  { icon:'🇬🇧', label:'UK',            q:'UK' },
  { icon:'🇩🇪', label:'Germany',       q:'Germany' },
  { icon:'🇦🇺', label:'Australia',     q:'Australia' },
  { icon:'🏆', label:'Scholarships',  q:'Scholarship' },
]

export default function HeroSection() {
  const router = useRouter()
  const [q, setQ] = useState('')

  return (
    <section className="pt-14 section-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Heading */}
        <h1 className="font-display font-bold text-2xl text-center mb-1" style={{ color:'var(--text)' }}>
          Find verified consultants
        </h1>
        <p className="text-sm text-center mb-5" style={{ color:'var(--muted)' }}>
          Real reviews from real students across Northeast India
        </p>

        {/* Search bar */}
        <form onSubmit={e => { e.preventDefault(); if(q.trim()) router.push(`/consultants?q=${encodeURIComponent(q)}`) }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl mb-6"
          style={{ background:'var(--surface)', border:'1.5px solid var(--border)', boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
          <Search size={16} style={{ color:'var(--muted)' }} />
          <input value={q} onChange={e => setQ(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color:'var(--text)' }}
            placeholder="Consultant name, MBBS, Canada, UK..." />
          <button type="submit" className="btn-dark" style={{ padding:'7px 16px', fontSize:13, borderRadius:8 }}>
            Search
          </button>
        </form>

        {/* What are you looking for */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color:'var(--text)' }}>What are you looking for?</span>
          <a href="/consultants" className="text-xs font-medium" style={{ color:'var(--indigo)' }}>See more</a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {CATEGORIES.map(cat => (
            <a key={cat.q} href={`/consultants?q=${encodeURIComponent(cat.q)}`}
              className="cat-pill">
              <span style={{ fontSize:22 }}>{cat.icon}</span>
              <span className="text-xs font-medium text-center leading-tight" style={{ color:'var(--text)' }}>
                {cat.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
