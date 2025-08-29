// src/pages/SelectField.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import PageEnterTransition from '../components/common/PageEnterTransition'

const SelectField = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const fieldOptions = [
    { 
      id: 1, 
      title: '종합', 
      path: '/select-ai/study',
      background: '/images/bg-comprehensive.png',
      description: '다양한 AI 도구를 종합적으로 활용'
    },
    { 
      id: 2, 
      title: '예술', 
      path: '/select-ai/art',
      background: '/images/bg-art.png',
      description: '창작과 예술을 위한 AI 도구'
    },
    { 
      id: 3, 
      title: '코딩', 
      path: '/select-ai/search',
      background: '/images/bg-coding.png',
      description: '개발과 프로그래밍을 위한 AI'
    },
    { 
      id: 4, 
      title: '기타', 
      path: '/select-ai',
      background: '/images/bg-other.png',
      description: '그 외 다양한 AI 활용 분야'
    }
  ]

  // 디버깅용
  console.log('Current hovered card:', hoveredCard?.title || 'none')

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* 배경 레이어 - 최하단 */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {/* 기본 그라데이션 배경 */}
        <div 
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{
            background: 'linear-gradient(180deg, #1F1F1F 0%, #1F1F1F 69.04%, #FF2802 138.09%)',
            opacity: hoveredCard ? 0.2 : 1
          }}
        />
        
        {/* 이미지 배경들 */}
        {fieldOptions.map((option) => (
          <div
            key={`bg-${option.id}`}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              backgroundImage: `url(${option.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: hoveredCard?.id === option.id ? 1 : 0,
              transform: hoveredCard?.id === option.id ? 'scale(1)' : 'scale(1.05)',
            }}
          />
        ))}
        
        {/* 다크 오버레이 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Navigation */}
      <div style={{ zIndex: 50 }} className="relative">
        <Navigation />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative h-full flex items-center justify-center" style={{ zIndex: 20 }}>
        <PageEnterTransition className="w-full flex flex-col items-center justify-center px-8">
          {/* 제목 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-white text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              어떤 영감이 필요하세요?
            </h1>
            <motion.p
              className="text-white/90 text-lg drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              분야를 선택하여 맞춤형 AI 도구를 찾아보세요
            </motion.p>
          </motion.div>

          {/* 분야 선택 카드들 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
            {fieldOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.7 + (index * 0.15),
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
                onMouseEnter={() => {
                  console.log('🎯 Hovering:', option.title, 'Background:', option.background)
                  setHoveredCard(option)
                }}
                onMouseLeave={() => {
                  console.log('👋 Leaving card')
                  setHoveredCard(null)
                }}
              >
                <Link to={option.path}>
                  <div className="w-60 h-60 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300">
                    {/* 호버 효과를 위한 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF2802]/20 to-[#FF8A6A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* 카드 내용 */}
                    <div className="relative z-10 text-center p-6">
                      <motion.div 
                        className="w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto group-hover:bg-white/30 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.9 + (index * 0.15) 
                        }}
                      >
                        <div className="w-6 h-6 bg-white/60 rounded transition-all duration-300 group-hover:bg-white/80" />
                      </motion.div>
                      
                      <h3 className="text-white text-xl font-bold group-hover:text-white transition-colors duration-300 mb-2 drop-shadow-lg">
                        {option.title}
                      </h3>
                      
                      <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors duration-300 drop-shadow">
                        {option.description}
                      </p>
                    </div>

                    {/* 글로우 효과 */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-white/5 rounded-xl" />
                      <div className="absolute -inset-2 bg-white/10 rounded-xl blur-xl" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 하단 안내 텍스트 */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <p className="text-white/80 text-sm drop-shadow">
              각 분야별로 최적화된 AI 도구와 프롬프팅 기법을 만나보세요
            </p>
          </motion.div>
        </PageEnterTransition>
      </div>
    </div>
  )
}

export default SelectField