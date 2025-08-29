// src/components/auth/LoginForm.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
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

  const handleSocialLogin = (provider) => {
    if (provider === 'google') {
      window.location.href = '/auth/google'
    } else if (provider === 'kakao') {
      window.location.href = '/auth/kakao'
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

        {/* 소셜 로그인 버튼들 */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <div className="w-5 h-5 mr-3 bg-red-500 rounded-full"></div>
            Google로 로그인
          </button>

          <button
            onClick={() => handleSocialLogin('kakao')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            <div className="w-5 h-5 mr-3 bg-gray-800 rounded-full"></div>
            카카오로 로그인
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">또는</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 이메일 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-2">
              아이디
            </label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                placeholder="비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            계정이 없으신가요?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              회원가입
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginForm