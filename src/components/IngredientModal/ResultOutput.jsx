// src/components/IngredientModal/ResultOutput.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import chatGPTService from '../../services/chatGPTService'

const ResultOutput = ({ technique, prompt, onComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState('')
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [showStamp, setShowStamp] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setIsLoading(true)
        
        // ChatGPT API 호출
        const result = await chatGPTService.sendPrompt(prompt)
        setResponse(result)
        setIsLoading(false)
        
        // 타이핑 효과 시작
        startTypingEffect(result)
        
      } catch (error) {
        console.error('API 호출 실패:', error)
        setIsLoading(false)
        const fallbackResponse = "훌륭한 프롬프트네요! 구체적이고 명확한 요청으로 좋은 결과를 얻을 수 있겠습니다."
        setResponse(fallbackResponse)
        startTypingEffect(fallbackResponse)
      }
    }

    if (prompt) {
      fetchResponse()
    }
  }, [prompt])

  const startTypingEffect = (text) => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedResponse(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        // 타이핑 완료 후 스탬프 표시
        setTimeout(() => {
          setShowStamp(true)
          // 스탬프 표시 후 완료 처리
          setTimeout(() => {
            onComplete && onComplete()
          }, 2000)
        }, 1000)
      }
    }, 50)
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* 상단 - 작성한 프롬프트 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          📝 작성한 프롬프트
        </h3>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700 text-sm whitespace-pre-wrap">
            {prompt}
          </p>
        </div>
      </motion.div>

      {/* 중간 - AI 응답 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          🤖 ChatGPT 응답
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {displayedResponse}
              {!showStamp && (
                <span className="inline-block w-0.5 h-4 bg-gray-400 ml-1 animate-pulse"></span>
              )}
            </p>
          )}
          
          {/* 학습 완료 스탬프 */}
          <AnimatePresence>
            {showStamp && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="absolute top-4 right-4"
              >
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                  ✅ 학습 완료!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 하단 - 상태 메시지 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-4"
      >
        {isLoading ? (
          <p className="text-gray-500">잠시만 기다려주세요...</p>
        ) : showStamp ? (
          <p className="text-green-600 font-semibold">학습 완료! 곧 장바구니로 이동합니다 🛒</p>
        ) : (
          <p className="text-blue-600">응답을 확인해보세요!</p>
        )}
      </motion.div>
    </div>
  )
}

export default ResultOutput