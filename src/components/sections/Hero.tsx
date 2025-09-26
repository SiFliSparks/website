import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 高级动态背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-primary-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
        
        {/* 动态光效 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* 螺旋粒子效果 */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`spiral-${i}`}
            className="absolute w-2 h-2 bg-primary-500 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              rotate: [0, 360],
              x: [0, Math.cos(i * 30 * Math.PI / 180) * 200],
              y: [0, Math.sin(i * 30 * Math.PI / 180) * 200],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* 流动线条 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d="M0,300 Q400,100 800,300 T1600,300"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 3, delay: 1 }}
          />
          <motion.path
            d="M0,500 Q600,200 1200,500 T2400,500"
            stroke="url(#lineGradient2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 4, delay: 1.5 }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#23B9E8" stopOpacity="0" />
              <stop offset="50%" stopColor="#23B9E8" stopOpacity="1" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
              <stop offset="100%" stopColor="#23B9E8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="relative inline-block">
                <span className="text-gradient flex items-center justify-center gap-3 relative z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Sparkles className="text-primary-500" size={48} />
                  </motion.div>
                  {t('hero.title')}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Zap className="text-primary-500" size={48} />
                  </motion.div>
                </span>
                
                {/* 文字发光效果 */}
                <motion.div
                  className="absolute inset-0 text-gradient blur-sm opacity-50"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <Sparkles className="text-primary-500" size={48} />
                    {t('hero.title')}
                    <Zap className="text-primary-500" size={48} />
                  </span>
                </motion.div>
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('hero.subtitle')}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl font-semibold text-primary-500 mb-6"
            >
              {t('hero.highlight')}
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div className="relative">
              {/* 按钮光环效果 */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 rounded-lg blur-lg opacity-70"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.a
                href="#projects"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(35, 185, 232, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative btn btn-primary px-8 py-4 text-lg flex items-center gap-2 group bg-gradient-to-r from-primary-500 to-blue-600 border-0"
                style={{ filter: 'brightness(1.1)' }}
              >
                <span className="relative z-10">{t('hero.cta.explore')}</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <ArrowRight size={20} />
                </motion.div>
                
                {/* 按钮内光效 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.a>
            </motion.div>
            
            <motion.a
              href="#about"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(35, 185, 232, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary px-8 py-4 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">{t('hero.cta.learn_more')}</span>
              
              {/* Hover光效 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
            >
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-primary-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero