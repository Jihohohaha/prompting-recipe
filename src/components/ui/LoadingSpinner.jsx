// src/components/ui/LoadingSpinner.jsx
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', color = 'orange' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    orange: 'border-orange-500',
    gray: 'border-gray-400',
    white: 'border-white'
  }

  return (
    <motion.div
      className={`
        ${sizeClasses[size]}
        border-2 border-transparent 
        ${colorClasses[color]}
        border-t-transparent
        rounded-full
      `}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

export default LoadingSpinner