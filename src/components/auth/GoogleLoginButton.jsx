// src/components/auth/GoogleLoginButton.jsx
import { motion } from 'framer-motion'

const GoogleLoginButton = ({ onClick, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        w-full flex items-center justify-center px-4 py-3.5
        border border-gray-300 rounded-xl
        bg-white hover:bg-gray-50
        text-gray-700 font-medium
        transition-all duration-200
        shadow-sm hover:shadow-md
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        relative overflow-hidden
      `}
    >
      {/* Google 로고 */}
      <div className="flex items-center justify-center w-5 h-5 mr-3">
        <img 
          src="/src/assets/images/google-logo.svg" 
          alt="Google" 
          className="w-5 h-5"
        />
      </div>
      
      <span className="text-base">Google로 로그인</span>
      
      {/* 호버 효과 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{ opacity: 0.1, x: ['100%', '-100%'] }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

export default GoogleLoginButton