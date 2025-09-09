// src/pages/SelectAI/Study.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/layout/Navigation'
import AICard from '../../components/common/AICard'
import CircleExpandTransition from '../../components/common/CircleExpandTransition'

const DEBUG = 1
const dbg = (cls) => (DEBUG ? cls : "")

const Study = () => {
  const navigate = useNavigate()
  
  // 트랜지션 관련 상태
  const [showTransition, setShowTransition] = useState(false)
  const [clickPosition, setClickPosition] = useState(null)
  const [selectedAI, setSelectedAI] = useState(null)
  
  const studyAIs = [
    { id: 1, title: "ChatGPT",    description: "학습 질문과 답변에 최적화된 AI 어시스턴트" },
    { id: 2, title: "Claude",     description: "깊이 있는 분석과 설명이 필요한 학습에 특화" },
    { id: 3, title: "Perplexity", description: "실시간 검색과 연구 자료 수집에 강력한 AI" },
    { id: 4, title: "Gemini",     description: "다양한 학습 자료 통합 분석 전문 AI" }
  ]

  const cardFront = {
    ChatGPT: '/images/chatgpt-logo.png',   // ← 제공한 이미지 파일 경로
    Claude: '/images/claude-logo.png',
    Perplexity: '/images/perplexity-logo.png',
    Gemini: '/images/gemini-logo.png',
  };

  const cardBack = {
  ChatGPT: '/images/chatgpt-facts.png',   // ← 제공한 이미지 파일 경로
  Claude: '/images/claude-facts.png',
  Perplexity: '/images/perplexity-facts.png',
  Gemini: '/images/gemini-facts.png',
  };

  const handleAIClick = (ai, event) => {
    const clickX = event.clientX
    const clickY = event.clientY
    setClickPosition({ x: clickX, y: clickY })
    setSelectedAI(ai)
    setShowTransition(true)
  }

  const handleTransitionComplete = () => {
    if (selectedAI?.title === "ChatGPT") {
      navigate('/chatgpt-tutorial')
    } else {
      console.log(`${selectedAI?.title} 학습 페이지로 이동`)
    }
  }

  return (
    <>
      <div className={`h-screen w-full bg-black overflow-hidden relative ${dbg('border border-yellow-500/60')}`}>
        {/* ✅ Navigation에만 dbg 추가 */}
        <Navigation className={`relative ${dbg('border border-amber-500/60')}`} />
        
        <div className={`relative h-full flex items-start justify-center mt-16 z-20 ${dbg('border border-lime-500/60')}`}>
          {/* ✅ 내부 컨테이너에 dbg 추가 */}
          <div className={`min-w-[1000px] ${dbg('border border-emerald-500/60')}`}>
            {/* Header Section */}
            <div className={`flex flex-col h-[224px] items-center ${dbg('border border-cyan-500/60')}`}>
              <motion.div
                className={`relative flex flex-col h-[120px] items-center justify-center ${dbg('border border-fuchsia-500/60')}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className={`text-white text-[40px] font-pretendard font-bold ${dbg('border border-indigo-500/60')}`}>
                  종합
                </h1>
              </motion.div>
              {/* ✅ 설명문에도 dbg 추가 */}
              <motion.p
                className={`text-center text-white/90 text-lg ${dbg('border border-sky-500/60')}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                카테고리에 맞는 가장 좋은 AI 추천
              </motion.p>
            </div>

            {/* ✅ 그리드에 dbg 추가 + 카드 외곽 래퍼에만 dbg (카드 컴포넌트 내부는 그대로) */}
            <div className="grid grid-cols-4 gap-[16px] auto-rows-[500px]">
              {studyAIs.map((ai, index) => (
                <AICard
                  key={ai.id}
                  title={ai.title}
                  subtitle={ai.description}
                  frontImageSrc={cardFront[ai.title]} // ← 앞면 이미지 경로
                  backImageSrc={cardBack[ai.title]}   // ← 여기 값이 실제로 로드되는지 확인
                  className="h-[500px] w-[240px]"
                  onClick={(e) => handleAIClick(ai, e)}
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
