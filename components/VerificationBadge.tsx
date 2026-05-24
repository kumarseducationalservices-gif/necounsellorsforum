import { ShieldCheck, CheckCircle, Circle } from 'lucide-react'
import { VerificationLevel } from '@/lib/supabase'

export default function VerificationBadge({ level, size = 'md', showLabel = true }: { level: VerificationLevel; size?: 'sm'|'md'|'lg'; showLabel?: boolean }) {
  const cfgs = {
    establishment_verified: { icon: ShieldCheck, label: 'Established & Verified', color: '#22C55E', cls: 'green' },
    google_verified:        { icon: CheckCircle, label: 'Google Verified',         color: '#818CF8', cls: '' },
    unverified:             { icon: Circle,      label: 'Unverified',              color: '#64748B', cls: '' },
  }
  const c = cfgs[level]
  const Icon = c.icon
  const iconSize = size==='sm'?11:size==='lg'?16:13
  return (
    <span className={`badge-verified ${c.cls}`} style={{ fontSize: size==='lg'?13:11, padding: size==='lg'?'5px 12px':'4px 10px' }}>
      <Icon size={iconSize} />
      {showLabel && c.label}
    </span>
  )
}
