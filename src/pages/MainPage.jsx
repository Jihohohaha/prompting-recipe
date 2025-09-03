// src/pages/MainPage.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navigation from '../components/layout/Navigation'
import PageEnterTransition from '../components/common/PageEnterTransition'
import StaggerFillText from '../components/common/StaggerFillText'
import '../styles/App.css'

const MainPage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 페이지 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 튜토리얼 카드 데이터
  const tutorialCards = [
    {
      id: 1,
      title: "ChatGPT 프롬프트 엔지니어링",
      description: "기본적인 프롬프트 작성부터 고급 기법까지 체계적으로 학습하세요",
      difficulty: "초급",
      duration: "30분",
      image: "/src/assets/images/chatgpt-tutorial-bg.png",
      path: "/chatgpt-tutorial",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "AI 도구별 특화 가이드",
      description: "다양한 AI 도구들의 특성에 맞는 프롬프트 기법을 배워보세요",
      difficulty: "중급",
      duration: "45분",
      image: "/src/assets/images/background.png",
      path: "/select-ai",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "실전 프롬프트 퀴즈",
      description: "객관식 문제를 통해 학습한 내용을 점검해보세요",
      difficulty: "중급",
      duration: "20분",
      image: "/src/assets/images/mosaic.png",
      path: "/select-field",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "커뮤니티 챌린지",
      description: "다른 학습자들과 함께 프롬프트 작성 실력을 겨뤄보세요",
      difficulty: "고급",
      duration: "자유",
      image: "/src/assets/images/statue.png",
      path: "/community/information",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const handleCardClick = (path) => {
    navigate(path)
  }

  const handleLogoutClick = async () => {
    try {
      await logout()
      // 로그아웃 후에도 메인 페이지에 머무름 (기존 동작 유지)
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <PageEnterTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* 네비게이션 */}
        <Navigation />
        
        {/* 메인 컨텐츠 */}
        <main className="pt-20 pb-12 px-4">
          {/* 웰컴 섹션 */}
          <section className="max-w-6xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <StaggerFillText
                  text={isAuthenticated ? "환영합니다!" : "프롬프트 엔지니어링을 배워보세요!"}
                  className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                />
              </h1>
              
              {isAuthenticated ? (
                // 로그인한 사용자
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <p className="text-xl text-gray-600">
                    <strong>{user?.name || '사용자'}</strong>님의 프롬프트 엔지니어링 여정을 시작하세요
                  </p>
                </div>
              ) : (
                // 로그인하지 않은 사용자
                <div className="mb-6">
                  <p className="text-xl text-gray-600 mb-4">
                    AI와 효과적으로 소통하는 방법을 배워보세요
                  </p>
                  <button
                    onClick={handleLoginClick}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    로그인하고 개인화 서비스 이용하기
                  </button>
                </div>
              )}
              
              <p className="text-gray-500 max-w-2xl mx-auto">
                AI와 효과적으로 소통하는 방법을 배우고, 원하는 결과를 얻는 프롬프트 작성 기술을 마스터하세요.
                {!isAuthenticated && " 로그인 없이도 모든 학습 콘텐츠를 이용할 수 있습니다."}
              </p>
            </motion.div>

            {/* 로그인한 사용자 정보 카드 */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto mb-12"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{user?.name || '사용자'}</h3>
                      <p className="text-sm text-gray-500">{user?.email || '이메일 없음'}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              </motion.div>
            )}
          </section>

          {/* 학습 모듈 그리드 */}
          <section className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold text-center mb-12 text-gray-800"
            >
              학습 모듈 선택하기
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tutorialCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  onClick={() => handleCardClick(card.path)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* 카드 이미지/배경 */}
                    <div className={`h-48 bg-gradient-to-br ${card.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {card.difficulty}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 text-white">
                        <span className="text-sm opacity-80">{card.duration}</span>
                      </div>
                    </div>

                    {/* 카드 내용 */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {card.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-500 font-medium group-hover:text-orange-600 transition-colors">
                          학습 시작하기 →
                        </span>
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 하단 CTA 섹션 */}
          <section className="max-w-4xl mx-auto mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                프롬프트 엔지니어링 마스터가 되어보세요!
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                체계적인 학습 과정을 통해 AI 활용 능력을 한 단계 업그레이드하고, 
                더 효과적으로 원하는 결과를 얻어보세요.
              </p>
              <button
                onClick={() => navigate('/tutorial-gpt')}
                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
              >
                지금 시작하기
              </button>
            </motion.div>
          </section>
        </main>
      </div>
    </PageEnterTransition>
  )
}

export default MainPage