import { CheckCircle2, XCircle, Shield, Building2, FileCheck, MapPin, Star, Award, Clock } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getYearsInOperation } from '@/lib/utils'

interface Props {
  consultant: Consultant
}

interface TrustRow {
  label: string
  status: boolean | string | number
  icon: React.ElementType
  type?: 'bool' | 'value'
}

export default function TrustMatrix({ consultant: c }: Props) {
  const years = getYearsInOperation(c.established_year)

  const rows: TrustRow[] = [
    { label: 'Google Business Verified', status: c.google_verified, icon: Shield, type: 'bool' },
    { label: 'Trade License Verified', status: c.trade_license_verified, icon: FileCheck, type: 'bool' },
    { label: 'ROC Certificate Verified', status: c.roc_verified, icon: Building2, type: 'bool' },
    { label: 'Office Address Verified', status: c.office_verified, icon: MapPin, type: 'bool' },
    { label: 'Student Proof Reviews', status: c.student_proof_reviews, icon: Star, type: 'value' },
    { label: 'Visa Success Reviews', status: c.visa_success_reviews, icon: CheckCircle2, type: 'value' },
    { label: 'Years in Operation', status: years ? `${years} Years` : 'N/A', icon: Clock, type: 'value' },
  ]

  const verifiedCount = [c.google_verified, c.trade_license_verified, c.roc_verified, c.office_verified].filter(Boolean).length
  const trustScore = Math.round((verifiedCount / 4) * 60 + Math.min(c.total_reviews / 100, 1) * 40)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Trust Matrix</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Platform-verified parameters</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-gold">{trustScore}%</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Trust Score</div>
        </div>
      </div>

      {/* Score bar */}
      <div className="px-6 py-3" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)' }}>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-3)' }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${trustScore}%`,
              background: trustScore >= 80
                ? 'linear-gradient(90deg, #22C55E, #4ADE80)'
                : trustScore >= 50
                  ? 'linear-gradient(90deg, #E8A238, #F5C842)'
                  : 'linear-gradient(90deg, #F87171, #FB923C)',
            }} />
        </div>
      </div>

      {/* Rows */}
      <div style={{ background: 'var(--surface-1)' }}>
        {rows.map((row, i) => {
          const Icon = row.icon
          const isBool = row.type === 'bool'
          const boolVal = isBool ? (row.status as boolean) : null

          return (
            <div key={row.label}
              className="flex items-center justify-between px-6 py-3.5"
              style={{
                borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--surface-2)' }}>
                  <Icon size={13} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
              </div>

              {isBool ? (
                <div className="flex items-center gap-1.5">
                  {boolVal ? (
                    <>
                      <CheckCircle2 size={15} style={{ color: '#22C55E' }} />
                      <span className="text-sm font-medium" style={{ color: '#22C55E' }}>Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={15} style={{ color: 'var(--text-muted)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Not yet</span>
                    </>
                  )}
                </div>
              ) : (
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {row.status}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
