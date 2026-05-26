'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'

const CITIES   = ['Guwahati','Shillong','Dibrugarh','Silchar','Imphal','Agartala','Aizawl','Jorhat','Tezpur']
const COUNTRIES = ['UK','Canada','Australia','USA','Germany','Russia','Philippines','Bangladesh','France']
const SPECS    = ['MBBS Abroad','Study Abroad','Scholarship','IELTS Coaching','SOP Writing']

type Params = { q?:string; city?:string; state?:string; sort?:string; filter?:string; specialization?:string; country?:string }

export default function ConsultantsFilter({ params }: { params: Params }) {
  const router   = useRouter()
  const path     = usePathname()
  const [open, setOpen]   = useState(false)

  const push = (updates: Partial<Params>) => {
    const merged = { ...params, ...updates }
    const p = new URLSearchParams()
    Object.entries(merged).forEach(([k,v]) => { if (v) p.set(k, String(v)) })
    router.push(`${path}?${p.toString()}`)
  }

  const toggle = (key: keyof Params, val: string) =>
    push({ [key]: params[key] === val ? '' : val })

  const clear = () => router.push(path)

  const hasFilters = !!(params.city || params.filter || params.specialization || params.country || params.sort)

  // ── Pill helpers ──────────────────────────────────────────────────────────
  const verPill = (val: string, label: string, color: string, bg: string, border: string) => {
    const active = params.filter === val || (!params.filter && val === '')
    return (
      <button key={val} onClick={() => push({ filter: val === '' ? '' : val })}
        className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150"
        style={{
          background: active ? bg : 'white',
          color: active ? color : '#6B7280',
          border: `1.5px solid ${active ? border : '#E5E7EB'}`,
          boxShadow: active ? `0 0 0 3px ${border}40` : 'none',
        }}>
        {label}
      </button>
    )
  }

  const cityPill = (city: string) => {
    const active = params.city === city
    return (
      <button key={city} onClick={() => toggle('city', city)}
        className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150"
        style={{
          background: active ? '#FF5A1F' : 'white',
          color: active ? 'white' : '#6B7280',
          border: `1.5px solid ${active ? '#FF5A1F' : '#E5E7EB'}`,
          boxShadow: active ? '0 0 0 3px rgba(255,90,31,0.2)' : 'none',
        }}>
        {city}
      </button>
    )
  }

  return (
    <div className="sticky top-14 z-40 w-full"
      style={{ background:'white', borderBottom:'1px solid #F3F4F6', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Row 1: Verification type + Sort + Filters btn ── */}
        <div className="flex items-center gap-2 py-2.5 overflow-x-auto"
          style={{ scrollbarWidth:'none' }}>

          {verPill('',              'All',                    '#374151', '#F9FAFB',  '#D1D5DB')}
          {verPill('verified',      'Established & Verified', '#065F46', '#D1FAE5',  '#6EE7B7')}
          {verPill('google_verified','Google Verified',        '#4338CA', '#EEF2FF',  '#C7D2FE')}
          {verPill('featured',      '★ Featured',              '#92400E', '#FEF3C7',  '#FCD34D')}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort dropdown */}
          <div className="relative flex-shrink-0">
            <select
              value={params.sort || ''}
              onChange={e => push({ sort: e.target.value })}
              className="appearance-none text-xs font-medium pl-3 pr-7 py-1.5 rounded-full border cursor-pointer outline-none"
              style={{ background:'white', border:'1.5px solid #E5E7EB', color:'#374151' }}>
              <option value="">Best Match</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#9CA3AF' }} />
          </div>

          {/* Filters toggle */}
          <button onClick={() => setOpen(!open)}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
            style={{
              background: open || hasFilters ? '#4F46E5' : 'white',
              color:       open || hasFilters ? 'white'   : '#374151',
              border:      `1.5px solid ${open || hasFilters ? '#4F46E5' : '#E5E7EB'}`,
            }}>
            <SlidersHorizontal size={12} />
            Filters
            {hasFilters && (
              <span className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                style={{ background:'white', color:'#4F46E5' }}>
                {[params.city,params.filter,params.specialization,params.country,params.sort].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Clear all */}
          {hasFilters && (
            <button onClick={clear}
              className="flex-shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full border"
              style={{ color:'#DC2626', borderColor:'#FECACA', background:'#FEF2F2' }}>
              <X size={11} /> Clear
            </button>
          )}
        </div>

        {/* ── Row 2: City pills — always visible ── */}
        <div className="flex gap-1.5 pb-2.5 overflow-x-auto" style={{ scrollbarWidth:'none' }}>
          {CITIES.map(cityPill)}
        </div>

        {/* ── Expanded panel ── */}
        {open && (
          <div className="pb-4 border-t pt-3" style={{ borderColor:'#F3F4F6' }}>

            {/* Country */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:'#9CA3AF' }}>Destination Country</p>
              <div className="flex flex-wrap gap-1.5">
                {COUNTRIES.map(ct => {
                  const active = params.country === ct
                  return (
                    <button key={ct} onClick={() => toggle('country', ct)}
                      className="text-xs font-medium px-2.5 py-1 rounded-full transition-all"
                      style={{
                        background: active ? '#1D4ED8' : '#F1F5F9',
                        color:      active ? 'white'   : '#374151',
                        border:    `1.5px solid ${active ? '#1D4ED8' : '#E2E8F0'}`,
                      }}>
                      {ct}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Specialization */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:'#9CA3AF' }}>Specialization</p>
              <div className="flex flex-wrap gap-1.5">
                {SPECS.map(s => {
                  const active = params.specialization === s
                  return (
                    <button key={s} onClick={() => toggle('specialization', s)}
                      className="text-xs font-medium px-2.5 py-1 rounded-full transition-all"
                      style={{
                        background: active ? '#D4AF37' : '#F1F5F9',
                        color:      active ? 'white'   : '#374151',
                        border:    `1.5px solid ${active ? '#D4AF37' : '#E2E8F0'}`,
                      }}>
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
