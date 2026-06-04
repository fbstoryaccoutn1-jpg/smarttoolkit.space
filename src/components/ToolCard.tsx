import { Link } from 'react-router-dom'
import { ArrowRight, LucideIcon } from 'lucide-react'

interface ToolCardProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
}

export default function ToolCard({ id, name, description, icon: Icon, color }: ToolCardProps) {
  return (
    <Link to={`/tool/${id}`}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
        <div className="p-6">
          <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
            Use Tool <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}