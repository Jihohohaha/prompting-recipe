// src/pages/SelectField.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import PageEnterTransition from '../components/common/PageEnterTransition'

const SelectField = () => {
  const fieldOptions = [
    { id: 1, title: '학습', path: '/select-ai/study' },
    { id: 2, title: '예술', path: '/select-ai/art' },
    { id: 3, title: '검색', path: '/select-ai/search' },
    { id: 4, title: '기타', path: '/select-ai' }
  ]

  return (
    <PageEnterTransition className="w-full h-screen overflow-hidden">
      {/* Navigation - 고정 네비게이션 */}
      <Navigation />

      {/* 분야 선택 섹션 - 전체 화면 */}
      <section 
        className="w-full h-screen relative flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1F1F1F 0%, #1F1F1F 69.04%, #FF2802 138.09%)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8">
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
              className="text-white/70 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              분야를 선택하여 맞춤형 AI 도구를 찾아보세요
            </motion.p>
          </motion.div>

          {/* 분야 선택 카드들 */}
          <div className="flex gap-8 justify-center flex-wrap">
            {fieldOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.7 + (index * 0.15), // 카드별 순차 등장
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
              >
                <Link to={option.path}>
                  <div className="w-60 h-60 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
                    {/* 호버 효과를 위한 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF2802] to-[#FF8A6A] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    {/* 카드 내용 */}
                    <div className="relative z-10 text-center">
                      <motion.div 
                        className="w-20 h-20 bg-gray-400 rounded-full mb-4 mx-auto group-hover:bg-white transition-colors duration-300"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.9 + (index * 0.15) 
                        }}
                      />
                      <h3 className="text-gray-700 text-xl font-semibold group-hover:text-gray-900 transition-colors duration-300">
                        {option.title}
                      </h3>
                    </div>

                    {/* 호버시 나타나는 테두리 효과 */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF2802] rounded-lg transition-all duration-300" />
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
            <p className="text-white/60 text-sm">
              각 분야별로 최적화된 AI 도구와 프롬프팅 기법을 만나보세요
            </p>
          </motion.div>
        </div>
      </section>
    </PageEnterTransition>
  )
}

export default SelectField