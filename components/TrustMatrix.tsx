import { CheckCircle2, XCircle, Shield, Building2, FileCheck, MapPin, Star, Clock } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getYearsInOperation } from '@/lib/utils'

export default function TrustMatrix({ consultant: c }: { consultant: Consultant }) {
  const years = getYearsInOperation(c.established_year)
  const rows = [
    { label: 'Google Business Verified', status: c.google_verified, icon: Shield, type: 'bool' },
    { label: 'Trade License Verified',   status: c.trade_license_verified, icon: FileCheck, type: 'bool' },
    { label: 'ROC Certificate Verified', status: c.roc_verified, icon: Building2, type: 'bool' },
    { label: 'Office Address Verified',  status: c.office_verified, icon: MapPin, type: 'bool' },
    { label: 'Student Proof Reviews',    status: c.student_proof_reviews, icon: Star, type: 'value' },
    { label: 'Visa Success Reviews',     status: c.visa_success_reviews, icon: CheckCircle2, type: 'value' },
    { label: 'Years in Operation',       status: years ? `${years} Yrs` : 'N/A', icon: Clock, type: 'value' },
  ]
  const boolVerified = [c.google_verified,c.trade_license_verified,c.roc_verified,c.office_verified].filter(Boolean).length
  const score = Math.round((boolVerified/4)*60 + Math.min(c.total_reviews/100,1)*40)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ background: 'var(--gs-sage)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <h3 className="font-display font-bold text-sm text-white">Trust Matrix</h3>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Platform-verified parameters</p>
        </div>
        <div className="text-right">
          <div className="font-display font-extrabold text-2xl text-gold">{score}%</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Trust Score</div>
        </div>
      </div>
      <div className="h-1.5" style={{ background: '#0d2820' }}>
        <div className="h-full transition-all duration-700" style={{ width: `${score}%`,
          background: score>=80 ? 'linear-gradient(90deg,#22C55E,#4ADE80)' : score>=50 ? 'linear-gradient(90deg,#D4AF37,#F0C757)' : '#F87171' }} />
      </div>
      <div style={{ background: 'var(--gs-bg)' }}>
        {rows.map((row, i) => {
          const Icon = row.icon
          return (
            <div key={row.label} className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: i<rows.length-1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: '#F3F4F6' }}>
                  <Icon size={13} style={{ color: '#9CA3AF' }} />
                </div>
                <span className="text-sm" style={{ color: '#6B7280' }}>{row.label}</span>
              </div>
              {row.type === 'bool' ? (
                <div className="flex items-center gap-1.5">
                  {row.status
                    ? <><CheckCircle2 size={15} style={{ color: '#22C55E' }} /><span className="text-sm font-semibold" style={{ color: '#22C55E' }}>Verified</span></>
                    : <><XCircle size={15} style={{ color: '#D1D5DB' }} /><span className="text-sm" style={{ color: '#D1D5DB' }}>Not yet</span></>}
                </div>
              ) : (
                <span className="text-sm font-bold" style={{ color: 'var(--gs-text)' }}>{row.status}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
