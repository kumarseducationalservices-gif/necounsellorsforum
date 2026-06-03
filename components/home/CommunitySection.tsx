'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const REVIEWS = [
  { name:'Priya Borgohain', city:'Guwahati', country:'UK', uni:'University of Manchester', text:'Got into Manchester for MSc Data Science! They handled everything — SOP, visa, interview prep. Couldn\'t have done it without NECF helping me find the right consultant.', rating:5, tag:'Highly Recommended', tagColor:'#4F46E5', tagBg:'#EEF2FF' },
  { name:'Rahul Borah', city:'Dibrugarh', country:'Canada', uni:'University of Toronto', text:'Canada PR sorted after Masters. The consultant I found here tracked every single step. Proof-backed reviews on NECF actually saved me from two fake consultants first.', rating:5, tag:'Student Proof ✓', tagColor:'#00875A', tagBg:'#E6F5F0' },
  { name:'Ankita Deka', city:'Jorhat', country:'Russia', uni:'Kursk State Medical University', text:'MBBS seat in Russia secured in record time. Documents, NMC check, accommodation — consultant handled all of it. Real students here, real experiences.', rating:4, tag:'Visa Success ✓', tagColor:'#D97706', tagBg:'#FEF3C7' },
]

export default function CommunitySection() {
  return (
    <section style={{ padding:'40px 0', background:'#FDFCF7' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <ScrollReveal from="bottom">
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <span style={{ display:'inline-block', fontSize:11, fontWeight:700, textTransform:'uppercase',
              letterSpacing:'0.1em', padding:'5px 14px', borderRadius:999, marginBottom:14,
              background:'rgba(255,90,31,0.1)', color:'#FF5A1F', border:'1px solid rgba(255,90,31,0.2)' }}>
              Community Reviews
            </span>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,40px)',
              color:'#111827', lineHeight:1.15, marginBottom:10 }}>
              Real students.<br />Real proof.
            </h2>
            <p style={{ fontSize:14, color:'#6B7280', maxWidth:440, margin:'0 auto' }}>
              Every review from a verified student. Every consultant proof-backed. No paid placements.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-30px' }}
              transition={{ delay: i * 0.1, duration:0.5, ease:[0.23,1,0.32,1] }}
              whileHover={{ y:-4, boxShadow:'0 12px 32px rgba(0,0,0,0.10)' }}
              style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:20,
                padding:24, display:'flex', flexDirection:'column', gap:14,
                boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'default' }}>

              <span style={{ alignSelf:'flex-start', fontSize:11, fontWeight:700,
                padding:'3px 10px', borderRadius:999,
                background:r.tagBg, color:r.tagColor, border:`1px solid ${r.tagColor}30` }}>
                {r.tag}
              </span>

              <div style={{ display:'flex', gap:2 }}>
                {Array.from({length:5}).map((_,j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24"
                    fill={j < r.rating ? '#FF5A1F' : '#E5E7EB'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p style={{ fontSize:13, lineHeight:1.6, color:'#4B5563', flex:1 }}>"{r.text}"</p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                <span style={{ fontSize:11, padding:'3px 8px', borderRadius:8, background:'#F9FAFB', color:'#6B7280' }}>📍 {r.country}</span>
                <span style={{ fontSize:11, padding:'3px 8px', borderRadius:8, background:'#F9FAFB', color:'#6B7280' }}>🎓 {r.uni}</span>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:12,
                borderTop:'1px solid #F3F4F6' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#FF5A1F,#FF8A4C)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:700, color:'white' }}>
                  {r.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:600, color:'#111827' }}>{r.name}</div>
                  <div style={{ fontSize:11, color:'#9CA3AF' }}>{r.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:28 }}>
          <motion.a href="/consultants" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 24px',
              borderRadius:999, background:'linear-gradient(135deg,#FF5A1F,#FF7A45)', color:'white',
              fontWeight:700, fontSize:13.5, textDecoration:'none',
              boxShadow:'0 4px 16px rgba(255,90,31,0.3)' }}>
            Browse All Reviews →
          </motion.a>
        </div>
      </div>
    </section>
  )
}
