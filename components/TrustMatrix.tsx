import { CheckCircle2, XCircle, Shield, Building2, FileCheck, MapPin, Star, Award, Clock } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getYearsInOperation } from '@/lib/utils'

export default function TrustMatrix({ consultant: c }: { consultant: Consultant }) {
  const years = getYearsInOperation(c.established_year)
  const bools = [c.google_verified, c.trade_license_verified, c.roc_verified, c.office_verified]
  const score = Math.round((bools.filter(Boolean).length/4)*60 + Math.min(c.total_reviews/100,1)*40)
  const scoreColor = score>=80 ? '#00875A' : score>=50 ? '#D4AF37' : '#DC2626'

  const rows = [
    { label:'Google Business Verified', val:c.google_verified,        type:'bool', icon:Shield },
    { label:'Trade License Verified',   val:c.trade_license_verified, type:'bool', icon:FileCheck },
    { label:'ROC Certificate',          val:c.roc_verified,           type:'bool', icon:Building2 },
    { label:'Office Address Verified',  val:c.office_verified,        type:'bool', icon:MapPin },
    { label:'Student Proof Reviews',    val:c.student_proof_reviews,  type:'val',  icon:Star },
    { label:'Visa Success Reviews',     val:c.visa_success_reviews,   type:'val',  icon:CheckCircle2 },
    { label:'Years in Operation',       val:years?`${years} Yrs`:'N/A', type:'val', icon:Clock },
  ]

  return (
    <div className="tp-card overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ background:'var(--surface-2)', borderBottom:'1px solid var(--border)' }}>
        <div>
          <h3 className="font-semibold text-sm" style={{ color:'var(--text)' }}>Trust Matrix</h3>
          <p className="text-xs" style={{ color:'var(--muted)' }}>Platform-verified parameters</p>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-2xl" style={{ color:scoreColor }}>{score}%</div>
          <div className="text-xs" style={{ color:'var(--muted)' }}>Trust Score</div>
        </div>
      </div>
      <div className="px-4 py-2" style={{ borderBottom:'1px solid var(--border)' }}>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'var(--surface-2)' }}>
          <div className="h-full rounded-full" style={{ width:`${score}%`, background:scoreColor }} />
        </div>
      </div>
      {rows.map((row,i) => {
        const Icon = row.icon
        return (
          <div key={row.label} className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom:i<rows.length-1?'1px solid var(--border)':'none' }}>
            <div className="flex items-center gap-2.5">
              <Icon size={13} style={{ color:'var(--muted)' }} />
              <span className="text-sm" style={{ color:'var(--muted)' }}>{row.label}</span>
            </div>
            {row.type==='bool'
              ? row.val
                ? <div className="flex items-center gap-1"><CheckCircle2 size={13} style={{color:'#00875A'}}/><span className="text-sm font-semibold" style={{color:'#00875A'}}>Verified</span></div>
                : <div className="flex items-center gap-1"><XCircle size={13} style={{color:'#D1D5DB'}}/><span className="text-sm" style={{color:'var(--muted)'}}>Not yet</span></div>
              : <span className="font-semibold text-sm" style={{ color:'var(--text)' }}>{row.val as string}</span>
            }
          </div>
        )
      })}
    </div>
  )
}
