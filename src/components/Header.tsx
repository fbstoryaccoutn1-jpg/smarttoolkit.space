import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="gradient-text">SmartToolkit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? 'text-sky-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                location.pathname === l.to ? 'text-sky-400' : 'text-gray-400'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
