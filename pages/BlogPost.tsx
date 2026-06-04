import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) return <div className="container mx-auto px-4 py-20 text-center">Post not found</div>

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-4 border-b">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
          <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">{post.category}</span>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}