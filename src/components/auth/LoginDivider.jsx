// src/components/auth/LoginDivider.jsx
import { motion } from 'framer-motion'

const LoginDivider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="relative my-6"
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500 font-medium">
          또는
        </span>
      </div>
    </motion.div>
  )
}

export default LoginDivider