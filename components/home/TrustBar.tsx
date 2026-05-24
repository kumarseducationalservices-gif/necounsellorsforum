import { ShieldCheck, Star, Users, Award } from 'lucide-react'

const stats = [
  { icon: ShieldCheck, label: 'Verified Consultants', value: '50+' },
  { icon: Star, label: 'Proof-Backed Reviews', value: '1,200+' },
  { icon: Users, label: 'Students Helped', value: '8,000+' },
  { icon: Award, label: 'Years of Trust', value: 'Since 2024' },
]

export default function TrustBar() {
  return (
    <div className="border-y" style={{ borderColor: 'var(--border)', background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-px"
        style={{ background: 'var(--border)' }}>
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-6 py-4"
            style={{ background: 'var(--surface-1)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent-gold-muted)' }}>
              <Icon size={16} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <div>
              <div className="text-lg font-bold leading-none" style={{ color: 'var(--text-primary)' }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
