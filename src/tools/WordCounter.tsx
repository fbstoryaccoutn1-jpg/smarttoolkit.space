import { useState } from 'react'

function analyze(text: string) {
  const words = text.trim() === '' ? [] : text.trim().split(/\s+/)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
  const readingTime = Math.ceil(words.length / 200)

  // Top keywords
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','be','been','it','this','that','as','by','from','have','has','had','not','so','we','you','i','he','she','they','do','did','will','would','could','should','may','might','can','all','more','no','if','their','its','his','her','our'])
  const freq: Record<string, number> = {}
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '')
    if (clean.length > 2 && !stopWords.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1
    }
  })
  const topKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10)

  return {
    words: words.length,
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    readingTime,
    avgWordLen: words.length > 0 ? (words.join('').length / words.length).toFixed(1) : '0',
    topKeywords,
  }
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const stats = analyze(text)

  return (
    <div className="space-y-5">
      <textarea
        rows={8}
        placeholder="Paste or type your text here..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="textarea-field"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'No Spaces', value: stats.charsNoSpace },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Read Time', value: `${stats.readingTime} min` },
          { label: 'Avg Word Len', value: stats.avgWordLen },
          { label: 'Characters/Word', value: stats.words > 0 ? (stats.charsNoSpace / stats.words).toFixed(1) : '0' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-sky-400">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {stats.topKeywords.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Top Keywords</h3>
          <div className="space-y-2">
            {stats.topKeywords.map(([word, count]) => {
              const pct = ((count / stats.words) * 100).toFixed(1)
              return (
                <div key={word} className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-28 truncate font-mono">{word}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full"
                      style={{ width: `${Math.min((count / stats.topKeywords[0][1]) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-20 text-right">{count}× ({pct}%)</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {text && (
        <button onClick={() => setText('')} className="btn-secondary text-sm">
          Clear Text
        </button>
      )}
    </div>
  )
}
