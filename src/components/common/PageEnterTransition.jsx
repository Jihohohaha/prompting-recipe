// src/components/common/PageEnterTransition.jsx
import { motion } from 'framer-motion'

const PageEnterTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0,
        scale: 1.02,
        filter: "blur(8px)"
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        filter: "blur(0px)"
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)"
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] // cubic-bezier for smooth feel
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageEnterTransition