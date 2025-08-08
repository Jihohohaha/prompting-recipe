// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/Home.css'

// 이미지 import
import backgroundImg from '../assets/images/background.png'
import statueImg from '../assets/images/statue.png'
import tomatoImg from '../assets/images/tomato.png'
import mosaicImg from '../assets/images/mosaic.png'
import cheeseImg from '../assets/images/cheese.png'
import broccoliImg from '../assets/images/broccoli.png'

const Home = () => {
  const navigate = useNavigate()
  const [showImages, setShowImages] = useState(false)
  const [showTitle1, setShowTitle1] = useState(false)
  const [showTitle2, setShowTitle2] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // comments.txt 내용
  const commentsText = `def cook_with_ai(ingredients)
    role = Act as an experienced Italian pizza chef.
    task = Provide a step-by-step recipe using the ingredients.

    format = 
    ## Pizza Recipe Guide
    1. List all ingredients clearly.
    2. Describe each preparation step with reasoning.
    3. Format the instructions in Markdown for readability.
    

    reasoning = For each step, briefly explain why it's important.

    prompt = f
    {role}
    Your task {task}
    Ingredients {', '.join(ingredients)}
    Output Format {format}
    Additional Requirement {reasoning}
    

    return prompt


print(cook_with_ai([
    thin crust dough,
    tomato sauce,
    mozzarella cheese,
    fresh basil,
    olive oil
]))`

  useEffect(() => {
    // 애니메이션 타이밍 설정
    const timer1 = setTimeout(() => setShowImages(true), 1000)
    const timer2 = setTimeout(() => setShowTitle1(true), 3000)
    const timer3 = setTimeout(() => setShowTitle2(true), 4000)
    const timer4 = setTimeout(() => setShowButton(true), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const handleStartClick = () => {
    navigate('/select-field')
  }

  return (
    <div className="home-container">
      {/* 배경 이미지 */}
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      {/* Comments 텍스트 */}
      <div className="comments-text">
        <pre>{commentsText}</pre>
      </div>

      {/* 음식 이미지들 */}
      <motion.div 
        className="food-images"
        initial={{ opacity: 0 }}
        animate={{ opacity: showImages ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.img 
          src={statueImg} 
          alt="statue" 
          className="food-image statue"
          initial={{ opacity: 0, y: 30 }}
          animate={showImages ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.img 
          src={tomatoImg} 
          alt="tomato" 
          className="food-image tomato"
          initial={{ y: -100, opacity: 0 }}
          animate={showImages ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.img 
          src={mosaicImg} 
          alt="mosaic" 
          className="food-image mosaic"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={showImages ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 1.3, delay: 0.6 }}
        />
        <motion.img 
          src={cheeseImg} 
          alt="cheese" 
          className="food-image cheese"
          initial={{ x: 100, opacity: 0 }}
          animate={showImages ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.8 }}
        />
        <motion.img 
          src={broccoliImg} 
          alt="broccoli" 
          className="food-image broccoli"
          initial={{ scale: 0, y: 50 }}
          animate={showImages ? { scale: 1, y: 0 } : { scale: 0, y: 50 }}
          transition={{ duration: 1.4, delay: 1 }}
        />
      </motion.div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 첫 번째 제목 */}
        <motion.h1 
          className="main-title-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showTitle1 ? 1 : 0, y: showTitle1 ? 0 : 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          이 맛에 AI한다;
        </motion.h1>

        {/* 두 번째 제목 */}
        <motion.h2 
          className="main-title-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showTitle2 ? 1 : 0, y: showTitle2 ? 0 : 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          프롬프트 엔지니어링
        </motion.h2>

        {/* 시작 버튼 */}
        <motion.button
          className="start-button"
          onClick={handleStartClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showButton ? 1 : 0, 
            scale: showButton ? 1 : 0.8 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          시작하기
        </motion.button>
      </div>
    </div>
  )
}

export default Home