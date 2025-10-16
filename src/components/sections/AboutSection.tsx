import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
// import { Zap, Users, Star, Github } from 'lucide-react'
import { Github } from 'lucide-react'

const AboutSection = () => {
  const { t } = useTranslation()

  // const stats = [
  //   { icon: Zap, label: t('about.stats.projects'), value: '20+' },
  //   { icon: Users, label: t('about.stats.contributors'), value: '100+' },
  //   { icon: Star, label: t('about.stats.stars'), value: '1.5k+' },
  // ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-900">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>
        
        {/* Stats 先不要，数量太少比较尴尬*/}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                <stat.icon className="text-primary-500" size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: '开源精神',
              description: '致力于推广开源文化，促进技术创新和知识共享',
              icon: '🌟'
            },
            {
              title: '技术卓越',
              description: '专注于高质量的SiFli芯片应用解决方案',
              icon: '🚀'
            },
            {
              title: '社区驱动',
              description: '由全球开发者社区共同维护和发展',
              icon: '👥'
            },
            {
              title: '持续创新',
              description: '不断探索新技术，推动行业发展',
              icon: '💡'
            },
            {
              title: '文档完善',
              description: '提供详尽的文档和示例代码',
              icon: '📚'
            },
            {
              title: '活跃支持',
              description: '响应迅速的技术支持和问题解决',
              icon: '🛠️'
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            加入我们的开源社区
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            无论你是经验丰富的开发者还是刚开始接触SiFli芯片，都欢迎加入我们的社区
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://github.com/SiFliSparks"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary px-6 py-3 flex items-center gap-2"
            >
              <Github size={20} />
              访问GitHub
            </motion.a>
            
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary px-6 py-3"
            >
              浏览项目
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection