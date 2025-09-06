// src/pages/community/community.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '../../components/layout/Navigation'

const Community = () => {
  const communityOptions = [
    {
      title: '이 달의 프롬프팅',
      description: '매월 선정되는 최고의 프롬프트 기법들을 만나보세요',
      path: '/community/monthly-prompting',
      bgColor: 'bg-gradient-to-br from-orange-400 to-red-500',
      icon: '🏆'
    },
    {
      title: 'AI에 관한 글',
      description: 'AI 기술과 프롬프트 엔지니어링에 대한 유용한 정보',
      path: '/community/ai-articles',
      bgColor: 'bg-gradient-to-br from-blue-400 to-purple-500',
      icon: '📚'
    },
    {
      title: 'AI 아트 갤러리',
      description: 'AI로 생성된 창의적인 작품들을 감상해보세요',
      path: '/community/ai-gallery',
      bgColor: 'bg-gradient-to-br from-pink-400 to-purple-600',
      icon: '🎨'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />
      
      <div className="pt-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 
              className="text-5xl font-bold mb-4"
              style={{
                fontFamily: 'Michroma, monospace',
                background: 'linear-gradient(180deg, #FF2802 0%, #FF8A6A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              COMMUNITY
            </h1>
            <p className="text-xl text-gray-600 font-pretendard">
              프롬프트 엔지니어링 커뮤니티에 오신 것을 환영합니다
            </p>
          </motion.div>

          {/* 커뮤니티 옵션 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityOptions.map((option, index) => (
              <motion.div
                key={option.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={option.path}>
                  <div className={`${option.bgColor} rounded-2xl p-8 h-80 flex flex-col justify-between shadow-xl transition-all duration-300 group-hover:shadow-2xl`}>
                    {/* 아이콘 */}
                    <div className="text-6xl mb-4">
                      {option.icon}
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-4 font-pretendard">
                        {option.title}
                      </h3>
                      <p className="text-white/90 font-pretendard leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold transition-all duration-300 group-hover:bg-white/30">
                        탐색하기 →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 하단 통계 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">1,234</div>
              <div className="text-gray-600 font-pretendard">총 회원 수</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">567</div>
              <div className="text-gray-600 font-pretendard">작성된 글</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-2">89</div>
              <div className="text-gray-600 font-pretendard">이달의 프롬프트</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">245</div>
              <div className="text-gray-600 font-pretendard">AI 아트 작품</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Community