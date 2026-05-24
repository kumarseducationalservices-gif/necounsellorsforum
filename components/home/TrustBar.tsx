import { ShieldCheck, Star, Users, Award } from 'lucide-react'

const stats = [
  { icon: ShieldCheck, value: '500+', label: 'Verified Consultants', color: '#818CF8' },
  { icon: Star, value: '12,000+', label: 'Student Reviews', color: '#FF5A1F' },
  { icon: Users, value: '8 States', label: 'Northeast Coverage', color: '#D4AF37' },
  { icon: Award, value: '100% Free', label: 'For Students', color: '#22C55E' },
]

export default function TrustBar() {
  return (
    <div style={{ background: 'var(--ti-surf)', borderTop: '1px solid var(--ti-border)', borderBottom: '1px solid var(--ti-border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 divide-x"
        style={{ '--tw-divide-opacity': 1, borderColor: 'var(--ti-border)' } as React.CSSProperties}>
        {stats.map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="flex items-center gap-3 px-6 py-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}18` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-none" style={{ color: 'var(--ti-text)' }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--ti-muted)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
