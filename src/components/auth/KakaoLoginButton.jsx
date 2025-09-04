// src/components/auth/KakaoLoginButton.jsx
import { motion } from 'framer-motion'

const KakaoLoginButton = ({ onClick, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        w-full flex items-center justify-center px-4 py-3.5
        bg-yellow-400 hover:bg-yellow-500
        text-gray-800 font-medium
        rounded-xl
        transition-all duration-200
        shadow-sm hover:shadow-md
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        relative overflow-hidden
      `}
    >
      {/* Kakao 로고 */}
      <div className="flex items-center justify-center w-5 h-5 mr-3">
        <img 
          src="/src/assets/images/kakao-logo.svg" 
          alt="Kakao" 
          className="w-5 h-5"
        />
      </div>
      
      <span className="text-base">카카오로 로그인</span>
      
      {/* 호버 효과 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0"
        whileHover={{ opacity: 0.3, x: ['100%', '-100%'] }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

export default KakaoLoginButton