// src/components/auth/SocialLoginButtons.jsx
import { motion } from 'framer-motion'
import GoogleLoginButton from './GoogleLoginButton'
import KakaoLoginButton from './KakaoLoginButton'
import LoadingSpinner from '../ui/LoadingSpinner'

const SocialLoginButtons = ({ isLoading = false, onSocialLogin }) => {
  const handleGoogleLogin = () => {
    if (isLoading) return
    onSocialLogin?.('google')
  }

  const handleKakaoLogin = () => {
    if (isLoading) return
    onSocialLogin?.('kakao')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-3"
    >
      {/* 소셜 로그인 제목 */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          간편하게 로그인하세요
        </p>
      </div>

      {/* Google 로그인 */}
      <GoogleLoginButton 
        onClick={handleGoogleLogin}
        disabled={isLoading}
      />

      {/* Kakao 로그인 */}
      <KakaoLoginButton 
        onClick={handleKakaoLogin}
        disabled={isLoading}
      />

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </motion.div>
  )
}

export default SocialLoginButtons