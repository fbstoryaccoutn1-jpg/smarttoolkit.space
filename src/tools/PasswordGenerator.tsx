import { useState, useCallback } from 'react'
import { Copy, RefreshCw, Check } from 'lucide-react'

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const nums = '0123456789'
  const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let charset = ''
  if (opts.upper) charset += upper
  if (opts.lower) charset += lower
  if (opts.numbers) charset += nums
  if (opts.symbols) charset += syms
  if (!charset) charset = lower

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array).map(x => charset[x % charset.length]).join('')
}

function getStrength(pwd: string): { label: string; color: string; width: string } {
  let score = 0
  if (pwd.length >= 12) score++
  if (pwd.length >= 16) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' }
  if (score <= 3) return { label: 'Fair', color: 'bg-amber-500', width: 'w-2/4' }
  if (score <= 4) return { label: 'Strong', color: 'bg-emerald-500', width: 'w-3/4' }
  return { label: 'Very Strong', color: 'bg-sky-500', width: 'w-full' }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [password, setPassword] = useState(() => generatePassword(16, { upper: true, lower: true, numbers: true, symbols: true }))
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    setPassword(generatePassword(length, opts))
    setCopied(false)
  }, [length, opts])

  const copy = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strength = getStrength(password)

  const toggle = (key: keyof typeof opts) => {
    setOpts(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-4 font-mono text-lg text-white tracking-widest break-all min-h-[60px] flex items-center">
          {password}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={copy} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-400 transition-colors">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
          <button onClick={generate} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-400 transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Strength */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Password Strength</span>
          <span className="font-medium text-white">{strength.label}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full">
          <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
        </div>
      </div>

      {/* Length */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300 font-medium">Length</span>
          <span className="text-sky-400 font-bold">{length}</span>
        </div>
        <input
          type="range" min={8} max={128} value={length}
          onChange={e => { setLength(+e.target.value); generate() }}
          className="w-full accent-sky-500"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>8</span><span>128</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {([
          ['upper', 'Uppercase (A-Z)'],
          ['lower', 'Lowercase (a-z)'],
          ['numbers', 'Numbers (0-9)'],
          ['symbols', 'Symbols (!@#$)'],
        ] as [keyof typeof opts, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
              opts[key]
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center ${opts[key] ? 'bg-sky-500' : 'bg-white/10'}`}>
              {opts[key] && <Check size={10} className="text-white" />}
            </div>
            {label}
          </button>
        ))}
      </div>

      <button onClick={generate} className="btn-primary w-full flex items-center justify-center gap-2">
        <RefreshCw size={16} /> Generate New Password
      </button>
    </div>
  )
}
