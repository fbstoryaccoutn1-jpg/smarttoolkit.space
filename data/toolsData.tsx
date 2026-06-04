import { 
  Type, FileText, Hash, SpellCheck, Eye, TrendingUp, 
  LucideIcon 
} from 'lucide-react'

export interface Tool {
  id: string
  name: string
  description: string
  longDescription: string
  icon: LucideIcon
  color: string
  seoKeywords: string[]
}

export const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs instantly',
    longDescription: 'Perfect for SEO content writers. Check your article length, keyword density, and readability metrics.',
    icon: Type,
    color: 'bg-blue-500',
    seoKeywords: ['word counter', 'character counter', 'seo word count', 'content length checker']
  },
  {
    id: 'meta-tag-generator',
    name: 'SEO Meta Tag Generator',
    description: 'Generate optimized meta titles & descriptions for better CTR',
    longDescription: 'Create SEO-friendly meta titles (50-60 chars) and descriptions (150-160 chars) for your blog posts.',
    icon: FileText,
    color: 'bg-green-500',
    seoKeywords: ['meta tag generator', 'seo meta description', 'title tag tool', 'meta tags for adsense']
  },
  {
    id: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    description: 'Check content uniqueness and get similarity score',
    longDescription: 'Ensure your content is unique before publishing. Get similarity score and improvement tips.',
    icon: Hash,
    color: 'bg-purple-500',
    seoKeywords: ['plagiarism checker', 'unique content checker', 'duplicate content detector']
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Analyze keyword frequency to avoid over-optimization',
    longDescription: 'Check if you\'re using keywords optimally (2-3% density recommended for SEO).',
    icon: TrendingUp,
    color: 'bg-orange-500',
    seoKeywords: ['keyword density tool', 'seo keyword checker', 'keyword frequency analysis']
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Grammar and spelling suggestions for error-free writing',
    longDescription: 'Fix common grammar mistakes, spelling errors, and improve sentence structure.',
    icon: SpellCheck,
    color: 'bg-red-500',
    seoKeywords: ['grammar checker', 'spell checker', 'writing assistant', 'proofreading tool']
  },
  {
    id: 'readability-score',
    name: 'Readability Score',
    description: 'Flesch-Kincaid readability test for better engagement',
    longDescription: 'Make your content easy to read. Score 60+ is recommended for general audiences.',
    icon: Eye,
    color: 'bg-indigo-500',
    seoKeywords: ['readability checker', 'flesch kincaid', 'content readability', 'seo readability score']
  }
]