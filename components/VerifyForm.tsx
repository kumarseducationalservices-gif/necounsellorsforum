'use client'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

type Step = 'form' | 'submitting' | 'success'

export default function VerifyForm() {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState({
    consultancyName: '', city: '', ownerName: '', phone: '', email: '',
    establishedYear: '', planType: 'establishment_verified',
  })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('submitting')
    await new Promise(r => setTimeout(r, 1500))
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
        <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center badge-verified"
          style={{ background: 'var(--verified-green-muted)', border: '1px solid rgba(34,197,94,0.3)' }}>
          <Check size={24} style={{ color: '#22C55E' }} />
        </div>
        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Application Received!</h3>
        <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Our team will contact you at {form.email} with payment details and document upload instructions within 24 hours.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid var(--border)', background: 'var(--surface-2)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none',
  }
  const labelStyle = { fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6, fontWeight: 500 as const }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>

      {/* Plan selector */}
      <div>
        <label style={labelStyle}>Verification Plan *</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'google_verified', label: 'Google Verified', price: '₹1,200/yr', color: '#4A80F5' },
            { value: 'establishment_verified', label: 'Established & Verified', price: '₹3,500/yr', color: '#22C55E' },
          ].map(plan => (
            <button key={plan.value} type="button"
              onClick={() => update('planType', plan.value)}
              className="p-3 rounded-xl text-left transition-all"
              style={{
                border: `1px solid ${form.planType === plan.value ? plan.color + '60' : 'var(--border)'}`,
                background: form.planType === plan.value ? plan.color + '10' : 'var(--surface-2)',
              }}>
              <div className="text-sm font-medium" style={{ color: plan.color }}>{plan.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{plan.price}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Consultancy Name *</label>
          <input required style={inputStyle} placeholder="Your consultancy name"
            value={form.consultancyName} onChange={e => update('consultancyName', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Year Established *</label>
          <input required style={inputStyle} placeholder="e.g. 2015" type="number" min="1990" max="2025"
            value={form.establishedYear} onChange={e => update('establishedYear', e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>City *</label>
          <input required style={inputStyle} placeholder="Guwahati"
            value={form.city} onChange={e => update('city', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Owner / Director Name *</label>
          <input required style={inputStyle} placeholder="Full name"
            value={form.ownerName} onChange={e => update('ownerName', e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Phone *</label>
          <input required style={inputStyle} placeholder="+91 XXXXX XXXXX" type="tel"
            value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Business Email *</label>
          <input required style={inputStyle} placeholder="you@consultancy.com" type="email"
            value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
      </div>

      <button type="submit" disabled={step === 'submitting'}
        className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg, #E8A238, #F5C842)', color: '#0D0F14', opacity: step === 'submitting' ? 0.7 : 1 }}>
        {step === 'submitting'
          ? <><Loader2 size={16} className="animate-spin" /> Submitting...</>
          : 'Apply for Verification'
        }
      </button>
    </form>
  )
}
