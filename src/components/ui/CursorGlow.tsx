import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('cursor-glow')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      {/* 主光标 */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* 光晕效果 */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-40"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-full h-full bg-primary-500 rounded-full blur-md" />
      </motion.div>

      {/* 尾迹效果 */}
      <motion.div
        className="fixed w-12 h-12 pointer-events-none z-30"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
        }}
        animate={{
          scale: isHovering ? 1.5 : 0.8,
          opacity: isHovering ? 0.4 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-primary-400 to-blue-400 rounded-full blur-lg" />
      </motion.div>
    </>
  )
}

export default CursorGlow