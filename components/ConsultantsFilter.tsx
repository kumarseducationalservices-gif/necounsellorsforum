'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'

const VERIF    = [{ v:'',label:'All',color:'#374151'},{ v:'verified',label:'✓ Established',color:'#00875A'},{ v:'featured',label:'★ Featured',color:'#D97706'}]
const CITIES   = [{ v:'Guwahati',f:'🏙️'},{ v:'Dibrugarh',f:'🌿'},{ v:'Silchar',f:'🌊'},{ v:'Shillong',f:'⛰️'},{ v:'Jorhat',f:'🍵'},{ v:'Tezpur',f:'🌸'},{ v:'Imphal',f:'🎭'},{ v:'Agartala',f:'🌺'},{ v:'Aizawl',f:'🏔️'}]
const COUNTRIES= [{ v:'Canada',f:'🍁'},{ v:'UK',f:'🇬🇧'},{ v:'Australia',f:'🇦🇺'},{ v:'Germany',f:'🇩🇪'},{ v:'Russia',f:'🇷🇺'},{ v:'Philippines',f:'🇵🇭'},{ v:'Bangladesh',f:'🇧🇩'},{ v:'USA',f:'🇺🇸'}]
const SPECS    = ['MBBS Abroad','Study Abroad','IELTS Coaching','Scholarships','Canada','Germany','Nursing','Engineering Abroad']
const SORT     = [{ v:'',l:'Best Match'},{ v:'rating',l:'Top Rated'},{ v:'reviews',l:'Most Reviewed'}]

interface P { params: { q?:string; city?:string; filter?:string; sort?:string; specialization?:string; country?:string } }

function Pill({ label, active, color='#374151', onClick }: { label:string; active:boolean; color?:string; onClick:()=>void }) {
  return (
    <motion.button
      onClick={onClick}
      layout
      whileHover={{ scale:1.04 }} whileTap={{ scale:0.94 }}
      animate={{
        background: active ? color+'18' : '#FFFFFF',
        borderColor: active ? color : '#E5E7EB',
        color: active ? color : '#6B7280',
        boxShadow: active ? `0 0 0 3px ${color}15` : '0 1px 2px rgba(0,0,0,0.05)',
      }}
      transition={{ duration:0.15 }}
      style={{ padding:'5px 12px', borderRadius:999, fontSize:12, fontWeight: active ? 600 : 500,
        cursor:'pointer', border:'1.5px solid', whiteSpace:'nowrap', flexShrink:0 }}>
      {label}
    </motion.button>
  )
}

function Section({ title, children, defaultOpen=true }: { title:string; children:React.ReactNode; defaultOpen?:boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button onClick={() => setOpen(!open)}
        style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%',
          background:'none', border:'none', cursor:'pointer', padding:'0 0 8px' }}>
        <span style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#9CA3AF' }}>
          {title}
        </span>
        {open ? <ChevronUp size={13} style={{ color:'#9CA3AF' }} /> : <ChevronDown size={13} style={{ color:'#9CA3AF' }} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.25, ease:[0.23,1,0.32,1] }}
            style={{ overflow:'hidden' }}>
            <div style={{ paddingBottom:16 }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ConsultantsFilter({ params }: P) {
  const router = useRouter()
  const path   = usePathname()

  const update = (key: string, value: string) => {
    const p = new URLSearchParams()
    const m = { ...params, [key]: value }
    Object.entries(m).forEach(([k,v]) => { if (v) p.set(k, v as string) })
    if (!value) p.delete(key)
    router.push(`${path}?${p.toString()}`)
  }

  const activeCount = [params.filter,params.city,params.sort,params.specialization,params.country].filter(Boolean).length
  const clearAll = () => router.push(path + (params.q ? `?q=${params.q}` : ''))

  const scrollStyle = { display:'flex', gap:6, overflowX:'auto' as const, paddingBottom:4, scrollbarWidth:'none' as const }

  return (
    <LayoutGroup>
      <motion.div
        initial={{ opacity:0, x:-20 }}
        animate={{ opacity:1, x:0 }}
        transition={{ duration:0.45, ease:[0.23,1,0.32,1] }}
        style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:16,
          boxShadow:'0 1px 4px rgba(0,0,0,0.06)', overflow:'hidden' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 16px 12px', borderBottom:'1px solid #F3F4F6' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <SlidersHorizontal size={14} style={{ color:'#9CA3AF' }} />
            <span style={{ fontSize:13.5, fontWeight:700, color:'#111827' }}>Filters</span>
            <AnimatePresence>
              {activeCount > 0 && (
                <motion.span
                  initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
                  exit={{ scale:0, opacity:0 }} transition={{ type:'spring', stiffness:400, damping:20 }}
                  style={{ fontSize:10, fontWeight:800, padding:'1px 6px', borderRadius:999,
                    background:'#4F46E5', color:'white', minWidth:18, textAlign:'center' }}>
                  {activeCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {activeCount > 0 && (
              <motion.button
                initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:8 }}
                onClick={clearAll}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600,
                  color:'#DC2626', background:'#FEF2F2', border:'1px solid #FECACA',
                  padding:'3px 8px', borderRadius:999, cursor:'pointer' }}>
                <X size={10} /> Clear all
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div style={{ padding:'16px 16px 8px', display:'flex', flexDirection:'column', gap:16 }}>

          <Section title="Sort by">
            <div style={scrollStyle}>
              {SORT.map(s => <Pill key={s.v} label={s.l} active={params.sort===s.v||(!params.sort&&s.v==='')} color="#4F46E5" onClick={() => update('sort',s.v)} />)}
            </div>
          </Section>

          <Section title="Status">
            <div style={scrollStyle}>
              {VERIF.map(f => <Pill key={f.v} label={f.label} active={params.filter===f.v||(!params.filter&&f.v==='')} color={f.color} onClick={() => update('filter',f.v)} />)}
            </div>
          </Section>

          <Section title="City">
            <div style={scrollStyle}>
              {CITIES.map(c => <Pill key={c.v} label={`${c.f} ${c.v}`} active={params.city===c.v} color="#FF5A1F" onClick={() => update('city',params.city===c.v?'':c.v)} />)}
            </div>
          </Section>

          <Section title="Country">
            <div style={scrollStyle}>
              {COUNTRIES.map(c => <Pill key={c.v} label={`${c.f} ${c.v}`} active={params.country===c.v} color="#0891B2" onClick={() => update('country',params.country===c.v?'':c.v)} />)}
            </div>
          </Section>

          <Section title="Specialization" defaultOpen={false}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {SPECS.map(s => <Pill key={s} label={s} active={params.specialization===s} color="#7C3AED" onClick={() => update('specialization',params.specialization===s?'':s)} />)}
            </div>
          </Section>
        </div>
      </motion.div>
    </LayoutGroup>
  )
}
