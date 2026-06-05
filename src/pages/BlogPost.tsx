import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { ChevronRight, ArrowRight } from 'lucide-react'

function renderMarkdown(text: string) {
  const lines = text.trim().split('\n')
  const elements: JSX.Element[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-semibold text-white mt-6 mb-2">{line.slice(4)}</h3>)
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      const content = line.slice(2, -2)
      elements.push(<p key={i} className="font-semibold text-white mt-4 mb-1">{content}</p>)
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 text-gray-300 text-sm my-3 ml-2">
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      )
      continue
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1 text-gray-300 text-sm my-3 ml-2">
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </ol>
      )
      continue
    } else if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={`code-${i}`} className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-emerald-300 font-mono overflow-x-auto my-4">
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
    } else if (line.trim() === '') {
      // skip blank
    } else {
      // inline bold handling
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
        }
        return <span key={j}>{part}</span>
      })
      elements.push(
        <p key={i} className="text-gray-300 text-sm leading-relaxed my-2">{rendered}</p>
      )
    }
    i++
  }
  return elements
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find(p => p.slug === slug)
  const related = blogPosts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3)

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to="/blog" className="hover:text-sky-400 transition-colors">Blog</Link>
        <ChevronRight size={14} />
        <span className="text-gray-400 line-clamp-1">{post.title}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="text-sky-400 font-medium">{post.category}</span>
          <span>·</span>
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
        <p className="text-gray-400 text-base leading-relaxed border-l-2 border-sky-500 pl-4">{post.excerpt}</p>
      </div>

      <div className="border-t border-white/10 pt-8">
        {renderMarkdown(post.content)}
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-5">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(p => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="glass rounded-xl p-4 group hover:bg-white/10 transition-colors"
              >
                <div className="text-xs text-sky-400 mb-1">{p.category} · {p.readTime}</div>
                <h3 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2">{p.title}</h3>
                <div className="flex items-center gap-1 mt-3 text-sky-400 text-xs font-medium">
                  Read <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
