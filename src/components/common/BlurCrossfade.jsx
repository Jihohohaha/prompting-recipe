// src/components/common/BlurCrossfade.jsx
import { motion } from 'framer-motion'

const BlurCrossfade = ({ isActive, onComplete, duration = 2 }) => {
  if (!isActive) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black"
      initial={{ 
        opacity: 0,
        backdropFilter: "blur(0px)" 
      }}
      animate={{ 
        opacity: 1,
        backdropFilter: "blur(10px)" 
      }}
      transition={{ 
        duration: duration,
        ease: "easeOut"
      }}
      onAnimationComplete={onComplete}
    />
  )
}

export default BlurCrossfade