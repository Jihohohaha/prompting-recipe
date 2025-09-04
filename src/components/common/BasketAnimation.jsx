// src/components/common/BasketAnimation.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const BasketAnimation = ({ 
  triggerAnimation, 
  ingredientData, 
  basketPosition,
  ingredientPosition 
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (triggerAnimation && ingredientData) {
      setIsAnimating(true)
      
      // 애니메이션 완료 후 성공 표시
      setTimeout(() => {
        setIsAnimating(false)
        setShowSuccess(true)
        
        // 성공 메시지 2초 후 숨기기
        setTimeout(() => {
          setShowSuccess(false)
        }, 2000)
      }, 1500)
    }
  }, [triggerAnimation, ingredientData])

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      <AnimatePresence>
        {isAnimating && ingredientData && (
          <>
            {/* 재료 이미지 애니메이션 */}
            <motion.div
              initial={{
                x: ingredientPosition.x,
                y: ingredientPosition.y,
                scale: 1,
                opacity: 1
              }}
              animate={{
                x: basketPosition.x,
                y: basketPosition.y,
                scale: 0.3,
                opacity: 0.8
              }}
              exit={{ 
                opacity: 0,
                scale: 0 
              }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute"
              style={{
                width: '80px',
                height: '80px'
              }}
            >
              <img 
                src={ingredientData.image} 
                alt={ingredientData.name}
                className="w-full h-full object-contain"
              />
              
              {/* 반짝임 효과 */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1.5, 
                  opacity: 1 
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  repeat: 2,
                  repeatType: "reverse",
                  delay: 0.3
                }}
                className="absolute inset-0 bg-yellow-300 rounded-full opacity-50"
              />
            </motion.div>

            {/* 파티클 효과 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: basketPosition.x,
                  y: basketPosition.y,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: basketPosition.x + (Math.random() - 0.5) * 100,
                  y: basketPosition.y + (Math.random() - 0.5) * 100,
                  scale: 1,
                  opacity: 0
                }}
                transition={{
                  duration: 1,
                  delay: 1.2 + i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              />
            ))}
          </>
        )}

        {/* 성공 메시지 */}
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="font-bold">{ingredientData?.name} 학습 완료!</h3>
                <p className="text-green-100 text-sm">{ingredientData?.technique}을 익혔습니다</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BasketAnimation