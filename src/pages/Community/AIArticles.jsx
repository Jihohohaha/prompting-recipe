// src/pages/community/AIArticles.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '../../components/layout/Navigation'

const AIArticles = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="pt-20 px-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/community" 
              className="text-blue-600 hover:text-blue-700 mb-4 inline-block font-pretendard"
            >
              ← 커뮤니티로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-pretendard">
              📚 AI에 관한 글
            </h1>
            <p className="text-xl text-gray-600 font-pretendard">
              AI 기술과 프롬프트 엔지니어링에 대한 깊이 있는 이야기
            </p>
          </motion.div>

          {/* 콘텐츠 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-pretendard">
                곧 공개됩니다!
              </h2>
              <p className="text-gray-600 font-pretendard">
                AI에 관한 글 페이지가 준비 중입니다.<br/>
                전문가들의 인사이트와 유용한 정보로 찾아뵙겠습니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AIArticles