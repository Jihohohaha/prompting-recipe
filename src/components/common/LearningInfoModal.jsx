// src/components/common/LearningInfoModal.jsx
import { motion } from 'framer-motion'

const LearningInfoModal = ({ 
  isVisible, 
  aiInfo, 
  onComplete,
  duration = 3000 // 3초 동안 표시
}) => {
  if (!isVisible || !aiInfo) return null

  // 자동으로 모달 닫기
  setTimeout(() => {
    onComplete()
  }, duration)

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pb-20">
      <motion.div
        className="bg-white rounded-t-3xl shadow-2xl max-w-md w-full mx-4"
        initial={{ 
          y: '100%',
          opacity: 0
        }}
        animate={{ 
          y: 0,
          opacity: 1
        }}
        exit={{ 
          y: '100%',
          opacity: 0
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.6
        }}
      >
        {/* 모달 헤더 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {aiInfo.title}
          </h2>
        </div>

        {/* 모달 콘텐츠 */}
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {aiInfo.title.charAt(0)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                주요 특징
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {aiInfo.features}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                학습 방법
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {aiInfo.learningMethod}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                활용 팁
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {aiInfo.tips}
              </p>
            </div>
          </div>

          {/* 진행 표시 바 */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              잠시 후 학습 페이지로 이동합니다...
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LearningInfoModal