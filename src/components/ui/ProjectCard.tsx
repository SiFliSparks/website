import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, Tag, Star, GitFork, Eye } from 'lucide-react'
import { useState, useRef, useMemo } from 'react'

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
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // 3D 鼠标跟踪效果 - 优化配置
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // 使用更保守的旋转角度和弹性配置
  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [8, -8]),
    { stiffness: 100, damping: 30, mass: 1 }
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-8, 8]),
    { stiffness: 100, damping: 30, mass: 1 }
  )
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // 限制鼠标追踪范围
    const maxDistance = 150
    const rawX = event.clientX - centerX
    const rawY = event.clientY - centerY
    
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, rawX))
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, rawY))
    
    mouseX.set(clampedX)
    mouseY.set(clampedY)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // 基于项目名称生成一致的伪随机数据
  const stats = useMemo(() => {
    // 使用项目名称作为种子生成稳定的"随机"数据
    const hash = project.name.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0)
    }, 0)
    
    // 确保哈希值为正数
    const seed = Math.abs(hash)
    
    // 基于种子生成稳定的统计数据
    const stars = (seed % 900) + 100 // 100-999之间
    const forks = (seed % 150) + 20  // 20-169之间  
    const views = (seed % 4500) + 500 // 500-4999之间
    
    return { stars, forks, views }
  }, [project.name])

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.4
        }
      }}
      initial={{ 
        rotateX: 0, 
        rotateY: 0,
        scale: 1
      }}
      className="relative group perspective-1000 will-change-transform"
    >
      {/* 外发光效果 */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 rounded-xl blur-sm opacity-0 group-hover:opacity-70 transition-all duration-500"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
      />
      
      {/* 主卡片 */}
      <motion.div 
        className="relative card overflow-hidden bg-white dark:bg-dark-800 transform-gpu backface-hidden preserve-3d"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
        animate={{
          rotateX: 0,
          rotateY: 0,
        }}
        transition={{ duration: 0 }}
      >
        {/* 动态背景网格 */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(35, 185, 232, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(35, 185, 232, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }} />
        </div>
        
        {/* 光束动画 */}
        <motion.div
          className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-pulse"
          animate={{
            x: isHovered ? '400%' : '-100%',
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* 项目图片区域 */}
        <div className="relative aspect-video bg-gradient-to-br from-primary-100 via-blue-100 to-purple-100 dark:from-primary-900/50 dark:via-blue-900/50 dark:to-purple-900/50 overflow-hidden">
          {/* 粒子效果背景 */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  y: [0, -20, -40],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
          
          {/* 项目图标 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {project.name.charAt(0)}
                </span>
              </div>
              
              {/* 环形光效 */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
          
          {/* GitHub统计悬浮显示 */}
          <motion.div
            className="absolute top-3 right-3 flex gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white">
              <Star size={10} />
              {stats.stars}
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs text-white">
              <GitFork size={10} />
              {stats.forks}
            </div>
          </motion.div>

          {/* 快速访问按钮 */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              GitHub
            </motion.a>
            
            <motion.button
              className="bg-primary-500/80 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
              Preview
            </motion.button>
          </motion.div>
        </div>

        {/* 卡片内容 */}
        <div className="p-6 relative">
          {/* 标题区域 */}
          <div className="mb-3">
            <motion.h3 
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-500 transition-colors"
              layoutId={`title-${project.name}`}
            >
              {project.name}
            </motion.h3>
            
            {/* 技术栈指示器 */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Active Development</span>
            </div>
          </div>
          
          {/* 描述 */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full border border-primary-200 dark:border-primary-800"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Tag size={10} />
                {tag}
              </motion.span>
            ))}
          </div>

          {/* 底部操作区 */}
          <div className="flex items-center justify-between">
            <motion.a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              <span>Repository</span>
            </motion.a>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star size={12} />
                {stats.stars}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={12} />
                {stats.views}
              </div>
            </div>
          </div>

          {/* 进度条装饰 */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* 3D深度效果 */}
        <div className="absolute inset-0 rounded-xl shadow-xl pointer-events-none" 
             style={{ transform: 'translateZ(-1px)' }} />
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard