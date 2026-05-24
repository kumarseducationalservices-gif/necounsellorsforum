'use client'
import { useRouter, usePathname } from 'next/navigation'

const NE_CITIES = ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Shillong', 'Agartala', 'Imphal', 'Aizawl']
const SPECIALIZATIONS = ['MBBS Abroad', 'Study Abroad', 'Canada', 'UK', 'Australia', 'Russia', 'Germany', 'Scholarship']
const SORT_OPTIONS = [
  { value: '', label: 'Best Match' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
]
const FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'verified', label: 'Established & Verified' },
  { value: 'featured', label: 'Featured' },
]

interface Props {
  params: {
    q?: string; city?: string; sort?: string; filter?: string; specialization?: string
  }
}

export default function ConsultantsFilter({ params }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const update = (key: string, value: string) => {
    const p = new URLSearchParams()
    const merged = { ...params, [key]: value }
    Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v as string) })
    if (!value) p.delete(key)
    router.push(`${pathname}?${p.toString()}`)
  }

  const pillClass = (active: boolean) => ({
    padding: '6px 14px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    border: `1px solid ${active ? 'rgba(232,162,56,0.4)' : 'var(--border)'}`,
    background: active ? 'var(--accent-gold-muted)' : 'var(--surface-1)',
    color: active ? 'var(--accent-gold)' : 'var(--text-secondary)',
    transition: 'all 0.15s',
  })

  return (
    <div className="space-y-3">
      {/* Verification filter */}
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map(opt => (
          <button key={opt.value} style={pillClass(params.filter === opt.value || (!params.filter && opt.value === ''))}
            onClick={() => update('filter', opt.value)}>
            {opt.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Sort:</span>
          {SORT_OPTIONS.map(opt => (
            <button key={opt.value} style={pillClass(params.sort === opt.value || (!params.sort && opt.value === ''))}
              onClick={() => update('sort', opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* City pills */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs py-1.5 px-1" style={{ color: 'var(--text-muted)' }}>City:</span>
        {NE_CITIES.map(city => (
          <button key={city} style={pillClass(params.city === city)}
            onClick={() => update('city', params.city === city ? '' : city)}>
            {city}
          </button>
        ))}
      </div>

      {/* Specialization pills */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs py-1.5 px-1" style={{ color: 'var(--text-muted)' }}>Specialization:</span>
        {SPECIALIZATIONS.map(s => (
          <button key={s} style={pillClass(params.specialization === s)}
            onClick={() => update('specialization', params.specialization === s ? '' : s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
