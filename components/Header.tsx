import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon, Wrench } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="glass sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Wrench className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SmartToolkit
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-2 w-full text-left py-2 text-gray-700 dark:text-gray-300"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}