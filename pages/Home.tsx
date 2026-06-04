import { Sparkles, Zap, Shield } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import { tools } from '../data/toolsData'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent bg-300% animate-gradient">
            Free SEO Tools for AdSense Approval
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your website ready for Google AdSense with our professional toolkit. 100% free, no signup required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tools" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-xl">
              Explore Tools
            </a>
            <Link to="/blog" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-8 py-3 rounded-full font-semibold transition">
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-blue-600">6+</div><div className="text-gray-600 dark:text-gray-400">Professional Tools</div></div>
            <div><div className="text-3xl font-bold text-blue-600">10K+</div><div className="text-gray-600 dark:text-gray-400">Happy Users</div></div>
            <div><div className="text-3xl font-bold text-blue-600">100%</div><div className="text-gray-600 dark:text-gray-400">Free Forever</div></div>
            <div><div className="text-3xl font-bold text-blue-600">24/7</div><div className="text-gray-600 dark:text-gray-400">Tool Availability</div></div>
          </div>
        </div>
      </section>

      <section id="tools" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All Tools You Need</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Carefully crafted tools to optimize your content for AdSense approval and better rankings
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (<ToolCard key={tool.id} {...tool} />))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center"><Sparkles className="w-12 h-12 mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">SEO Optimized</h3><p className="opacity-90">Every tool includes SEO tips for better rankings</p></div>
            <div className="text-center"><Shield className="w-12 h-12 mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">AdSense Ready</h3><p className="opacity-90">Specifically designed for approval requirements</p></div>
            <div className="text-center"><Zap className="w-12 h-12 mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">Fast & Free</h3><p className="opacity-90">No registration, instant results, no limits</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}