'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

export default function WhatWeDoCard() {
  return (
    <ScrollReveal from="bottom">
      <section style={{ padding:'8px 16px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <motion.div
            whileHover={{ scale:1.005 }}
            style={{ borderRadius:20, padding:'28px 24px', textAlign:'center',
              background:'linear-gradient(135deg,#E6F5F0,#D1FAE5)',
              border:'1px solid #A7F3D0' }}>
            <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:20,
              color:'#064E3B', marginBottom:10 }}>We&apos;re NECF</h3>
            <p style={{ fontSize:13.5, color:'#065F46', lineHeight:1.6, maxWidth:440,
              margin:'0 auto 16px' }}>
              We&apos;re a review platform that&apos;s open to everyone. Our vision is to become the universal symbol of trust for education consultants in Northeast India — empowering students to choose with confidence.
            </p>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              style={{ fontSize:13, fontWeight:600, color:'#065F46', background:'none',
                border:'none', cursor:'pointer', textDecoration:'underline', textUnderlineOffset:3 }}>
              What we do →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </ScrollReveal>
  )
}
