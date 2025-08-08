// src/components/common/AICard.jsx
import { motion } from 'framer-motion'

const AICard = ({ title, description, onClick, index }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 h-64 w-full flex flex-col justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed px-2">
          {description}
        </p>
      </div>
      
      <motion.div
        className="mt-6 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mx-auto w-3/4"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default AICard