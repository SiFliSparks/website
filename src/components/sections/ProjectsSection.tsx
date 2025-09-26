import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, Tag } from 'lucide-react'
import ProjectCard from '../ui/ProjectCard'

const ProjectsSection = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // 使用loadProjects函数获取项目数据
  const [projects] = useState(() => {
    // 在实际应用中，这里可以异步加载TOML数据
    // 现在使用模拟数据
    return [
      {
        name: "SiFli IoT Gateway",
        description: "基于SiFli芯片的高性能物联网网关，支持多种通信协议",
        thumbnail: "project1.jpg",
        tags: ["IoT", "网关", "通信"],
        github_url: "https://github.com/example/sifli-iot-gateway"
      },
      {
        name: "SiFli Audio Processor",
        description: "专业级音频处理器，提供低延迟、高保真的音频处理能力",
        thumbnail: "project2.jpg", 
        tags: ["音频", "处理器", "实时"],
        github_url: "https://github.com/example/sifli-audio"
      },
      {
        name: "SiFli Sensor Hub",
        description: "集成多种传感器的数据收集和处理中心",
        thumbnail: "project3.jpg",
        tags: ["传感器", "数据", "监控"],
        github_url: "https://github.com/example/sifli-sensor-hub"
      },
      {
        name: "SiFli Display Driver",
        description: "高效的显示驱动程序，支持多种显示设备",
        thumbnail: "project4.jpg",
        tags: ["显示", "驱动", "界面"],
        github_url: "https://github.com/example/sifli-display"
      },
      {
        name: "SiFli Wireless Stack",
        description: "完整的无线通信协议栈，支持WiFi、蓝牙等协议",
        thumbnail: "wireless-stack.jpg",
        tags: ["无线", "WiFi", "蓝牙", "协议栈"],
        github_url: "https://github.com/sifli-sparks/wireless-stack"
      },
      {
        name: "SiFli Power Manager",
        description: "智能电源管理系统，优化设备功耗和电池生命周期",
        thumbnail: "power-manager.jpg",
        tags: ["电源", "功耗", "电池", "节能"],
        github_url: "https://github.com/sifli-sparks/power-manager"
      }
    ]
  })

  // 获取所有标签
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [projects])

  // 过滤项目
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => project.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [projects, searchTerm, selectedTags])

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            探索由社区贡献的基于SiFli芯片的创新开源项目
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6 max-w-md mx-auto">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 rounded-lg blur-sm opacity-0 hover:opacity-30 transition-opacity duration-300"
              animate={{ 
                scale: searchTerm ? [1, 1.02, 1] : 1,
              }}
              transition={{ 
                duration: 2,
                repeat: searchTerm ? Infinity : 0,
                ease: "easeInOut" 
              }}
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <motion.input
                type="text"
                placeholder={t('projects.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 relative z-10 transition-all duration-300 focus:shadow-lg focus:shadow-primary-500/25"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  ×
                </motion.button>
              )}
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <motion.button
              onClick={() => setSelectedTags([])}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTags.length === 0
                  ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600 hover:scale-105'
              }`}
            >
              {t('projects.filter_all')}
            </motion.button>
            
            {allTags.map((tag, index) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 relative overflow-hidden ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
                }`}
              >
                {selectedTags.includes(tag) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <Tag size={14} className="relative z-10" />
                <span className="relative z-10">{tag}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  scale: 0.8,
                  rotateX: -15,
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                viewport={{ once: true, margin: "-50px" }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="col-span-full text-center py-12"
            >
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3 
                }}
              >
                🔍
              </motion.div>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                {t('projects.no_results')}
              </p>
              <motion.p 
                className="text-gray-500 dark:text-gray-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                尝试调整搜索条件或选择其他标签
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection