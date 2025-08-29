// src/components/common/LoadingScreen.jsx
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 배경 이미지 */}
      <img 
        src="/src/assets/images/tutorial-intro.png" 
        alt="Tutorial Intro" 
        className="w-full h-full object-cover"
      />
      
      {/* 로딩 애니메이션 오버레이 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-2">
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen