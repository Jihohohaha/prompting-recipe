// src/components/IngredientModal/BubbleExplanation.jsx
import { motion } from 'framer-motion'

const BubbleExplanation = ({ technique, description, onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      {/* 메인 말풍선 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          damping: 15, 
          stiffness: 300,
          delay: 0.3 
        }}
        className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-blue-200 max-w-md text-center"
      >
        {/* 말풍선 꼬리 */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-b-4 border-r-4 border-blue-200 rotate-45"></div>
        
        {/* 기법 제목 */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl font-bold text-blue-600 mb-4"
        >
          {technique}
        </motion.h3>
        
        {/* 설명 텍스트 */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gray-700 text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* AI 캐릭터 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 400,
          delay: 1.8 
        }}
        className="mt-8 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-2xl">🤖</span>
      </motion.div>

      {/* 다음 단계 버튼 */}
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.3 }}
        onClick={onComplete}
        className="mt-8 px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg"
      >
        프롬프트 비교하기 →
      </motion.button>
    </div>
  )
}

export default BubbleExplanation