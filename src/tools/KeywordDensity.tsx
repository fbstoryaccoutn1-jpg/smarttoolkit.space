import { useState } from 'react'

const STOP_WORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','be','been','it','this','that','as','by','from','have','has','had','not','so','we','you','i','he','she','they','do','did','will','would','could','should','may','might','can','all','more','no','if','their','its','his','her','our','my','your','we','us','about','than','then','when','what','how','which','who','where','why','just','also','very','too','up','out','into','over','after','before','any','each','other','some','such'])

function getDensityColor(pct: number) {
  if (pct < 0.5) return 'text-blue-400'
  if (pct <= 2.5) return 'text-emerald-400'
  if (pct <= 4) return 'text-amber-400'
  return 'text-red-400'
}

function getDensityLabel(pct: number) {
  if (pct < 0.5) return 'Low'
  if (pct <= 2.5) return 'Optimal'
  if (pct <= 4) return 'High'
  return 'Too High'
}

function analyze(text: string, ngram: 1 | 2 | 3) {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, ' ').trim().split(/\s+/).filter(w => w.length > 1)
  const total = words.length
  if (total === 0) return { items: [], total: 0 }

  const freq: Record<string, number> = {}
  for (let i = 0; i <= words.length - ngram; i++) {
    const phrase = words.slice(i, i + ngram).join(' ')
    if (ngram === 1 && STOP_WORDS.has(phrase)) continue
    if (ngram > 1) {
      const first = words[i], last = words[i + ngram - 1]
      if (STOP_WORDS.has(first) || STOP_WORDS.has(last)) continue
    }
    freq[phrase] = (freq[phrase] || 0) + 1
  }

  const items = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, count]) => ({
      word,
      count,
      pct: ((count / total) * 100),
    }))

  return { items, total }
}

export default function KeywordDensity() {
  const [text, setText] = useState('')
  const [tab, setTab] = useState<1 | 2 | 3>(1)
  const [focus, setFocus] = useState('')

  const { items, total } = analyze(text, tab)

  const focusResult = focus && text
    ? (() => {
        const count = (text.toLowerCase().match(new RegExp(`\\b${focus.toLowerCase()}\\b`, 'g')) || []).length
        return { count, pct: (count / total * 100).toFixed(2) }
      })()
    : null

  return (
    <div className="space-y-5">
      <textarea
        rows={7}
        placeholder="Paste your article or content here to analyze keyword density..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="textarea-field"
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          {([1, 2, 3] as const).map(n => (
            <button
              key={n}
              onClick={() => setTab(n)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                tab === n ? 'bg-sky-500 text-white' : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {n === 1 ? 'Single Words' : n === 2 ? '2-Word Phrases' : '3-Word Phrases'}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-[180px]">
          <input
            type="text"
            placeholder="Focus on specific keyword..."
            value={focus}
            onChange={e => setFocus(e.target.value)}
            className="input-field py-1.5 text-sm"
          />
        </div>
      </div>

      {focusResult && total > 0 && (
        <div className="glass-light rounded-xl p-4">
          <div className="text-sm font-semibold text-white mb-1">
            Keyword: <span className="text-sky-400 font-mono">"{focus}"</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-300">Count: <strong className="text-white">{focusResult.count}</strong></span>
            <span className="text-gray-300">Density: <strong className={getDensityColor(+focusResult.pct)}>{focusResult.pct}%</strong></span>
            <span className={`font-medium text-xs px-2 py-0.5 rounded-full ${getDensityColor(+focusResult.pct)} bg-white/10`}>
              {getDensityLabel(+focusResult.pct)}
            </span>
          </div>
        </div>
      )}

      {text && total > 0 && items.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Top Keywords ({total} total words)</span>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="text-blue-400">● Low</span>
              <span className="text-emerald-400">● Optimal</span>
              <span className="text-amber-400">● High</span>
              <span className="text-red-400">● Too High</span>
            </div>
          </div>
          <div className="space-y-2">
            {items.map(({ word, count, pct }) => (
              <div key={word} className="flex items-center gap-3">
                <span className="text-sm font-mono text-gray-300 w-36 truncate">{word}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct >= 4 ? 'bg-red-500' : pct >= 2.5 ? 'bg-amber-500' : pct >= 0.5 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((count / items[0].count) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs w-12 text-right font-mono">{count}×</span>
                <span className={`text-xs w-14 text-right font-semibold ${getDensityColor(pct)}`}>{pct.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : text && (
        <div className="text-center py-8 text-gray-500 text-sm">Not enough content to analyze.</div>
      )}

      {text && <button onClick={() => { setText(''); setFocus('') }} className="btn-secondary text-sm">Clear</button>}
    </div>
  )
}
