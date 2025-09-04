// src/components/auth/LoginForm.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SocialLoginButtons from './SocialLoginButtons'
import LoginDivider from './LoginDivider'

const LoginForm = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await login(formData)
      navigate('/')
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleSocialLogin = async (provider) => {
    setSocialLoading(true)
    
    try {
      if (provider === 'google') {
        // Google OAuth 리다이렉트
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`
      } else if (provider === 'kakao') {
        // Kakao OAuth 리다이렉트
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/kakao`
      }
    } catch (error) {
      console.error('소셜 로그인 실패:', error)
      setSocialLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          로그인
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* 소셜 로그인 섹션 */}
        <SocialLoginButtons 
          isLoading={socialLoading}
          onSocialLogin={handleSocialLogin}
        />

        {/* 구분선 */}
        <LoginDivider />

        {/* 일반 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 아이디 입력 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              아이디
            </label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder="아이디를 입력하세요"
              required
            />
          </motion.div>

          {/* 비밀번호 입력 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </motion.div>

          {/* 로그인 옵션 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">로그인 유지</span>
            </label>
            <button
              type="button"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              비밀번호 찾기
            </button>
          </motion.div>

          {/* 로그인 버튼 */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className={`
              w-full py-3.5 px-4 
              bg-gradient-to-r from-orange-500 to-red-500
              hover:from-orange-600 hover:to-red-600
              text-white font-bold rounded-lg
              transition-all duration-200
              shadow-lg hover:shadow-xl
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </motion.button>

          {/* 회원가입 링크 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="text-center"
          >
            <span className="text-gray-600">계정이 없으신가요? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
            >
              회원가입
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default LoginForm