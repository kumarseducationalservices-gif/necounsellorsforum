import { ShieldCheck, CheckCircle, Circle } from 'lucide-react'
import { VerificationLevel } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface Props {
  level: VerificationLevel
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function VerificationBadge({ level, size = 'md', showLabel = true }: Props) {
  const configs = {
    establishment_verified: {
      icon: ShieldCheck,
      label: 'Established & Verified',
      bg: 'var(--verified-green-muted)',
      border: 'rgba(34,197,94,0.25)',
      text: '#22C55E',
      glow: true,
    },
    google_verified: {
      icon: CheckCircle,
      label: 'Google Verified',
      bg: 'rgba(74,128,245,0.1)',
      border: 'rgba(74,128,245,0.25)',
      text: '#4A80F5',
      glow: false,
    },
    unverified: {
      icon: Circle,
      label: 'Unverified',
      bg: 'transparent',
      border: 'var(--border)',
      text: 'var(--text-muted)',
      glow: false,
    },
  }

  const c = configs[level]
  const Icon = c.icon
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'
  const padding = size === 'sm' ? 'px-2 py-0.5' : size === 'lg' ? 'px-4 py-1.5' : 'px-2.5 py-1'

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', padding, textSize, c.glow && 'badge-verified')}
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      <Icon size={iconSize} strokeWidth={2} />
      {showLabel && c.label}
    </span>
  )
}
