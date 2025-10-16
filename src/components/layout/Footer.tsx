import { useTranslation } from 'react-i18next'
import { Github, ExternalLink } from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()

  const currentYear = new Date().getFullYear()

  const links = [
    { label: t('footer.links.about'), href: '#about' },
    { label: t('footer.links.contact'), href: '#contact' },
    { label: t('footer.links.github'), href: 'https://github.com/SiFliSparks/', external: true }
  ]

  return (
    <footer className="bg-gray-900 dark:bg-dark-950 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-white">
                {t('site.title')}
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/SiFliSparks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={14} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">联系我们</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/SiFliSparks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                <Github size={16} />
                GitHub Organization
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SiFli Sparks. {t('footer.copyright').replace('© 2024', '')}
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-500">
              Made with ❤️ for SiFli Community
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer