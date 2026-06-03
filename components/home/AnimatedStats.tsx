'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Star, Users, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { icon: Shield, end: 35,   suffix: '+',   label: 'Verified Consultants', color: '#4F46E5' },
  { icon: Star,   end: 500,  suffix: '+',   label: 'Student Reviews',      color: '#00875A' },
  { icon: Users,  end: 8000, suffix: '+',   label: 'Students Helped',      color: '#FF5A1F' },
  { icon: MapPin, end: 8,    suffix: ' NE States', label: 'Covered',       color: '#D4AF37' },
]

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.stat-num')
    if (!els) return

    els.forEach((el, i) => {
      const stat = STATS[i]
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: stat.end,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: stat.end > 100 ? 10 : 1 },
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
          onUpdate() {
            el.textContent = Math.round(parseFloat(el.textContent || '0')).toLocaleString('en-IN') + stat.suffix
          },
        }
      )
    })

    // Stagger card entrance
    gsap.fromTo(
      ref.current?.querySelectorAll('.stat-card') ?? [],
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    )
  }, [])

  return (
    <div ref={ref} className="border-y" style={{ borderColor:'var(--border)', background:'#fff' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 divide-x"
        style={{ borderColor:'var(--border)' }}>
        {STATS.map(({ icon: Icon, end, suffix, label, color }) => (
          <div key={label} className="stat-card flex items-center gap-3 px-5 py-4 opacity-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: color + '15' }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <div className="stat-num font-display font-bold text-lg leading-none" style={{ color:'var(--text)' }}>
                0{suffix}
              </div>
              <div className="text-xs mt-0.5" style={{ color:'var(--muted)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
