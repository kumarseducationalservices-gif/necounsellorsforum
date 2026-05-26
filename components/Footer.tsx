import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

const NAV = {
  Platform:    [['Find Consultants','/consultants'],['Events','/events'],['Compare','/consultants/compare']],
  Consultants: [['Claim Profile','/consultants/claim'],['Get Verified','/consultants/verify'],['Suggest One','/consultants/suggest']],
  Northeast:   [['Assam','/consultants?state=Assam'],['Meghalaya','/consultants?state=Meghalaya'],['Manipur','/consultants?state=Manipur'],['Nagaland','/consultants?state=Nagaland']],
}

export default function Footer() {
  return (
    <footer style={{ background:'var(--nav-bg)', borderTop:'1px solid var(--nav-border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={20} style={{ color:'#00875A' }} strokeWidth={2.5} />
              <span className="font-display font-bold text-sm" style={{ color:'var(--nav-text)' }}>NECF</span>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color:'var(--nav-muted)' }}>
              Northeast India's verified education consultant platform. Trust built on proof, not promises.
            </p>
            <div className="text-xs px-2.5 py-1.5 rounded-lg inline-block"
              style={{ background:'rgba(79,70,229,0.1)', color:'#818CF8', border:'1px solid rgba(79,70,229,0.2)' }}>
              By Sanchaar EduTech Pvt. Ltd.
            </div>
          </div>

          {Object.entries(NAV).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color:'var(--nav-muted)' }}>{group}</h4>
              <ul className="space-y-2">
                {items.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-xs transition-opacity hover:opacity-80"
                      style={{ color:'var(--nav-muted)' }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderTop:'1px solid var(--nav-border)' }}>
          <p className="text-xs" style={{ color:'var(--nav-muted)' }}>
            © 2025 North East Counsellors Forum (NECF) · Sanchaar EduTech Private Limited
          </p>
          <div className="flex gap-4 text-xs" style={{ color:'var(--nav-muted)' }}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/moderation-policy">Moderation</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
