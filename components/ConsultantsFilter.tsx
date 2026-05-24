'use client'
import { useRouter, usePathname } from 'next/navigation'

const NE_CITIES = ['Guwahati','Dibrugarh','Silchar','Jorhat','Shillong','Agartala','Imphal','Aizawl']
const SPECS     = ['MBBS Abroad','Study Abroad','Canada','UK','Australia','Russia','Germany','Scholarship']
const SORT      = [['','Best Match'],['rating','Highest Rated'],['reviews','Most Reviewed']]
const FILTERS   = [['','All'],['verified','Established & Verified'],['featured','Featured']]

interface Props { params: { q?:string; city?:string; sort?:string; filter?:string; specialization?:string } }

export default function ConsultantsFilter({ params }: Props) {
  const router  = useRouter()
  const path    = usePathname()

  const update = (key: string, value: string) => {
    const p = new URLSearchParams()
    const merged = { ...params, [key]: value }
    Object.entries(merged).forEach(([k,v]) => { if (v) p.set(k, v as string) })
    if (!value) p.delete(key)
    router.push(`${path}?${p.toString()}`)
  }

  const pill = (active: boolean, color = '#4F46E5') => ({
    padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer',
    border: `1px solid ${active ? color+'60' : 'var(--ti-border)'}`,
    background: active ? color+'15' : 'var(--ti-surf)',
    color: active ? color : 'var(--ti-muted)',
    transition: 'all 0.15s',
  })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(([v,l]) => (
          <button key={v} style={pill(!params.filter && v==='' || params.filter===v)} onClick={() => update('filter',v)}>{l}</button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs" style={{ color:'var(--ti-muted)' }}>Sort:</span>
          {SORT.map(([v,l]) => (
            <button key={v} style={pill(!params.sort && v==='' || params.sort===v)} onClick={() => update('sort',v)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs py-1.5 px-1" style={{ color:'var(--ti-muted)' }}>City:</span>
        {NE_CITIES.map(c => (
          <button key={c} style={pill(params.city===c,'#FF5A1F')} onClick={() => update('city', params.city===c ? '' : c)}>{c}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs py-1.5 px-1" style={{ color:'var(--ti-muted)' }}>Topic:</span>
        {SPECS.map(s => (
          <button key={s} style={pill(params.specialization===s,'#D4AF37')} onClick={() => update('specialization', params.specialization===s ? '' : s)}>{s}</button>
        ))}
      </div>
    </div>
  )
}
