import { Link } from 'react-router-dom'
import { Calendar, Clock } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
}

export default function BlogCard({ slug, title, excerpt, date, readTime }: BlogCardProps) {
  return (
    <Link to={`/blog/${slug}`}>
      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 card-hover">
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {readTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
        </div>
      </article>
    </Link>
  )
}