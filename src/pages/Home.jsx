// src/pages/Home.jsx
import { useState, useEffect, useMemo } from 'react'
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

  // y축 바운싱(5vh) 키프레임과 기본 트랜지션
  const bobbingY = useMemo(() => ["0vh", "-5vh", "0vh"], [])
  const bobT = useMemo(() => ({ y: { duration: 4, ease: "easeInOut", repeat: Infinity } }), [])

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
        {/* statue: 입장만, 반복 없음 */}
        <motion.img
          src={statueImg}
          alt="statue"
          className="food-image statue"
          initial={{ opacity: 0, y: 30 }}
          animate={showImages ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />

        {/* tomato: y만 무한 반복, opacity는 1번 */}
        <motion.img
          src={tomatoImg}
          alt="tomato"
          className="food-image tomato"
          initial={{ y: -100, opacity: 0 }}
          animate={showImages ? { y: bobbingY, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{
            ...bobT,
            opacity: { duration: 1, delay: 0.4, repeat: 0 }
          }}
        />

        {/* cheese: x로 입장+opacity 1번, y는 무한 반복(속도 살짝 다르게) */}
        <motion.img
          src={cheeseImg}
          alt="cheese"
          className="food-image cheese"
          initial={{ x: 100, opacity: 0 }}
          animate={showImages ? { x: 0, y: bobbingY, opacity: 1 } : { x: 100, y: 0, opacity: 0 }}
          transition={{
            y: { duration: 7, ease: "easeInOut", repeat: Infinity },
            x: { duration: 1.1, delay: 0.8, repeat: 0 },
            opacity: { duration: 1.1, delay: 0.8, repeat: 0 }
          }}
        />

        {/* broccoli: scale로 입장+opacity 1번, y는 무한 반복(가장 느리게) */}
        <motion.img
          src={broccoliImg}
          alt="broccoli"
          className="food-image broccoli"
          initial={{ scale: 0, y: 50, opacity: 0 }}
          animate={showImages ? { scale: 1, y: bobbingY, opacity: 1 } : { scale: 0, y: 50, opacity: 0 }}
          transition={{
            y: { duration: 9, ease: "easeInOut", repeat: Infinity },
            scale: { duration: 0.6, delay: 1, repeat: 0 },
            opacity: { duration: 0.6, delay: 1, repeat: 0 }
          }}
        />
      </motion.div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/*<motion.h1
          className="main-title-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showTitle1 ? 1 : 0, y: showTitle1 ? 0 : 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          이 맛에 AI한다;
        </motion.h1>

        <motion.h2
          className="main-title-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showTitle2 ? 1 : 0, y: showTitle2 ? 0 : 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          프롬프트 엔지니어링
        </motion.h2>

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
        */}
      </div>
    </div>
  )
}

export default Home
