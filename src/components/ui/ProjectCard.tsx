import { motion } from 'framer-motion'
import { Github, ExternalLink, Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Project {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  github_url: string
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group overflow-hidden"
    >
      {/* Project Image */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 占位图标，实际项目中应该使用真实图片 */}
          <div className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {project.name.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Github size={18} />
            {t('projects.view_on_github')}
          </motion.a>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-500 transition-colors">
          {project.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-md"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            <Github size={16} />
            GitHub
          </a>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
          >
            <ExternalLink size={16} />
            详情
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard