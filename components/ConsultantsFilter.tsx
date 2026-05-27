'use client'
import { useRouter, usePathname } from 'next/navigation'
import { X, SlidersHorizontal } from 'lucide-react'

const VERIF = [
  { v:'',         label:'All',                  color:'#374151' },
  { v:'verified', label:'✓ Established',         color:'#00875A' },
  { v:'featured', label:'★ Featured',            color:'#D97706' },
]
const CITIES = [
  { v:'Guwahati',  flag:'🏙️' }, { v:'Dibrugarh', flag:'🌿' },
  { v:'Silchar',   flag:'🌊' }, { v:'Shillong',  flag:'⛰️' },
  { v:'Jorhat',    flag:'🍵' }, { v:'Tezpur',    flag:'🌸' },
  { v:'Imphal',    flag:'🎭' }, { v:'Agartala',  flag:'🌺' },
  { v:'Aizawl',   flag:'🏔️' },
]
const COUNTRIES = [
  { v:'Canada',    flag:'🍁' }, { v:'UK',           flag:'🇬🇧' },
  { v:'Australia', flag:'🇦🇺' }, { v:'Germany',      flag:'🇩🇪' },
  { v:'Russia',    flag:'🇷🇺' }, { v:'Philippines',  flag:'🇵🇭' },
  { v:'Bangladesh',flag:'🇧🇩' }, { v:'USA',          flag:'🇺🇸' },
]
const SPECS = ['MBBS Abroad','Study Abroad','IELTS Coaching','Scholarships','Canada','Germany','Nursing','Engineering Abroad']
const SORT  = [{ v:'',label:'Best Match' },{ v:'rating',label:'Top Rated' },{ v:'reviews',label:'Most Reviewed' }]

interface P { params: { q?:string; city?:string; filter?:string; sort?:string; specialization?:string; country?:string } }

export default function ConsultantsFilter({ params }: P) {
  const router = useRouter()
  const path   = usePathname()

  const update = (key: string, value: string) => {
    const p = new URLSearchParams()
    const merged = { ...params, [key]: value }
    Object.entries(merged).forEach(([k,v]) => { if (v) p.set(k, v as string) })
    if (!value) p.delete(key)
    router.push(`${path}?${p.toString()}`)
  }

  const activeCount = [params.filter,params.city,params.sort,params.specialization,params.country].filter(Boolean).length
  const clearAll = () => router.push(path + (params.q ? `?q=${params.q}` : ''))

  // Pill style factory
  const pill = (active: boolean, color = '#374151', bg = '#F3F4F6') => ({
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '6px 13px', borderRadius: 999, fontSize: 12, fontWeight: active ? 600 : 500,
    cursor: 'pointer', border: `1.5px solid ${active ? color : '#E5E7EB'}`,
    background: active ? color+'18' : '#FFFFFF',
    color: active ? color : '#6B7280',
    transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    boxShadow: active ? `0 0 0 3px ${color}15` : '0 1px 2px rgba(0,0,0,0.05)',
  })

  return (
    <div className="rounded-2xl overflow-hidden mb-6"
      style={{ background:'#fff', border:'1px solid var(--border)', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>

      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor:'var(--border)' }}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} style={{ color:'var(--muted)' }} />
          <span className="text-sm font-semibold" style={{ color:'var(--text)' }}>Filter by</span>
          {activeCount > 0 && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{ background:'#4F46E5', color:'white', minWidth:18, textAlign:'center' }}>
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll}
            className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color:'#DC2626' }}>
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Sort */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--muted)' }}>Sort by</div>
          <div className="flex gap-2 flex-wrap">
            {SORT.map(s => (
              <button key={s.v} style={pill(!params.sort && s.v==='' || params.sort===s.v, '#4F46E5')}
                onClick={() => update('sort', s.v)}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Verification */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--muted)' }}>Status</div>
          <div className="flex gap-2 flex-wrap">
            {VERIF.map(f => (
              <button key={f.v} style={pill(!params.filter && f.v==='' || params.filter===f.v, f.color)}
                onClick={() => update('filter', f.v)}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Cities — horizontal scroll */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--muted)' }}>City</div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
            {CITIES.map(c => (
              <button key={c.v} style={pill(params.city===c.v, '#FF5A1F')}
                onClick={() => update('city', params.city===c.v ? '' : c.v)}>
                {c.flag} {c.v}
              </button>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--muted)' }}>Country</div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
            {COUNTRIES.map(c => (
              <button key={c.v} style={pill(params.country===c.v, '#0891B2')}
                onClick={() => update('country', params.country===c.v ? '' : c.v)}>
                {c.flag} {c.v}
              </button>
            ))}
          </div>
        </div>

        {/* Specialization */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--muted)' }}>Specialization</div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
            {SPECS.map(s => (
              <button key={s} style={pill(params.specialization===s, '#7C3AED')}
                onClick={() => update('specialization', params.specialization===s ? '' : s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
