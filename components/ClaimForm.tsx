'use client'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

type Step = 'form' | 'submitting' | 'success'

export default function ClaimForm() {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState({
    consultancyName: '',
    city: '',
    yourName: '',
    phone: '',
    email: '',
    role: '',
    message: '',
  })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('submitting')
    // Simulate API call - in production this would insert into Supabase
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
        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Request Submitted!</h3>
        <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
          We&apos;ll review your claim and contact you within 48 hours at {form.email}.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--surface-2)',
    color: 'var(--text-primary)',
    fontSize: 14,
    outline: 'none',
  }

  const labelStyle = { fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6, fontWeight: 500 }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Consultancy Name *</label>
          <input required style={inputStyle} placeholder="e.g. Global Pathways Education"
            value={form.consultancyName} onChange={e => update('consultancyName', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>City *</label>
          <input required style={inputStyle} placeholder="e.g. Guwahati"
            value={form.city} onChange={e => update('city', e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input required style={inputStyle} placeholder="Full name"
            value={form.yourName} onChange={e => update('yourName', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Your Role *</label>
          <select required style={{ ...inputStyle, cursor: 'pointer' }}
            value={form.role} onChange={e => update('role', e.target.value)}>
            <option value="">Select role</option>
            <option>Owner / Founder</option>
            <option>Director</option>
            <option>Manager</option>
            <option>Staff</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Phone *</label>
          <input required style={inputStyle} placeholder="+91 XXXXX XXXXX" type="tel"
            value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input required style={inputStyle} placeholder="you@consultancy.com" type="email"
            value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Additional message (optional)</label>
        <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
          placeholder="Anything you'd like us to know..."
          value={form.message} onChange={e => update('message', e.target.value)} />
      </div>

      <button type="submit" disabled={step === 'submitting'}
        className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #E8A238, #F5C842)', color: '#0D0F14', opacity: step === 'submitting' ? 0.7 : 1 }}>
        {step === 'submitting' ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting...</>
        ) : (
          'Submit Claim Request'
        )}
      </button>

      <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        We verify all claims before granting access. Usually takes 24–48 hours.
      </p>
    </form>
  )
}
