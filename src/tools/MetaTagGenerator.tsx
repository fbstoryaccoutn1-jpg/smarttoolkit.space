import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function MetaTagGenerator() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    url: '',
    image: '',
    robots: 'index, follow',
    type: 'website',
  })
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState('')

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const generate = () => {
    const tags = [
      `<!-- Primary Meta Tags -->`,
      `<title>${form.title}</title>`,
      `<meta name="title" content="${form.title}" />`,
      form.description && `<meta name="description" content="${form.description}" />`,
      form.keywords && `<meta name="keywords" content="${form.keywords}" />`,
      form.author && `<meta name="author" content="${form.author}" />`,
      `<meta name="robots" content="${form.robots}" />`,
      form.url && `<link rel="canonical" href="${form.url}" />`,
      ``,
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="${form.type}" />`,
      form.url && `<meta property="og:url" content="${form.url}" />`,
      `<meta property="og:title" content="${form.title}" />`,
      form.description && `<meta property="og:description" content="${form.description}" />`,
      form.image && `<meta property="og:image" content="${form.image}" />`,
      ``,
      `<!-- Twitter -->`,
      `<meta property="twitter:card" content="summary_large_image" />`,
      form.url && `<meta property="twitter:url" content="${form.url}" />`,
      `<meta property="twitter:title" content="${form.title}" />`,
      form.description && `<meta property="twitter:description" content="${form.description}" />`,
      form.image && `<meta property="twitter:image" content="${form.image}" />`,
    ].filter(Boolean).join('\n')
    setGenerated(tags)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const titleLen = form.title.length
  const descLen = form.description.length

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Page Title <span className={titleLen > 60 ? 'text-red-400' : 'text-gray-600'}>({titleLen}/60)</span>
          </label>
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Your Page Title" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Author</label>
          <input type="text" value={form.author} onChange={e => set('author', e.target.value)} placeholder="Site Name or Author" className="input-field" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Meta Description <span className={descLen > 160 ? 'text-red-400' : 'text-gray-600'}>({descLen}/160)</span>
          </label>
          <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Compelling page description under 160 characters" className="textarea-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Keywords (comma separated)</label>
          <input type="text" value={form.keywords} onChange={e => set('keywords', e.target.value)} placeholder="seo, tools, free" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Robots</label>
          <select value={form.robots} onChange={e => set('robots', e.target.value)} className="input-field">
            <option>index, follow</option>
            <option>noindex, follow</option>
            <option>index, nofollow</option>
            <option>noindex, nofollow</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Page URL</label>
          <input type="url" value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://yoursite.com/page" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">OG Image URL</label>
          <input type="url" value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://yoursite.com/image.jpg" className="input-field" />
        </div>
      </div>

      <button onClick={generate} className="btn-primary w-full">Generate Meta Tags</button>

      {generated && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Generated Tags</span>
            <button onClick={copy} className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300">
              {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy All</>}
            </button>
          </div>
          <pre className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap">
            {generated}
          </pre>
        </div>
      )}
    </div>
  )
}
