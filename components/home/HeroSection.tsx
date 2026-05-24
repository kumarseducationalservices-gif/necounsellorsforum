'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown, Shield, Star, TrendingUp, ArrowRight } from 'lucide-react'

const NE_STATES = ['Assam','Meghalaya','Manipur','Nagaland','Arunachal Pradesh','Mizoram','Tripura','Sikkim']

const FLOAT_CARDS = [
  { name: 'Global Pathways', city: 'Guwahati', rating: 4.8, badge: 'Top Rated', reviews: 127 },
  { name: 'NE Overseas', city: 'Dibrugarh', rating: 4.6, badge: 'Established', reviews: 89 },
  { name: 'Dream Destinations', city: 'Shillong', rating: 4.3, badge: 'Verified', reviews: 43 },
]

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [state, setState] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (query) p.set('q', query)
    if (state) p.set('state', state)
    router.push(`/consultants?${p.toString()}`)
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden section-dark">

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 floating"
          style={{ background: 'radial-gradient(circle,#4F46E5,transparent)', top: '-10%', left: '20%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 floating"
          style={{ background: 'radial-gradient(circle,#818CF8,transparent)', bottom: '10%', right: '15%', animationDelay: '2s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 floating"
          style={{ background: 'radial-gradient(circle,#FF5A1F,transparent)', bottom: '20%', left: '5%', animationDelay: '1s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(var(--ti-text) 1px,transparent 1px),linear-gradient(90deg,var(--ti-text) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div>
            {/* Tag */}
            <div className={`inline-flex items-center gap-2 mb-6 ${mounted ? 'fade-up' : 'opacity-0'}`}>
              <span className="badge-verified">
                <span className="w-1.5 h-1.5 rounded-full dot-live" style={{ background: '#818CF8' }} />
                Northeast India&apos;s Trust Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className={`font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 ${mounted ? 'fade-up delay-1' : 'opacity-0'}`}
              style={{ color: 'var(--ti-text)' }}>
              Real Reviews.<br />
              <span className="text-indigo">Verified</span><br />
              Consultants.
            </h1>

            <p className={`text-lg mb-8 max-w-md leading-relaxed ${mounted ? 'fade-up delay-2' : 'opacity-0'}`}
              style={{ color: 'var(--ti-muted)' }}>
              See the proof before you trust the profile. 500+ consultants across 8 Northeast Indian states — rated by real students.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch}
              className={`flex flex-col sm:flex-row gap-2 p-2 rounded-2xl mb-6 ${mounted ? 'fade-up delay-3' : 'opacity-0'}`}
              style={{ background: 'var(--ti-surf)', border: '1px solid var(--ti-border)' }}>
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={15} style={{ color: 'var(--ti-muted)' }} />
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="MBBS abroad, Canada, UK consultants..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--ti-text)' }} />
              </div>
              <div className="flex items-center gap-1.5 px-3 sm:border-l"
                style={{ borderColor: 'var(--ti-border)' }}>
                <MapPin size={13} style={{ color: 'var(--ti-muted)' }} />
                <select value={state} onChange={e => setState(e.target.value)}
                  className="bg-transparent text-sm outline-none appearance-none cursor-pointer pr-2"
                  style={{ color: state ? 'var(--ti-text)' : 'var(--ti-muted)' }}>
                  <option value="">All States</option>
                  {NE_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: 12, fontSize: 13 }}>
                Search
              </button>
            </form>

            {/* Quick tags */}
            <div className={`flex flex-wrap gap-2 mb-8 ${mounted ? 'fade-up delay-4' : 'opacity-0'}`}>
              {['MBBS Abroad','Canada','UK','Australia','Study in Russia','Scholarship Hunt'].map(tag => (
                <button key={tag} onClick={() => router.push(`/consultants?q=${encodeURIComponent(tag)}`)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                  style={{ background: 'var(--ti-surf2)', border: '1px solid var(--ti-border)', color: 'var(--ti-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,70,229,0.4)'; e.currentTarget.style.color = 'var(--ti-text)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ti-border)'; e.currentTarget.style.color = 'var(--ti-muted)' }}>
                  {tag}
                </button>
              ))}
            </div>

            {/* Stats row */}
            <div className={`grid grid-cols-3 gap-4 ${mounted ? 'fade-up delay-5' : 'opacity-0'}`}>
              {[
                { icon: Shield, value: '500+', label: 'Verified Profiles', color: '#818CF8' },
                { icon: Star, value: '12K+', label: 'Student Reviews', color: '#FF5A1F' },
                { icon: TrendingUp, value: '8 States', label: 'Covered', color: '#D4AF37' },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-display font-bold mb-0.5" style={{ color }}>{value}</div>
                  <div className="text-xs" style={{ color: 'var(--ti-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating consultant cards */}
          <div className="hidden lg:flex flex-col gap-4 relative">
            {FLOAT_CARDS.map((card, i) => (
              <div key={card.name}
                className="card-dark p-4 flex items-center gap-4 floating"
                style={{
                  animationDelay: `${i * 0.7}s`,
                  marginLeft: i === 1 ? '40px' : i === 2 ? '80px' : '0px',
                  maxWidth: 320,
                }}>
                {/* Avatar */}
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold font-display"
                  style={{ background: 'linear-gradient(135deg,#4F46E5,#818CF8)', color: 'white' }}>
                  {card.name.split(' ').map((w: string) => w[0]).join('').slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: 'var(--ti-text)' }}>{card.name}</div>
                  <div className="text-xs" style={{ color: 'var(--ti-muted)' }}>{card.city}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold" style={{ color: 'var(--ti-text)' }}>{card.rating}</span>
                  </div>
                  <span className="badge-verified text-[10px] px-1.5 py-0.5 shimmer-badge">{card.badge}</span>
                </div>
              </div>
            ))}

            {/* Trust indicator */}
            <div className="card-dark p-4 mt-2" style={{ maxWidth: 280, marginLeft: 20 }}>
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--ti-muted)' }}>TRUST SCORE BREAKDOWN</div>
              {[['Legal Docs','92%','#22C55E'],['Student Reviews','87%','#818CF8'],['Visa Outcomes','78%','#D4AF37']].map(([label,pct,color]) => (
                <div key={label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--ti-muted)' }}>
                    <span>{label}</span><span style={{ color }}>{pct}</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: 'var(--ti-surf2)' }}>
                    <div className="h-full rounded-full" style={{ width: pct, background: color, transition: 'width 1s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(transparent,var(--ti-bg))' }} />
    </section>
  )
}
