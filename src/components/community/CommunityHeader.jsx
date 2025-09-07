// src/components/community/CommunityHeader.jsx
import { motion } from 'framer-motion'

const CommunityHeader = () => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
      
      {/* PRommpting [RECIPE] 텍스트 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[_#FF6C43_] font-stretch">
          PRommpting <br/>[RECIPE]
        </h1>
      </motion.div>

      {/* 커뮤니티 텍스트 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white bg-opacity-60 backdrop-blur-sm rounded-full px-24  py-3"
      >
        <span className="text-white text-2xl font-medium">
          커뮤니티
        </span>
      </motion.div>
    </div>
  )
}

export default CommunityHeader