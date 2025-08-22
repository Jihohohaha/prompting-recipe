// src/components/common/IngredientModal.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IngredientModal = ({ 
  isOpen, 
  onClose, 
  ingredientData 
}) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // 초기 메시지들 (재료별로 다르게 설정 가능)
  const getInitialMessages = () => [
    { id: 1, type: 'bot', text: '안녕하세요! 저는 AI 요리사입니다.', delay: 500 },
    { id: 2, type: 'user', text: '안녕하세요!', delay: 1500 },
    { id: 3, type: 'bot', text: `${ingredientData?.name || '재료'}에 대해 궁금한 것이 있으신가요?`, delay: 2500 }
  ]

  useEffect(() => {
    if (isOpen && ingredientData) {
      setMessages([])
      setInputValue('')
      setIsTyping(false)
      
      const initialMessages = getInitialMessages()
      
      // 모달이 열릴 때 초기 메시지들을 순차적으로 표시
      initialMessages.forEach((message) => {
        setTimeout(() => {
          setMessages(prev => [...prev, message])
        }, message.delay)
      })
    }
  }, [isOpen, ingredientData])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // TODO: GPT API 호출 로직
    // 현재는 더미 응답
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: `${ingredientData?.technique || '기법'}에 관련된 좋은 질문이네요! 더 자세히 설명드릴게요.`
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: '800px',
              height: '600px'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
            >
              <span className="text-gray-600 font-bold text-lg">×</span>
            </button>

            {/* 첫 번째 컨테이너: 헤더 영역 */}
            <div className="relative h-32 bg-gradient-to-r from-orange-300 to-yellow-200 flex items-center justify-center">
              {/* 기법 이름 컨테이너 (뒤쪽) */}
              <div 
                className="absolute bg-yellow-300 rounded-full px-6 py-2 shadow-md"
                style={{
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1
                }}
              >
                <span className="text-sm font-medium text-gray-800">
                  {ingredientData?.technique || 'FEW SHOT 기법'}
                </span>
              </div>

              {/* 재료 이름 컨테이너 (앞쪽) */}
              <div 
                className="absolute bg-white rounded-lg px-8 py-3 shadow-lg border-2 border-gray-200"
                style={{
                  top: '45px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2
                }}
              >
                <span className="text-xl font-bold text-gray-800">
                  {ingredientData?.name || '밀가루'}
                </span>
              </div>

              {/* 간단한 멘트 */}
              <div 
                className="absolute bg-white rounded-full px-6 py-2 shadow-md"
                style={{
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1
                }}
              >
                <span className="text-sm text-gray-600">
                  {ingredientData?.description || '첫번째 방법론에 대해 알려드렸습니다.'}
                </span>
              </div>
            </div>

            {/* 두 번째 컨테이너: 대화 영역 */}
            <div className="h-80 bg-gray-50 p-6 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border'
                      }`}
                    >
                      {message.type === 'bot' && (
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-bold">AI</span>
                          </div>
                          <span className="text-xs text-gray-500">AI 요리사</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* 타이핑 인디케이터 */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none border px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* 세 번째 컨테이너: 입력 영역 */}
            <div className="h-20 bg-white border-t border-gray-200 flex items-center px-6">
              <div className="flex-1 flex items-center space-x-3">
                {/* 재료 아이콘 */}
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  {ingredientData?.image ? (
                    <img 
                      src={ingredientData.image} 
                      alt="ingredient" 
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">🥣</span>
                  )}
                </div>
                
                {/* 입력창 */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="비어 있는 말풍선을 채워주세요."
                    className="w-full px-4 py-3 bg-gray-100 rounded-full border-none outline-none text-sm placeholder-gray-500"
                  />
                </div>

                {/* 전송 버튼 */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    inputValue.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IngredientModal