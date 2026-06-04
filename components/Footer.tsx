import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="glass border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">SmartToolkit</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Free SEO & writing tools to help you get AdSense approval faster.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Word Counter</li>
              <li>Meta Tag Generator</li>
              <li>Keyword Density</li>
              <li>Readability Score</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">About</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 SmartToolkit.space<br />
              All tools are free to use.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}