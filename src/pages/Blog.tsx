import { useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { ArrowRight, Search } from 'lucide-react'

const categories = ['All', 'Security', 'SEO', 'Writing']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = blogPosts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchQ = p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Blog</h1>
        <p className="text-gray-400">In-depth guides on security, SEO, and online tools.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === c
                  ? 'bg-sky-500 text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="glass rounded-2xl p-6 tool-card-hover group flex flex-col"
            >
              <div className="text-xs font-medium text-sky-400 mb-2">
                {post.category} · {post.readTime}
              </div>
              <h2 className="font-bold text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-600">{post.date}</span>
                <span className="flex items-center gap-1 text-sky-400 text-sm font-medium">
                  Read <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
