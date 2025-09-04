// src/components/IngredientModal/PromptComparison.jsx
import { motion } from 'framer-motion'

const PromptComparison = ({ technique, onComplete }) => {
  // 기법별 예시 프롬프트 데이터
  const getPromptData = (technique) => {
    const promptExamples = {
      'FEW SHOT 기법': {
        bad: "코딩을 잘하는 방법을 알려줘",
        good: "다음 예시들을 참고해서 JavaScript 함수를 작성해줘:\n\n예시 1: 덧셈 함수\nfunction add(a, b) { return a + b; }\n\n예시 2: 곱셈 함수\nfunction multiply(a, b) { return a * b; }\n\n이제 [____] 함수를 작성해줘",
        blanks: ["나눗셈"]
      },
      '역할 지정 기법': {
        bad: "마케팅 전략을 짜줘",
        good: "당신은 10년 경력의 [____] 전문가입니다. [____] 업계에서 신제품을 출시할 때 효과적인 마케팅 전략을 단계별로 제시해주세요.",
        blanks: ["디지털 마케팅", "IT"]
      }
    }
    
    return promptExamples[technique] || promptExamples['FEW SHOT 기법']
  }

  const promptData = getPromptData(technique)

  return (
    <div className="flex h-full">
      {/* 좌측 - 안 좋은 예시 */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-1/2 p-6 bg-red-50 border-r-2 border-gray-200"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
            ❌ 안 좋은 예시
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-200">
          <div className="text-gray-600 text-sm mb-2">프롬프트:</div>
          <p className="text-gray-800 leading-relaxed">
            {promptData.bad}
          </p>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="mt-4 p-4 bg-red-100 rounded-lg"
        >
          <p className="text-red-700 text-sm">
            💡 이런 프롬프트는 너무 모호해서 원하는 답변을 얻기 어려워요!
          </p>
        </motion.div>
      </motion.div>

      {/* 우측 - 좋은 예시 */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-1/2 p-6 bg-green-50"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
            ✅ 좋은 예시
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
          <div className="text-gray-600 text-sm mb-2">프롬프트:</div>
          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
            {promptData.good.split('[____]').map((part, index) => (
              <span key={index}>
                {part}
                {index < promptData.blanks.length && (
                  <span className="bg-yellow-200 px-2 py-1 rounded border-2 border-dashed border-yellow-400 mx-1">
                    [빈칸 {index + 1}]
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="mt-4 p-4 bg-green-100 rounded-lg"
        >
          <p className="text-green-700 text-sm">
            💡 구체적이고 예시가 있어서 훨씬 좋은 답변을 얻을 수 있어요!
          </p>
        </motion.div>
      </motion.div>

      {/* 하단 버튼 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg"
        >
          빈칸 채우기 시작 →
        </button>
      </motion.div>
    </div>
  )
}

export default PromptComparison