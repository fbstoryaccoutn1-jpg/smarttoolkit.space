import { Link } from 'react-router-dom'
import { tools } from '../data/toolsData'
import { blogPosts } from '../data/blogPosts'
import { ArrowRight, Shield, Search, PenTool } from 'lucide-react'

export default function Home() {
  const categories = [
    { icon: Shield, label: 'Security', color: 'text-violet-400' },
    { icon: Search, label: 'SEO', color: 'text-rose-400' },
    { icon: PenTool, label: 'Writing', color: 'text-emerald-400' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 text-sky-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          100% Free — No Signup Required
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Powerful Free Tools for<br />
          <span className="gradient-text">Security & SEO</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Six essential online tools — password generator, 2FA reader, word counter, meta tag generator and more. Everything runs in your browser. Nothing is sent to our servers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/tool/password-generator" className="btn-primary">
            Try Password Generator
          </Link>
          <Link to="/blog" className="btn-secondary">
            Read Our Blog
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-10">
          {categories.map(c => (
            <div key={c.label} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <c.icon size={15} className={c.color} />
              <span className="text-gray-300">{c.label} Tools</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-white mb-8">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map(tool => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="glass rounded-2xl p-6 tool-card-hover group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4`}>
                {tool.icon}
              </div>
              <div className="text-xs font-medium text-sky-400 mb-1">{tool.category}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{tool.shortDesc}</p>
              <div className="flex items-center gap-1 mt-4 text-sky-400 text-sm font-medium">
                Use Tool <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="border-y border-white/10 bg-white/[0.02] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Why SmartToolkit?</h2>
          <p className="text-gray-400 mb-10">Built for privacy, speed, and simplicity.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🔒', title: 'Privacy First', desc: 'All tools run 100% in your browser. Your data never touches our servers.' },
              { emoji: '⚡', title: 'Instant Results', desc: 'No waiting, no loading spinners. Results appear as you type.' },
              { emoji: '🆓', title: 'Completely Free', desc: 'Every tool, every feature, forever free. No account needed.' },
            ].map(f => (
              <div key={f.title} className="glass rounded-2xl p-6">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
          <Link to="/blog" className="text-sky-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogPosts.slice(0, 3).map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="glass rounded-2xl p-6 tool-card-hover group"
            >
              <div className="text-xs font-medium text-sky-400 mb-2">{post.category} · {post.readTime}</div>
              <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center gap-1 mt-4 text-sky-400 text-sm font-medium">
                Read More <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
