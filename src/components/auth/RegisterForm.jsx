// src/components/auth/RegisterForm.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const RegisterForm = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1) // 1: 이메일 인증, 2: 회원 정보 입력
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    name: '',
    loginId: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { register, sendVerificationEmail, checkVerificationCode, isLoading, error } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 1단계: 이메일 인증 코드 발송
  const handleSendVerification = async (e) => {
    e.preventDefault()
    
    try {
      setIsVerifying(true)
      await sendVerificationEmail(formData.email)
      alert('인증 코드가 이메일로 발송되었습니다.')
    } catch (error) {
      console.error('인증 코드 발송 실패:', error)
    } finally {
      setIsVerifying(false)
    }
  }

  // 2단계: 인증 코드 확인
  const handleVerifyCode = async (e) => {
    e.preventDefault()
    
    try {
      await checkVerificationCode(formData.email, formData.verificationCode)
      setStep(2)
      alert('이메일 인증이 완료되었습니다!')
    } catch (error) {
      console.error('인증 코드 확인 실패:', error)
    }
  }

  // 3단계: 회원가입 완료
  const handleRegister = async (e) => {
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
          회원가입
        </h2>

        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            1
          </div>
          <div className={`w-12 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
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
          <div>
            {/* 소셜 로그인 버튼들 */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <div className="w-5 h-5 mr-3 bg-red-500 rounded-full"></div>
                Google로 가입하기
              </button>

              <button
                onClick={() => handleSocialLogin('kakao')}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                <div className="w-5 h-5 mr-3 bg-gray-800 rounded-full"></div>
                카카오로 가입하기
              </button>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">또는</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* 이메일 인증 단계 */}
            <form onSubmit={handleSendVerification} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isVerifying ? '발송 중...' : '인증 코드 받기'}
              </button>
            </form>

            {/* 인증 코드 입력 */}
            <form onSubmit={handleVerifyCode} className="space-y-4 mt-6">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  인증 코드
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="이메일로 받은 인증 코드를 입력하세요"
                />
              </div>

              <button
                type="submit"
                disabled={!formData.verificationCode || isLoading}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '확인 중...' : '인증 코드 확인'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="이름을 입력하세요"
              />
            </div>

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
                  minLength="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                  placeholder="비밀번호를 입력하세요 (최소 6자)"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                  placeholder="비밀번호를 다시 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '가입 중...' : '회원가입 완료'}
            </motion.button>
          </form>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              로그인
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterForm