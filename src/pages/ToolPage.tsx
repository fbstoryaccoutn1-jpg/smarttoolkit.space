import { useParams, Link } from 'react-router-dom'
import { tools } from '../data/toolsData'
import PasswordGenerator from '../tools/PasswordGenerator'
import TwoFAReader from '../tools/TwoFAReader'
import WordCounter from '../tools/WordCounter'
import CharacterCounter from '../tools/CharacterCounter'
import MetaTagGenerator from '../tools/MetaTagGenerator'
import KeywordDensity from '../tools/KeywordDensity'
import { ChevronRight } from 'lucide-react'

const toolComponents: Record<string, React.ComponentType> = {
  'password-generator': PasswordGenerator,
  '2fa-code-reader': TwoFAReader,
  'word-counter': WordCounter,
  'character-counter': CharacterCounter,
  'meta-tag-generator': MetaTagGenerator,
  'keyword-density-checker': KeywordDensity,
}

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>()
  const tool = tools.find(t => t.slug === slug)
  const ToolComponent = slug ? toolComponents[slug] : null

  if (!tool || !ToolComponent) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Tool Not Found</h1>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-300">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl`}>
            {tool.icon}
          </div>
          <div>
            <div className="text-xs text-sky-400 font-medium">{tool.category}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{tool.name}</h1>
          </div>
        </div>
        <p className="text-gray-400 text-base leading-relaxed">{tool.description}</p>
      </div>

      {/* Tool UI */}
      <div className="section-card mb-10">
        <ToolComponent />
      </div>

      {/* How to Use */}
      <div className="section-card mb-6">
        <h2 className="text-xl font-bold text-white mb-4">How to Use {tool.name}</h2>
        <ol className="space-y-3">
          {tool.howToUse.map((step, i) => (
            <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Features */}
      <div className="section-card mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Features</h2>
        <ul className="space-y-2">
          {tool.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className="text-sky-400 mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* FAQs */}
      <div className="section-card mb-10">
        <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {tool.faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
              <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Tools */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Other Tools You Might Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.filter(t => t.slug !== slug).slice(0, 4).map(t => (
            <Link
              key={t.id}
              to={`/tool/${t.slug}`}
              className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center text-lg flex-shrink-0`}>
                {t.icon}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.shortDesc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
