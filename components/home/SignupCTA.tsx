'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

export default function SignupCTA() {
  return (
    <ScrollReveal from="bottom">
      <section style={{ padding:'8px 16px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ borderRadius:20, padding:'32px 24px', textAlign:'center',
            background:'#FDFCF7', border:'1px solid #E5E7EB' }}>
            <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:20,
              color:'#111827', marginBottom:8 }}>
              Help the next student from Northeast India
            </h3>
            <p style={{ fontSize:13.5, color:'#6B7280', marginBottom:24,
              maxWidth:340, margin:'0 auto 24px', lineHeight:1.6 }}>
              Share your experience — real reviews protect real students from fraud.
            </p>
            <motion.a href="/consultants"
              whileHover={{ scale:1.04, boxShadow:'0 6px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px',
                borderRadius:999, background:'#111827', color:'white', fontWeight:700,
                fontSize:14, textDecoration:'none', boxShadow:'0 3px 12px rgba(0,0,0,0.18)', marginBottom:20 }}>
              Write a review
            </motion.a>

            <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:24 }}>
              {['G','✉'].map((icon,i) => (
                <motion.a key={i} href="#"
                  whileHover={{ scale:1.12, y:-2 }} whileTap={{ scale:0.95 }}
                  style={{ width:40, height:40, borderRadius:'50%', border:'1.5px solid #E5E7EB',
                    background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:14, fontWeight:700, color:'#374151', textDecoration:'none',
                    boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
                  {icon}
                </motion.a>
              ))}
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:10 }}>
              {['🎓','✈️','🏫'].map((e,i) => (
                <motion.div key={i}
                  initial={{ opacity:0, scale:0.8 }}
                  whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * 0.1, type:'spring', stiffness:200 }}
                  style={{ width:80, height:56, borderRadius:14, display:'flex',
                    alignItems:'center', justifyContent:'center', fontSize:28,
                    background:['#EEF2FF','#E6F5F0','#FFF3EE'][i] }}>
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
