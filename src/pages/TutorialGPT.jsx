// src/pages/TutorialGPT.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoadingScreen from '../components/common/LoadingScreen'
import TutorialMainScreen from '../components/layout/TutorialMainScreen'

const TutorialGPT = () => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 4000) // 4초 후 로딩 화면 숨김

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      {showLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <TutorialMainScreen />
        </motion.div>
      )}
    </div>
  )
}

export default TutorialGPT