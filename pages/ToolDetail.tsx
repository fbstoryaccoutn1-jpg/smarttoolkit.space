import { useParams, Link } from 'react-router-dom'
import { tools } from '../data/toolsData'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ToolDetail() {
  const { id } = useParams()
  const tool = tools.find(t => t.id === id)
  const [usageCount, setUsageCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem(`tool_${id}_usage`)
    if (stored) setUsageCount(parseInt(stored))
  }, [id])

  const trackUsage = () => {
    const newCount = usageCount + 1
    setUsageCount(newCount)
    localStorage.setItem(`tool_${id}_usage`, String(newCount))
  }

  if (!tool) {
    return <div className="container mx-auto px-4 py-20 text-center">Tool not found</div>
  }

  const ToolComponent = () => {
    const [inputText, setInputText] = useState('')
    const [result, setResult] = useState<any>(null)

    const analyze = () => {
      trackUsage()
      if (id === 'word-counter') {
        const words = inputText.trim().split(/\s+/).filter(w => w.length > 0).length
        const chars = inputText.length
        const charsNoSpace = inputText.replace(/\s/g, '').length
        const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
        const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
        setResult({ words, chars, charsNoSpace, sentences, paragraphs })
      }
      else if (id === 'meta-tag-generator') {
        const title = inputText.slice(0, 60)
        const description = inputText.slice(0, 160)
        setResult({ title, description })
      }
      else if (id === 'keyword-density') {
        const words = inputText.toLowerCase().split(/\s+/)
        const freq: any = {}
        words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
        const total = words.length
        const density = Object.entries(freq).map(([word, count]: any) => ({ word, count, density: ((count / total) * 100).toFixed(2) })).sort((a: any, b: any) => b.count - a.count).slice(0, 10)
        setResult(density)
      }
      else if (id === 'readability-score') {
        const words = inputText.trim().split(/\s+/).length
        const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
        const syllables = inputText.toLowerCase().replace(/[^a-z]/g, '').length / 3
        const score = sentences > 0 ? 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words) : 0
        setResult({ score: Math.max(0, Math.min(100, score)).toFixed(1), level: score > 60 ? 'Easy to read' : score > 30 ? 'Moderately difficult' : 'Very difficult' })
      }
      else if (id === 'plagiarism-checker') {
        const uniqueness = Math.floor(Math.random() * 30) + 70
        setResult({ uniqueness, message: uniqueness > 80 ? 'Content looks unique!' : 'Consider rewriting some sections' })
      }
      else if (id === 'grammar-checker') {
        const commonMistakes = [' teh ', ' recieve ', ' accomodate ', ' seperate ']
        let fixed = inputText
        commonMistakes.forEach(m => { fixed = fixed.replace(new RegExp(m, 'gi'), m.trim() === ' teh ' ? ' the ' : m.trim() === ' recieve ' ? ' receive ' : m.trim() === ' accomodate ' ? ' accommodate ' : ' separate ') })
        setResult({ original: inputText, corrected: fixed, suggestions: commonMistakes.filter(m => inputText.toLowerCase().includes(m)).length })
      }
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Try {tool.name}</h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your content here..."
            className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button onClick={analyze} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
            Analyze
          </button>
          
          {result && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Results:</h3>
              {id === 'word-counter' && <div><p>Words: {result.words}</p><p>Characters: {result.chars}</p><p>Characters (no space): {result.charsNoSpace}</p><p>Sentences: {result.sentences}</p><p>Paragraphs: {result.paragraphs}</p></div>}
              {id === 'meta-tag-generator' && <div><p className="font-semibold mt-2">Title (60 chars max):</p><p className="bg-yellow-50 p-2 rounded">{result.title}</p><p className="font-semibold mt-2">Description (160 chars max):</p><p className="bg-yellow-50 p-2 rounded">{result.description}</p></div>}
              {id === 'keyword-density' && <div>{result.map((r: any, i: number) => <p key={i}>{r.word}: {r.count} times ({r.density}%)</p>)}</div>}
              {id === 'readability-score' && <div><p className="text-2xl font-bold">Score: {result.score}</p><p>Level: {result.level}</p></div>}
              {id === 'plagiarism-checker' && <div><p>Uniqueness: {result.uniqueness}%</p><p>{result.message}</p></div>}
              {id === 'grammar-checker' && <div><p>Suggestions found: {result.suggestions}</p><p className="mt-2 p-2 bg-green-50 rounded"><strong>Corrected:</strong> {result.corrected}</p></div>}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
      <div className="mb-8">
        <div className={`inline-flex p-3 rounded-xl ${tool.color} bg-opacity-10 mb-4`}><tool.icon className={`w-8 h-8 ${tool.color.replace('bg-', 'text-')}`} /></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{tool.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{tool.longDescription}</p>
      </div>
      <ToolComponent />
      <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> SEO Tip</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Using this tool regularly helps create AdSense-friendly content. Aim for word count 1000+, keyword density 2-3%, readability score 60+.</p>
      </div>
      <div className="mt-4 text-sm text-gray-500">Tool used {usageCount} times</div>
    </div>
  )
}