'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const NE_STATES = ['Assam','Meghalaya','Manipur','Nagaland','Arunachal Pradesh','Mizoram','Tripura','Sikkim']

const CATEGORIES = [
  { icon:'🩺', label:'MBBS Abroad', q:'MBBS Abroad' },
  { icon:'🍁', label:'Canada',      q:'Canada' },
  { icon:'🇬🇧', label:'UK',          q:'UK' },
  { icon:'🇩🇪', label:'Germany',     q:'Germany' },
  { icon:'🇦🇺', label:'Australia',   q:'Australia' },
  { icon:'🏆', label:'Scholarships',q:'Scholarship' },
]

const TYPEWRITER = ['MBBS abroad consultants...','Canada visa specialists...','UK university experts...','Study abroad guidance...']

export default function HeroSection() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [state, setState] = useState('')
  const [tyIdx, setTyIdx] = useState(0)
  const [tyText, setTyText] = useState('')
  const [tyDeleting, setTyDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const target = TYPEWRITER[tyIdx]
    const delay  = tyDeleting ? 40 : 80
    const timer  = setTimeout(() => {
      if (!tyDeleting) {
        if (tyText.length < target.length) setTyText(target.slice(0, tyText.length + 1))
        else { setTimeout(() => setTyDeleting(true), 1800) }
      } else {
        if (tyText.length > 0) setTyText(tyText.slice(0, -1))
        else { setTyDeleting(false); setTyIdx((tyIdx + 1) % TYPEWRITER.length) }
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [tyText, tyDeleting, tyIdx])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim() || state) router.push(`/consultants?q=${encodeURIComponent(q)}&state=${state}`)
  }

  return (
    <section style={{ position:'relative', overflow:'hidden', background:'#0B0F19', minHeight:'100dvh', display:'flex', alignItems:'center' }}>
      {/* Three.js canvas */}
      <HeroCanvas />

      {/* Radial glow */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(79,70,229,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:800, margin:'0 auto', padding:'80px 20px 60px' }}>

        {/* Tag */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:[0.23,1,0.32,1] }}
          style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:999,
            background:'rgba(79,70,229,0.12)', border:'1px solid rgba(79,70,229,0.25)', color:'#818CF8', fontSize:12, fontWeight:600 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#818CF8', animation:'pulse 2s ease-in-out infinite' }} />
            Northeast India&apos;s Verified Education Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1, ease:[0.23,1,0.32,1] }}
          style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(36px,6vw,72px)', lineHeight:1.05,
            textAlign:'center', color:'#F1F5F9', marginBottom:16 }}>
          Real Reviews.<br />
          <span style={{ background:'linear-gradient(135deg,#4F46E5,#818CF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Verified
          </span>{' '}Consultants.
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
          style={{ textAlign:'center', color:'#94A3B8', fontSize:17, marginBottom:36, lineHeight:1.6 }}>
          See the proof before you trust the profile. 35+ consultants across 8 Northeast Indian states.
        </motion.p>

        {/* Search bar */}
        <motion.form onSubmit={handleSearch}
          initial={{ opacity:0, y:20, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.5, delay:0.3, ease:[0.23,1,0.32,1] }}
          style={{ display:'flex', flexDirection:'column', gap:8, padding:8, borderRadius:20,
            background:'rgba(30,41,59,0.9)', border:'1px solid rgba(255,255,255,0.1)',
            backdropFilter:'blur(12px)', marginBottom:24 }}>
          <div style={{ display:'flex', flexDirection:'row', gap:4 }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, padding:'4px 12px' }}>
              <Search size={15} style={{ color:'#94A3B8', flexShrink:0 }} />
              <input value={q} onChange={e => setQ(e.target.value)}
                placeholder={tyText || 'Search consultants...'}
                style={{ flex:1, background:'transparent', border:'none', outline:'none', fontSize:14, color:'#F1F5F9',
                  caretColor:'#818CF8' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 12px',
              borderLeft:'1px solid rgba(255,255,255,0.08)' }}>
              <MapPin size={13} style={{ color:'#94A3B8', flexShrink:0 }} />
              <select value={state} onChange={e => setState(e.target.value)}
                style={{ background:'transparent', border:'none', outline:'none', fontSize:13,
                  color: state ? '#F1F5F9' : '#94A3B8', cursor:'pointer', appearance:'none', paddingRight:16 }}>
                <option value=''>All States</option>
                {NE_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={11} style={{ color:'#94A3B8', marginLeft:-14, pointerEvents:'none' }} />
            </div>
            <motion.button type="submit" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ padding:'10px 22px', borderRadius:12, fontWeight:700, fontSize:13,
                background:'linear-gradient(135deg,#4F46E5,#6D63FF)', color:'white', border:'none', cursor:'pointer',
                boxShadow:'0 4px 16px rgba(79,70,229,0.4)' }}>
              Search
            </motion.button>
          </div>
        </motion.form>

        {/* Category icons */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45, duration:0.5 }}
          style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:8 }}>
          {CATEGORIES.map((cat, i) => (
            <motion.a key={cat.q} href={`/consultants?q=${encodeURIComponent(cat.q)}`}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.45 + i * 0.06, duration:0.4, ease:[0.23,1,0.32,1] }}
              whileHover={{ scale:1.07, y:-3 }} whileTap={{ scale:0.95 }}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'12px 6px',
                borderRadius:14, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
                cursor:'pointer', textDecoration:'none', transition:'background 0.15s' }}>
              <span style={{ fontSize:22 }}>{cat.icon}</span>
              <span style={{ fontSize:10, fontWeight:600, color:'#94A3B8', textAlign:'center', lineHeight:1.2 }}>{cat.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade to body bg */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80,
        background:'linear-gradient(transparent,var(--body-bg))', pointerEvents:'none' }} />

      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}`}</style>
    </section>
  )
}
