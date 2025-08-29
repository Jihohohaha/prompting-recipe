// src/pages/LoginPage.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-red-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-red-300 rounded-full blur-xl"></div>
      </div>

      {/* 로고 및 제목 섹션 */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
        {/* 왼쪽: 로고 및 소개 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="mb-8">
            <motion.h1 
              className="text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                PRomptinG
              </span>
            </motion.h1>
            <motion.h2 
              className="text-5xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              [RECIPE]
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              AI는 <span className="font-semibold text-orange-600">재료</span>고, 
              사용자가 <span className="font-semibold text-orange-600">요리사</span>다.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              프롬프트 엔지니어링은 <span className="font-semibold text-orange-600">레시피</span>다.
            </p>
            <p className="text-lg text-gray-600 mt-6">
              좋은 레시피로 요리를 해야 좋은 음식이 나온다.
            </p>
          </motion.div>

          {/* 특징 리스트 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 space-y-3"
          >
            <div className="flex items-center justify-center lg:justify-start">
              <span className="text-orange-500 mr-3">🎯</span>
              <span className="text-gray-700">체계적인 프롬프트 학습</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <span className="text-orange-500 mr-3">🚀</span>
              <span className="text-gray-700">실시간 AI 대화 테스트</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <span className="text-orange-500 mr-3">📝</span>
              <span className="text-gray-700">개인화된 프롬프트 관리</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 오른쪽: 로그인/회원가입 폼 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 max-w-md w-full"
        >
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage