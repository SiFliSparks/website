import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import ProjectsSection from './components/sections/ProjectsSection'
import AboutSection from './components/sections/AboutSection'
import Footer from './components/layout/Footer'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟初始化加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-dark-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main>
          <Hero />
          <ProjectsSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App