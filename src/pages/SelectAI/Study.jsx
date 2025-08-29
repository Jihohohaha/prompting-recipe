// src/pages/SelectAI/Study.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/layout/Navigation'
import AICard from '../../components/common/AICard'
import CircleExpandTransition from '../../components/common/CircleExpandTransition'

const Study = () => {
  const navigate = useNavigate()
  
  // 트랜지션 관련 상태
  const [showTransition, setShowTransition] = useState(false)
  const [clickPosition, setClickPosition] = useState(null)
  const [selectedAI, setSelectedAI] = useState(null)
  
  const studyAIs = [
    {
      id: 1,
      title: "ChatGPT",
      description: "학습 질문과 답변에 최적화된 AI 어시스턴트"
    },
    {
      id: 2,
      title: "Claude",
      description: "깊이 있는 분석과 설명이 필요한 학습에 특화"
    },
    {
      id: 3,
      title: "Perplexity",
      description: "실시간 검색과 연구 자료 수집에 강력한 AI"
    },
    {
      id: 4,
      title: "Gemini",
      description: "다양한 학습 자료 통합 분석 전문 AI"
    }
  ]

  const handleAIClick = (ai, event) => {
    // 실제 마우스 클릭 위치 저장
    const clickX = event.clientX
    const clickY = event.clientY
    
    setClickPosition({ x: clickX, y: clickY })
    setSelectedAI(ai)
    setShowTransition(true)
  }

  const handleTransitionComplete = () => {
    // 원형 확산 완료 후 바로 해당 페이지로 이동
    if (selectedAI?.title === "ChatGPT") {
      navigate('/chatgpt-tutorial')
    } else {
      console.log(`${selectedAI?.title} 학습 페이지로 이동`)
      // 향후 다른 AI들의 페이지 구현
    }
  }

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-b from-[#FF6237] to-[#FFFCAB] overflow-hidden">
        <Navigation />
        
        <div className="h-full flex flex-col justify-center items-center px-8">
          <div className="w-full max-w-4xl">
            {/* Header Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-6xl font-bold text-white mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                학습, 공부
              </motion.h1>
              
              <motion.p
                className="text-white/90 text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                카테고리에 맞는 가장 좋은 AI 추천
              </motion.p>
            </motion.div>

            {/* AI Cards Section */}
            <div className="grid grid-cols-4 gap-6">
              {studyAIs.map((ai, index) => (
                <AICard
                  key={ai.id}
                  title={ai.title}
                  description={ai.description}
                  onClick={(event) => handleAIClick(ai, event)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 원형 확산 트랜지션 */}
      <CircleExpandTransition
        isActive={showTransition}
        clickPosition={clickPosition}
        onComplete={handleTransitionComplete}
        duration={1.2}
        backgroundColor="#000000"
      />
    </>
  )
}

export default Study