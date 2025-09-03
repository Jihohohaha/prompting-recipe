// src/components/auth/RegisterForm.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import SocialLoginButtons from './SocialLoginButtons'
import LoginDivider from './LoginDivider'

const RegisterForm = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)
  const { register, isLoading, error } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        alert('이름과 이메일을 입력해주세요.')
        return
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('올바른 이메일 주소를 입력해주세요.')
        return
      }
      
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (formData.password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        loginId: formData.loginId,
        password: formData.password
      })
      
      alert('회원가입이 완료되었습니다! 로그인해주세요.')
      onSwitchToLogin()
    } catch (error) {
      console.error('회원가입 실패:', error)
    }
  }

  const handleSocialLogin = async (provider) => {
    setSocialLoading(true)
    
    try {
      if (provider === 'google') {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`
      } else if (provider === 'kakao') {
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
          회원가입
        </h2>

        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            1
          </div>
          <div className={`w-12 h-1 mx-2 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            2
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 소셜 회원가입 섹션 */}
            <SocialLoginButtons 
              isLoading={socialLoading}
              onSocialLogin={handleSocialLogin}
            />

            {/* 구분선 */}
            <LoginDivider />

            {/* 1단계: 기본 정보 */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>

              <motion.button
                type="button"
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                다음 단계
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 2단계: 로그인 정보 */}
              <div>
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
                <p className="text-xs text-gray-500 mt-1">
                  영문, 숫자 조합 4-20자
                </p>
              </div>

              <div className="relative">
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  최소 6자 이상
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 확인
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-transparent'
                  }`}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>

              {/* 약관 동의 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <label className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    required
                    className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="text-red-500">*</span> 서비스 이용약관 및 개인정보처리방침에 동의합니다.
                  </span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input 
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">
                    마케팅 정보 수신에 동의합니다. (선택)
                  </span>
                </label>
              </motion.div>

              {/* 이전/가입 버튼 */}
              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  이전
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`
                    flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 
                    hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg 
                    transition-all duration-200 shadow-lg hover:shadow-xl
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isLoading ? '가입 중...' : '회원가입 완료'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* 로그인 페이지로 이동 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="text-center mt-6"
        >
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
          >
            로그인
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RegisterForm