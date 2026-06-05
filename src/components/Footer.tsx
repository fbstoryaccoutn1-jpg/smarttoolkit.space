import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="gradient-text">SmartToolkit</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Free online tools for security, SEO, and writing. No signup required. Everything runs in your browser.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Tools</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {[
              { slug: 'password-generator', name: 'Password Generator' },
              { slug: '2fa-code-reader', name: '2FA Code Reader' },
              { slug: 'word-counter', name: 'Word Counter' },
              { slug: 'character-counter', name: 'Character Counter' },
              { slug: 'meta-tag-generator', name: 'Meta Tag Generator' },
              { slug: 'keyword-density-checker', name: 'Keyword Density' },
            ].map(t => (
              <li key={t.slug}>
                <Link to={`/tool/${t.slug}`} className="hover:text-sky-400 transition-colors">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Site</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {[
              { to: '/blog', label: 'Blog' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-sky-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-600">
        © {new Date().getFullYear()} SmartToolkit.space — All rights reserved.
      </div>
    </footer>
  )
}
