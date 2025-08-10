// src/pages/ChatGPTTutorial.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/layout/Navigation'
import TutorialMainScreen from '../components/layout/TutorialMainScreen'
import IngredientCard from '../components/common/IngredientCard'
import '../styles/App.css'

// 이미지 imports
import backgroundImg from '../assets/images/chatgpt-tutorial-bg.png'
import basketImg from '../assets/images/basket.png'
import flourImg from '../assets/images/flour.png'
import tomatoImg from '../assets/images/tomato-halftone.png'
import cheeseImg from '../assets/images/cheese-slice.png'
import pepperoniImg from '../assets/images/pepperoni.png'
import oliveImg from '../assets/images/olive.png'
import basilImg from '../assets/images/basil.png'

const ChatGPTTutorial = () => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 10000000) // 10초 후 로딩 화면 숨김

    return () => clearTimeout(timer)
  }, [])

  const ingredients = [
    { id: 1, name: '밀가루', image: flourImg },
    { id: 2, name: '토마토', image: tomatoImg },
    { id: 3, name: '치즈', image: cheeseImg },
    { id: 4, name: '페퍼로니', image: pepperoniImg },
    { id: 5, name: '올리브', image: oliveImg },
    { id: 6, name: '바질', image: basilImg }
  ]

  if (!showLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <TutorialMainScreen />
      </motion.div>
    )
  }

  return (
    <div 
      className="w-full h-screen relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'url(/barcode-small.png), crosshair'
      }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 pt-20"> {/* pt-24에서 pt-20으로 줄임 */}
        {/* ChatGPT Title - 네비게이터 바로 밑에 위치 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-4" // mb-8에서 mb-4로 줄임
        >
          <div
            style={{
              width: '356px',
              height: '60px',
              background: '#F63503',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span
              style={{
                fontFamily: 'Radwave Demo, sans-serif',
                fontWeight: 700,
                fontSize: '30px',
                lineHeight: '100%',
                color: '#FFFFFF',
                textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
              }}
            >
              CHAT GPT
            </span>
          </div>
        </motion.div>

        {/* 전체를 감싸는 큰 투명 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-2" // mx-4에서 mx-2로 줄임
          style={{
            width: 'calc(100% - 16px)', // mx-2를 고려한 너비 계산
            height: 'calc(100vh - 190px)', // 네비게이션과 타이틀을 제외한 높이
            background: 'transparent',
            border: 'none',
            padding: '10px', // 20px에서 10px로 줄임
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 세 개의 투명 컨테이너 */}
          <div className="flex justify-between items-center w-full max-w-screen-xl"> {/* justify-center에서 justify-between으로, 전체 너비 사용 */}
            {/* 첫 번째 컨테이너 (좌측 재료들) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                width: '240px',      // 250px에서 240px로 줄임
                height: '100%',      // 부모 높이에 맞춤
                background: 'transparent',
                border: 'none',
                padding: '15px',     // 20px에서 15px로 줄임
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}
            >
              {/* 좌측 재료들 */}
              {ingredients.slice(0, 3).map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                >
                  <IngredientCard 
                    name={ingredient.name}
                    image={ingredient.image}
                  />
                  <div style={{height:'10px'}}></div>
                </motion.div>
              ))}
            </motion.div>

            {/* 두 번째 컨테이너 (중앙 - 장바구니 + 텍스트) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                width: '1200px',      // 600px에서 550px로 줄임
                height: '100%',      // 부모 높이에 맞춤
                background: 'transparent',
                border: 'none',
                padding: '30px',     // 40px에서 30px로 줄임
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center mb-4" // mb-8에서 mb-6으로 줄임
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '24px',    // 26px에서 24px로 줄임
                    color: '#000000',
                    fontWeight: '500',
                    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>피자 튜토리얼</span>을 만들기 위한{' '}
                  <span style={{ fontWeight: 'bold' }}>재료</span>를 담아주세요!
                </p>
              </motion.div>

              {/* Shopping Basket */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mb-4" // mb-8에서 mb-6으로 줄임
              >
                <img 
                  src={basketImg} 
                  alt="Shopping Basket" 
                  style={{ width: '1200px', height: '400px' }}
                  className="object-contain" // w-52 h-52에서 w-72 h-72로 크게 키움
                />
              </motion.div>

              {/* Info Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-center"
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',    // 18px에서 16px로 줄임
                    color: '#FFFFFF',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
                  }}
                >
                  최소 3개의 재료를 모아야, 퀴즈를 풀 수 있습니다!<br />
                  재료를 많이 모을수록 다양한 요리를 할 수 있겠죠?
                </p>
              </motion.div>
            </motion.div>

            {/* 세 번째 컨테이너 (우측 재료들) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                width: '240px',      // 250px에서 240px로 줄임
                height: '100%',      // 부모 높이에 맞춤
                background: 'transparent',
                border: 'none',
                padding: '15px',     // 20px에서 15px로 줄임
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}
            >
              {/* 우측 재료들 */}
              {ingredients.slice(3, 6).map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + (index * 0.2) }}
                >
                  <IngredientCard 
                    name={ingredient.name}
                    image={ingredient.image}
                  />

                  <div style={{height:'10px'}}></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Loading Screen Overlay */}
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-50"
        >
          <div className="flex space-x-4">
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{
                y: [-20, 0, -20],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{
                y: [-20, 0, -20],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{
                y: [-20, 0, -20],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0.4,
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ChatGPTTutorial