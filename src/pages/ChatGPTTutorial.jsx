// src/pages/ChatGPTTutorial.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/layout/Navigation'
import IngredientCard from '../components/common/IngredientCard'
import LearningInfoModal from '../components/common/LearningInfoModal'
import IngredientModal from '../components/common/IngredientModal'
import '../styles/App.css'

// 이미지 imports - public 폴더 경로로 수정
const backgroundImg = '/src/assets/images/chatgpt-tutorial-bg.png'
const basketImg = '/src/assets/images/basket.png'
const flourImg = '/src/assets/images/flour.png'
const flourImg_bg='/src/assets/images/flour_bg.png'
const tomatoImg = '/src/assets/images/tomato-halftone.png'
const cheeseImg = '/src/assets/images/cheese-slice.png'
const pepperoniImg = '/src/assets/images/pepperoni.png'
const oliveImg = '/src/assets/images/olive.png'
const basilImg = '/src/assets/images/basil.png'

const ChatGPTTutorial = () => {
  const [showModal, setShowModal] = useState(false)
  const [ingredientModalOpen, setIngredientModalOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  // ChatGPT 학습 정보
  const chatGPTInfo = {
    title: "ChatGPT",
    features: "자연스러운 대화형 인터페이스로 복잡한 개념을 쉽게 설명하고, 단계별 학습을 지원합니다.",
    learningMethod: "질문-답변 형식으로 학습하며, 예시와 함께 개념을 설명받을 수 있습니다. 코딩 문제나 수학 문제 해결에도 유용합니다.",
    tips: "구체적인 질문을 하고, 이해가 안 되는 부분은 다시 질문하세요. '예시를 들어 설명해줘'라고 요청하면 더 쉽게 이해할 수 있습니다."
  }

  useEffect(() => {
    // 페이지 로드 즉시 모달 표시
    setShowModal(true)
  }, [])

  const handleModalComplete = () => {
    setShowModal(false)
  }

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient)
    setIngredientModalOpen(true)
  }

  const handleIngredientModalClose = () => {
    setIngredientModalOpen(false)
    setSelectedIngredient(null)
  }

  const ingredients = [
    { 
      id: 1, 
      name: '밀가루', 
      image: flourImg,
      bgimage: flourImg_bg,
      technique: 'FEW SHOT 기법',
      description: '첫번째 방법론에 대해 알려드리겠습니다.',
      color: '#ECE290',
      tagcolor: '#F3E88D'
    },
    { 
      id: 2, 
      name: '토마토', 
      image: tomatoImg,
      bgimage: flourImg_bg,
      technique: '역할 지정 기법',
      description: '두번째 방법론에 대해 알려드리겠습니다.',
      color: '#DD7B25',
      tagcolor: '#FFB371'
    },
    { 
      id: 3, 
      name: '치즈', 
      image: cheeseImg,
      bgimage: flourImg_bg,
      technique: '마크다운 템플릿 1',
      description: '세번째 방법론에 대해 알려드리겠습니다.',
      color: '#F1F5A1',
      tagcolor: '#F9FF81'
    },
    { 
      id: 4, 
      name: '페퍼로니', 
      image: pepperoniImg,
      bgimage: flourImg_bg,
      technique: '마크다운 템플릿 2',
      description: '네번째 방법론에 대해 알려드리겠습니다.',
      color: '#BD4728',
      tagcolor: '#FFA2A2'
    },
    { 
      id: 5, 
      name: '올리브', 
      image: oliveImg,
      bgimage: flourImg_bg,
      technique: 'Chain of Thought 기법',
      description: '다섯번째 방법론에 대해 알려드리겠습니다.',
      color: '#005D06',
      tagcolor: '#008F0A'
    },
    { 
      id: 6, 
      name: '바질', 
      image: basilImg,
      bgimage: flourImg_bg,
      technique: 'ReAct 기법',
      description: '여섯번째 방법론에 대해 알려드리겠습니다.',
      color: '#24A73C',
      tagcolor: '#1CD83E'
    }
  ]

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
      <div className="relative z-10 pt-20">
        {/* ChatGPT Title - 네비게이터 바로 밑에 위치 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-4"
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
          className="mx-2"
          style={{
            width: 'calc(100% - 16px)',
            height: 'calc(100vh - 190px)',
            background: 'transparent',
            border: 'none',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 세 개의 투명 컨테이너 */}
          <div className="flex justify-between items-center w-full max-w-screen-xl">
            {/* 첫 번째 컨테이너 (좌측 재료들) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                width: '240px',
                height: '100%',
                background: 'transparent',
                border: 'none',
                padding: '15px',
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
                  onClick={() => handleIngredientClick(ingredient)}
                  className="cursor-pointer"
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
                width: '1200px',
                height: '100%',
                background: 'transparent',
                border: 'none',
                padding: '30px',
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
                className="text-center mb-4"
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '24px',
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
                className="mb-4"
              >
                <img 
                  src={basketImg} 
                  alt="Shopping Basket" 
                  style={{ width: '1200px', height: '400px' }}
                  className="object-contain"
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
                    fontSize: '16px',
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
                width: '240px',
                height: '100%',
                background: 'transparent',
                border: 'none',
                padding: '15px',
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
                  onClick={() => handleIngredientClick(ingredient)}
                  className="cursor-pointer"
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

      {/* 학습 정보 모달 */}
      <LearningInfoModal
        isVisible={showModal}
        aiInfo={chatGPTInfo}
        onComplete={handleModalComplete}
        duration={3000}
      />

      {/* 재료 모달 */}
      <IngredientModal
        isOpen={ingredientModalOpen}
        onClose={handleIngredientModalClose}
        ingredientData={selectedIngredient}
      />
    </div>
  )
}

export default ChatGPTTutorial