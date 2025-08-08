// src/components/layout/TutorialMainScreen.jsx
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMessage, 
  faPaperPlane,
  faUser,
  faMicrophone,
  faImage
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const TutorialMainScreen = () => {
  const [inputValue, setInputValue] = useState('')

  const chatRooms = [
    "Few shot 기법",
    "역할 지정 기법",
    "마크다운을 활용한 템플릿1: 내용 구성과 출력 형식에 초점",
    "마크다운을 활용한 템플릿 2: 작업 순서에 초점",
    "Chain of Thought(CoT) 기법",
    "ReAct 기법"
  ]

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      console.log('Message sent:', inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 좌측 사이드바 */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
        {/* 채팅방 목록 */}
        <div className="flex-1 px-4 pt-4 space-y-2 overflow-y-auto">
          {chatRooms.map((room, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-200 rounded-lg transition-colors group"
            >
              <FontAwesomeIcon icon={faMessage} className="text-gray-500 text-sm" />
              <span className="text-gray-700 text-sm truncate">{room}</span>
            </motion.button>
          ))}
        </div>

        {/* 사용자 프로필 */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <div className="text-gray-800 text-sm font-medium">Park</div>
              <div className="text-gray-500 text-xs">Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col bg-white">
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              이 맛에 AI한다
            </h1>
            <h2 className="text-2xl text-gray-600">
              프롬프트 엔지니어링
            </h2>
          </motion.div>

          {/* 입력창 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl"
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="무엇이든 물어보세요"
                  className="flex-1 px-6 py-4 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
                />
                
                {/* 입력창 우측 버튼들 */}
                <div className="flex items-center gap-2 pr-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faImage} />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faMicrophone} />
                  </button>
                  
                  {inputValue.trim() && (
                    <motion.button
                      type="submit"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </motion.button>
                  )}
                </div>
              </div>
            </form>

            {/* 하단 안내 텍스트 */}
            <p className="text-xs text-gray-500 text-center mt-4">
              ChatGPT는 실수를 할 수 있습니다. 중요한 정보를 확인하세요.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TutorialMainScreen