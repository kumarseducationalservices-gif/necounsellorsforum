'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const NE_CITIES = ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Shillong', 'Agartala', 'Imphal', 'Aizawl', 'Kohima', 'Itanagar']

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (city) params.set('city', city)
    router.push(`/consultants?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232,162,56,0.15) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-15"
        style={{ backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(74,128,245,0.2) 0%, transparent 40%)' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 fade-up"
          style={{ background: 'var(--accent-gold-muted)', border: '1px solid rgba(232,162,56,0.2)', color: 'var(--accent-gold)' }}>
          <span className="w-1.5 h-1.5 rounded-full dot-live" style={{ background: 'var(--accent-gold)' }} />
          Northeast India&apos;s Verified Education Platform
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6 fade-up delay-1"
          style={{ color: 'var(--text-primary)' }}>
          Find a Consultant<br />
          <span className="gradient-gold italic">You Can Trust</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl mb-10 mx-auto max-w-2xl fade-up delay-2"
          style={{ color: 'var(--text-secondary)' }}>
          Proof-backed reviews. Legal establishment verification. Real student outcomes.
          Not just listings — a trust ecosystem for Northeast India&apos;s 4M+ college-age youth.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch}
          className="fade-up delay-3 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto p-2 rounded-2xl"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>

          {/* Query input */}
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Consultant name, MBBS, Canada, UK..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>

          {/* City select */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl sm:border-l"
            style={{ borderColor: 'var(--border)' }}>
            <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="bg-transparent text-sm outline-none pr-4 appearance-none cursor-pointer"
              style={{ color: city ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              <option value="">All Cities</option>
              {NE_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={12} style={{ color: 'var(--text-muted)', marginLeft: -12 }} />
          </div>

          {/* Submit */}
          <button type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
            style={{ background: 'linear-gradient(135deg, #E8A238, #F5C842)', color: '#0D0F14' }}>
            Search
          </button>
        </form>

        {/* Quick filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 fade-up delay-4">
          {['MBBS Abroad', 'Canada', 'UK', 'Australia', 'Study in Russia', 'Scholarship'].map(tag => (
            <button
              key={tag}
              onClick={() => router.push(`/consultants?q=${encodeURIComponent(tag)}`)}
              className="px-3 py-1.5 rounded-full text-xs transition-all duration-150 hover:border-opacity-50"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
    </section>
  )
}
