import { useState, useEffect, useRef } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

// TOTP implementation using Web Crypto API
function base32Decode(base32: string): Uint8Array {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  const cleaned = base32.replace(/\s/g, '').toUpperCase().replace(/=+$/, '')
  const bits = cleaned.split('').map(c => {
    const idx = CHARS.indexOf(c)
    if (idx === -1) throw new Error(`Invalid Base32 character: ${c}`)
    return idx.toString(2).padStart(5, '0')
  }).join('')
  const bytes: number[] = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2))
  }
  return new Uint8Array(bytes)
}

async function generateTOTP(secret: string): Promise<string> {
  const key = base32Decode(secret).buffer as ArrayBuffer
  const timeStep = Math.floor(Date.now() / 1000 / 30)
  const timeBuffer = new ArrayBuffer(8)
  const view = new DataView(timeBuffer)
  view.setUint32(4, timeStep, false)

  const cryptoKey = await crypto.subtle.importKey(
    'raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, timeBuffer)
  const hmac = new Uint8Array(signature)
  const offset = hmac[19] & 0xf
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % 1000000
  return code.toString().padStart(6, '0')
}

export default function TwoFAReader() {
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const generate = async (s: string) => {
    if (!s.trim()) { setCode(''); setError(''); return }
    try {
      const c = await generateTOTP(s.trim())
      setCode(c)
      setError('')
    } catch {
      setCode('')
      setError('Invalid secret key. Please check the format (Base32 only: A-Z and 2-7).')
    }
  }

  useEffect(() => {
    const tick = () => {
      const secs = 30 - (Math.floor(Date.now() / 1000) % 30)
      setTimeLeft(secs)
      if (secs === 30 && secret) generate(secret)
    }
    tick()
    intervalRef.current = setInterval(tick, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [secret])

  const handleSecret = (val: string) => {
    setSecret(val)
    generate(val)
  }

  const copy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          2FA Secret Key (Base32)
        </label>
        <input
          type="text"
          placeholder="e.g. JBSWY3DPEHPK3PXP"
          value={secret}
          onChange={e => handleSecret(e.target.value)}
          className="input-field font-mono tracking-wider"
        />
        <p className="text-xs text-gray-600 mt-1">Enter the text key shown when setting up 2FA — usually under "can't scan QR code?"</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {code && (
        <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Your 2FA Code</div>
          <div className="text-5xl font-mono font-bold tracking-[0.3em] text-white mb-4">
            {code.slice(0, 3)} {code.slice(3)}
          </div>

          {/* Countdown ring */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle
                  cx="22" cy="22" r="18" fill="none"
                  stroke={timeLeft <= 5 ? '#ef4444' : '#0ea5e9'}
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - timeLeft / 30)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-sky-400'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-400">Refreshes in {timeLeft} seconds</div>
              <div className="text-xs text-gray-600">Codes change every 30 seconds</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={copy} className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Code</>}
            </button>
            <button onClick={() => generate(secret)} className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>
      )}

      {!code && !error && (
        <div className="text-center py-8 text-gray-600 text-sm">
          Enter your secret key above to generate a code
        </div>
      )}
    </div>
  )
}
