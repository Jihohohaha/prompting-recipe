// src/components/IngredientModal/BlankFilling.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BlankFilling = ({ technique, onComplete }) => {
  const [blankValues, setBlankValues] = useState(['', ''])
  const [showComplete, setShowComplete] = useState(false)

  // 기법별 프롬프트 템플릿
  const getPromptTemplate = (technique) => {
    const templates = {
      'FEW SHOT 기법': {
        template: "다음 예시들을 참고해서 JavaScript 함수를 작성해줘:\n\n예시 1: 덧셈 함수\nfunction add(a, b) { return a + b; }\n\n예시 2: 곱셈 함수\nfunction multiply(a, b) { return a * b; }\n\n이제 [BLANK_0] 함수를 작성해줘",
        blanks: ["나눗셈"],
        placeholders: ["어떤 연산 함수를 만들까요? (예: 나눗셈, 빼기)"]
      },
      '역할 지정 기법': {
        template: "당신은 10년 경력의 [BLANK_0] 전문가입니다. [BLANK_1] 업계에서 신제품을 출시할 때 효과적인 마케팅 전략을 단계별로 제시해주세요.",
        blanks: ["디지털 마케팅", "IT"],
        placeholders: ["어떤 전문가인가요?", "어떤 업계인가요?"]
      }
    }
    
    return templates[technique] || templates['FEW SHOT 기법']
  }

  const promptTemplate = getPromptTemplate(technique)

  const handleBlankChange = (index, value) => {
    const newValues = [...blankValues]
    newValues[index] = value
    setBlankValues(newValues)
  }

  const handleComplete = () => {
  // 첫 번째 빈칸만 체크 (더 단순하게)
  if (blankValues[0] && blankValues[0].trim() !== '') {
    setShowComplete(true)
    
    // 완성된 프롬프트 생성
    let completedPrompt = promptTemplate.template
    completedPrompt = completedPrompt.replace('[BLANK_0]', blankValues[0])
    
    // 2초 후에 다음 단계로
    setTimeout(() => {
      onComplete(completedPrompt)
    }, 2000)
  } else {
    console.log('빈칸이 비어있습니다:', blankValues) // 디버깅용
  }
}

  const renderPromptWithBlanks = () => {
    const parts = promptTemplate.template.split(/(\[BLANK_\d+\])/)
    
    return parts.map((part, index) => {
      const blankMatch = part.match(/\[BLANK_(\d+)\]/)
      
      if (blankMatch) {
        const blankIndex = parseInt(blankMatch[1])
        return (
          <motion.input
            key={index}
            type="text"
            value={blankValues[blankIndex] || ''}
            onChange={(e) => handleBlankChange(blankIndex, e.target.value)}
            placeholder={promptTemplate.placeholders[blankIndex]}
            className="inline-block mx-1 px-3 py-1 bg-yellow-100 border-2 border-yellow-300 rounded-md focus:outline-none focus:border-yellow-500 min-w-32"
            style={{ width: `${Math.max(blankValues[blankIndex]?.length || 0, 10)}ch` }}
            whileFocus={{ scale: 1.05 }}
          />
        )
      }
      
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="p-8 h-full flex flex-col">
      {/* 상단 안내 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-2">빈칸을 채워주세요!</h3>
        <p className="text-gray-600">아래 프롬프트의 노란색 빈칸을 채워서 완성해보세요.</p>
      </motion.div>

      {/* 프롬프트 영역 */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 bg-white border-2 border-gray-200 rounded-lg p-6 overflow-y-auto"
      >
        <div className="text-sm text-gray-500 mb-2">완성할 프롬프트:</div>
        <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
          {renderPromptWithBlanks()}
        </div>
      </motion.div>

      {/* 완료 애니메이션 */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-green-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 200 
              }}
              className="bg-white rounded-full p-8 shadow-2xl"
            >
              <div className="text-6xl text-green-500">✨</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 버튼 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center"
      >
        <button
            onClick={handleComplete}
            disabled={blankValues[0]?.trim() === '' || showComplete} // 첫 번째 빈칸만 체크
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
                blankValues[0]?.trim() !== '' && !showComplete
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {showComplete ? '프롬프트 완성! ✨' : '프롬프트 완성하기'}
        </button>
      </motion.div>
    </div>
  )
}

export default BlankFilling