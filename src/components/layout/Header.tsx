import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Menu, X, Globe, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Header = () => {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(newLang)
  }

  const themeOptions = [
    { key: 'light', label: t('theme.light'), icon: Sun },
    { key: 'dark', label: t('theme.dark'), icon: Moon },
    { key: 'system', label: t('theme.system'), icon: Monitor },
  ] as const

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-700"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gradient">
              {t('site.title')}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              {t('nav.home')}
            </a>
            <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              {t('nav.projects')}
            </a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              {t('nav.about')}
            </a>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
              >
                {theme === 'light' && <Sun size={18} />}
                {theme === 'dark' && <Moon size={18} />}
                {theme === 'system' && <Monitor size={18} />}
              </button>
              
              {isThemeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 py-2 w-40 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700"
                >
                  {themeOptions.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTheme(key)
                        setIsThemeMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-dark-700 flex items-center space-x-2"
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors flex items-center space-x-1"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">
                {i18n.language.toUpperCase()}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-dark-700"
          >
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                {t('nav.home')}
              </a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                {t('nav.projects')}
              </a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                {t('nav.about')}
              </a>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-800 rounded-lg"
                >
                  <Globe size={18} />
                  <span>{i18n.language.toUpperCase()}</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  {themeOptions.map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === key 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 dark:bg-dark-800'
                      }`}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header