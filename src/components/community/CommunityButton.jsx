// src/components/community/CommunityButton.jsx
import { motion } from 'framer-motion'

const CommunityButton = ({ 
  id, 
  title, 
  index, 
  onMouseEnter, 
  onMouseLeave,
  onClick 
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="group relative overflow-hidden bg-transparent text-gray-200/50 hover:text-[#FF6C43] text-9xl font-black tracking-widest py-10 transition-all duration-300 font-pretendard"
    >
      
      {/* 텍스트 */}
      <span className="relative z-10">
        {title}
      </span>
    </motion.button>
  )
}

export default CommunityButton