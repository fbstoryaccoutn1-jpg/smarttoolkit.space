import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/blogPosts'

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">SEO Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Tips, strategies, and guides to help you get AdSense approval and grow your website</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (<BlogCard key={post.slug} {...post} />))}
      </div>
    </div>
  )
}