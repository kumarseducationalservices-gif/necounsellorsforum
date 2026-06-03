'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

export default function ConsultantCTA() {
  return (
    <ScrollReveal from="bottom" delay={0.1}>
      <section style={{ padding:'8px 16px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <motion.div
            whileHover={{ scale:1.01 }}
            transition={{ type:'spring', stiffness:300, damping:25 }}
            style={{ position:'relative', borderRadius:20, overflow:'hidden', padding:'28px 24px',
              display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
              background:'linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 100%)',
              border:'1px solid #C7D2FE' }}>

            {/* Animated bar chart illustration */}
            <div style={{ position:'absolute', bottom:0, right:16, display:'flex', alignItems:'flex-end',
              gap:5, opacity:0.18, pointerEvents:'none' }}>
              {[20,36,28,52,40,60,48].map((h,i) => (
                <motion.div key={i}
                  initial={{ scaleY:0 }} whileInView={{ scaleY:1 }}
                  viewport={{ once:true }} transition={{ delay: i * 0.08, duration:0.5, ease:'backOut' }}
                  style={{ width:16, height:h, background:'#4F46E5', borderRadius:'4px 4px 0 0',
                    transformOrigin:'bottom' }} />
              ))}
            </div>

            <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:18,
              color:'#1E1B4B', marginBottom:6, position:'relative', zIndex:1 }}>
              Looking to grow your consultancy?
            </h3>
            <p style={{ fontSize:13, color:'#4338CA', marginBottom:20, maxWidth:280,
              lineHeight:1.5, position:'relative', zIndex:1 }}>
              Strengthen your reputation with verified reviews on NECF.
            </p>
            <motion.a href="/consultants/claim"
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 22px',
                borderRadius:999, background:'#1E1B4B', color:'white', fontWeight:700,
                fontSize:13, textDecoration:'none', zIndex:1, position:'relative',
                boxShadow:'0 4px 14px rgba(79,70,229,0.35)' }}>
              Get listed free
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ScrollReveal>
  )
}
