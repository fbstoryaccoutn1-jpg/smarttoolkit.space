import { useState } from 'react'

const PRESETS = [
  { label: 'Twitter', limit: 280 },
  { label: 'Meta Desc', limit: 160 },
  { label: 'Instagram Bio', limit: 150 },
  { label: 'SMS', limit: 160 },
  { label: 'LinkedIn Post', limit: 3000 },
  { label: 'Custom', limit: 0 },
]

export default function CharacterCounter() {
  const [text, setText] = useState('')
  const [preset, setPreset] = useState(PRESETS[0])
  const [customLimit, setCustomLimit] = useState(100)

  const limit = preset.label === 'Custom' ? customLimit : preset.limit
  const chars = text.length
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const remaining = limit - chars
  const pct = Math.min((chars / limit) * 100, 100)
  const overLimit = chars > limit

  return (
    <div className="space-y-5">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => setPreset(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              preset.label === p.label
                ? 'bg-sky-500 text-white'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            {p.label}{p.limit > 0 ? ` (${p.limit})` : ''}
          </button>
        ))}
      </div>

      {preset.label === 'Custom' && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-300">Custom limit:</label>
          <input
            type="number" min={1} max={100000}
            value={customLimit}
            onChange={e => setCustomLimit(+e.target.value)}
            className="input-field w-28 py-2 text-sm"
          />
        </div>
      )}

      <textarea
        rows={6}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="textarea-field"
      />

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">{chars} / {limit} characters</span>
          <span className={overLimit ? 'text-red-400 font-bold' : 'text-gray-400'}>
            {overLimit ? `${Math.abs(remaining)} over limit` : `${remaining} remaining`}
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-sky-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Characters', value: chars },
          { label: 'Words', value: words },
          { label: 'Remaining', value: remaining },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className={`text-xl font-bold ${s.label === 'Remaining' && remaining < 0 ? 'text-red-400' : 'text-sky-400'}`}>
              {s.value}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {text && (
        <button onClick={() => setText('')} className="btn-secondary text-sm">Clear</button>
      )}
    </div>
  )
}
