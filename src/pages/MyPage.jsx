// src/pages/MyPage.jsx
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import Navigation from '../components/layout/Navigation'

const MyPage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />
      
      <div className="pt-20 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8">마이 페이지</h1>
            
            {/* 사용자 정보 */}
            <div className="flex items-center mb-8">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6"
                style={{
                  background: 'linear-gradient(135deg, #FF2802 0%, #FF8A6A 100%)'
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{user?.name || '사용자'}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            {/* 학습 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">완료한 튜토리얼</h3>
                <p className="text-3xl font-bold text-orange-600">0</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">학습 시간</h3>
                <p className="text-3xl font-bold text-red-600">0h</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">획득 포인트</h3>
                <p className="text-3xl font-bold text-yellow-600">0P</p>
              </div>
            </div>

            {/* 최근 학습 기록 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">최근 학습 기록</h3>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600">아직 학습 기록이 없습니다.</p>
                <p className="text-sm text-gray-500 mt-2">프롬프트 엔지니어링 학습을 시작해보세요!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MyPage