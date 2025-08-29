// src/components/common/IngredientModal.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BubbleExplanation from '../IngredientModal/BubbleExplanation'
import PromptComparison from '../IngredientModal/PromptComparison'
import BlankFilling from '../IngredientModal/BlankFilling'
import ResultOutput from '../IngredientModal/ResultOutput'

const IngredientModal = ({ 
  isOpen, 
  onClose, 
  ingredientData,
  onIngredientComplete // 재료가 장바구니로 들어가는 애니메이션 트리거
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedPrompt, setCompletedPrompt] = useState('')
  const [isCompleted, setIsCompleted] = useState(false) // 중복 방지용
  const completedRef = useRef(false) // 추가적인 중복 방지를 위한 ref

  // 단계별 데이터
  const stepData = {
    0: { title: '방법론 설명', component: 'explanation' },
    1: { title: '프롬프트 비교', component: 'comparison' },
    2: { title: '빈칸 채우기', component: 'filling' },
    3: { title: '결과 확인', component: 'result' }
  }

  // 모달이 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setCompletedPrompt('')
      setIsCompleted(false) // 중복 방지 상태 초기화
      completedRef.current = false // ref도 초기화
    }
  }, [isOpen, ingredientData?.id]) // ingredientData.id도 의존성에 추가

  // 단계별 진행 핸들러들
  const handleExplanationComplete = () => {
    setCurrentStep(1)
  }

  const handleComparisonComplete = () => {
    setCurrentStep(2)
  }

  const handleFillingComplete = (prompt) => {
    setCompletedPrompt(prompt)
    setCurrentStep(3)
  }

  const handleResultComplete = () => {
    // 중복 실행 방지 - state와 ref 모두 체크
    if (isCompleted || completedRef.current) {
      console.log('이미 완료된 상태입니다. 중복 실행 방지됨')
      return
    }
    
    // 완료 상태로 설정
    setIsCompleted(true)
    completedRef.current = true
    
    console.log('재료 학습 완료 처리 시작:', ingredientData?.id)
    
    // 장바구니 애니메이션 트리거
    if (onIngredientComplete && ingredientData) {
      onIngredientComplete(ingredientData)
    }
    
    // 모달 닫기
    setTimeout(() => {
      onClose()
    }, 500)
  }

  // 기법별 설명 데이터
  const getExplanationData = (technique) => {
    const explanations = {
      'FEW SHOT 기법': {
        description: "몇 가지 예시를 제시하여 AI가 패턴을 학습하도록 하는 방법입니다. 구체적인 예시들을 보여주면 더 정확한 답변을 얻을 수 있어요!"
      },
      '역할 지정 기법': {
        description: "AI에게 특정 역할이나 전문성을 부여하여 해당 분야의 관점에서 답변하도록 하는 방법입니다. 전문가의 시각으로 더 깊이 있는 답변을 받을 수 있어요!"
      },
      '마크다운 템플릿 1': {
        description: "마크다운 형식으로 구조화된 답변을 요청하는 방법입니다. 정리된 형태의 답변을 받고 싶을 때 유용해요!"
      },
      '마크다운 템플릿 2': {
        description: "복잡한 정보를 마크다운으로 체계적으로 정리해서 받는 고급 기법입니다. 문서화가 필요한 답변에 최적화되어 있어요!"
      }
    }
    
    return explanations[technique] || explanations['FEW SHOT 기법']
  }

  const explanationData = getExplanationData(ingredientData?.technique)

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
              width: '900px',
              height: '700px'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 상단 헤더 */}
            <div className="relative h-20 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6">
              {/* 진행 단계 표시 */}
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  <h2 className="text-xl font-bold">{ingredientData?.name}</h2>
                  <p className="text-blue-100 text-sm">{stepData[currentStep]?.title}</p>
                </div>
              </div>

              {/* 진행률 바 */}
              <div className="flex items-center space-x-2">
                {[0, 1, 2, 3].map((step) => (
                  <motion.div
                    key={step}
                    className={`w-3 h-3 rounded-full ${
                      step <= currentStep ? 'bg-white' : 'bg-blue-300'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: step * 0.1 }}
                  />
                ))}
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
              >
                <span className="text-white font-bold text-lg">×</span>
              </button>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="h-[calc(100%-5rem)]">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="explanation"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <BubbleExplanation
                      technique={ingredientData?.technique}
                      description={explanationData.description}
                      onComplete={handleExplanationComplete}
                    />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <PromptComparison
                      technique={ingredientData?.technique}
                      onComplete={handleComparisonComplete}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="filling"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <BlankFilling
                      technique={ingredientData?.technique}
                      onComplete={handleFillingComplete}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ResultOutput
                      technique={ingredientData?.technique}
                      prompt={completedPrompt}
                      onComplete={handleResultComplete}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IngredientModal