// src/pages/ChatGPTTutorial.jsx
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/layout/Navigation'
import IngredientCard from '../components/common/IngredientCard'
import LearningInfoModal from '../components/common/LearningInfoModal'
import IngredientModal from '../components/common/IngredientModal'
import BasketAnimation from '../components/common/BasketAnimation'
import '../styles/App.css'

// 이미지 imports
const backgroundImg = '/src/assets/images/chatgpt-tutorial-bg.png'
const basketImg = '/src/assets/images/basket.png'
const flourImg = '/src/assets/images/flour.png'
const tomatoImg = '/src/assets/images/tomato-halftone.png'
const cheeseImg = '/src/assets/images/cheese-slice.png'
const pepperoniImg = '/src/assets/images/pepperoni.png'
const oliveImg = '/src/assets/images/olive.png'
const basilImg = '/src/assets/images/basil.png'

const ChatGPTTutorial = () => {
  const [showModal, setShowModal] = useState(false)
  const [ingredientModalOpen, setIngredientModalOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [completedIngredients, setCompletedIngredients] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [animationTrigger, setAnimationTrigger] = useState(false)
  const [animationData, setAnimationData] = useState(null)

  // DOM 요소 참조
  const basketRef = useRef(null)
  const ingredientRefs = useRef({})

  // ChatGPT 학습 정보
  const chatGPTInfo = {
    title: "ChatGPT",
    features: "자연스러운 대화형 인터페이스로 복잡한 개념을 쉽게 설명하고, 단계별 학습을 지원합니다.",
    learningMethod: "질문-답변 형식으로 학습하며, 예시와 함께 개념을 설명받을 수 있습니다. 코딩 문제나 수학 문제 해결에도 유용합니다.",
    tips: "구체적인 질문을 하고, 이해가 안 되는 부분은 다시 질문하세요. '예시를 들어 설명해줘'라고 요청하면 더 쉽게 이해할 수 있습니다."
  }

  useEffect(() => {
    setShowModal(true)
  }, [])

  const handleModalComplete = () => {
    setShowModal(false)
  }

  const handleIngredientClick = (ingredient) => {
    if (completedIngredients.includes(ingredient.id)) {
      return
    }
    
    setSelectedIngredient(ingredient)
    setIngredientModalOpen(true)
  }

  const handleIngredientModalClose = () => {
    setIngredientModalOpen(false)
    setSelectedIngredient(null)
  }

  // 재료 학습 완료 처리
  const handleIngredientComplete = (ingredientData) => {
    console.log('handleIngredientComplete 호출됨:', ingredientData.id)
    console.log('현재 완료된 재료들:', completedIngredients)
    console.log('처리 중 상태:', isProcessing)
    
    // 처리 중이거나 이미 완료된 재료는 추가하지 않음
    if (isProcessing || completedIngredients.includes(ingredientData.id)) {
      console.log('처리 중이거나 이미 완료된 재료입니다:', ingredientData.id)
      return
    }
    
    // 처리 시작
    setIsProcessing(true)
    
    // 완료된 재료 목록에 추가
    setCompletedIngredients(prev => {
      const newList = [...prev, ingredientData.id]
      console.log('새로운 완료 목록:', newList)
      return newList
    })
    
    // 애니메이션 데이터 설정
    const basketRect = basketRef.current?.getBoundingClientRect()
    const ingredientRect = ingredientRefs.current[ingredientData.id]?.getBoundingClientRect()
    
    if (basketRect && ingredientRect) {
      setAnimationData({
        ingredient: ingredientData,
        basketPosition: {
          x: basketRect.left + basketRect.width / 2,
          y: basketRect.top + basketRect.height / 2
        },
        ingredientPosition: {
          x: ingredientRect.left + ingredientRect.width / 2,
          y: ingredientRect.top + ingredientRect.height / 2
        }
      })
      setAnimationTrigger(true)
      
      // 애니메이션 리셋 및 처리 완료
      setTimeout(() => {
        setAnimationTrigger(false)
        setAnimationData(null)
        setIsProcessing(false)
      }, 3000)
    } else {
      setIsProcessing(false)
    }
  }

  const ingredients = [
    { 
      id: 1, 
      name: '밀가루', 
      image: flourImg,
      technique: 'FEW SHOT 기법',
      description: '몇 가지 예시를 제시하여 AI가 패턴을 학습하도록 하는 방법입니다.'
    },
    { 
      id: 2, 
      name: '토마토', 
      image: tomatoImg,
      technique: '역할 지정 기법',
      description: 'AI에게 특정 역할이나 전문성을 부여하여 답변하도록 하는 방법입니다.'
    },
    { 
      id: 3, 
      name: '치즈', 
      image: cheeseImg,
      technique: '마크다운 템플릿 1',
      description: '마크다운 형식으로 구조화된 답변을 요청하는 방법입니다.'
    },
    { 
      id: 4, 
      name: '페퍼로니', 
      image: pepperoniImg,
      technique: '마크다운 템플릿 2',
      description: '복잡한 정보를 마크다운으로 체계적으로 정리해서 받는 기법입니다.'
    },
    { 
      id: 5, 
      name: '올리브', 
      image: oliveImg,
      technique: 'Chain of Thought 기법',
      description: 'AI가 단계별로 사고하며 문제를 해결하도록 유도하는 방법입니다.'
    },
    { 
      id: 6, 
      name: '바질', 
      image: basilImg,
      technique: 'ReAct 기법',
      description: '추론과 행동을 결합하여 더 정확한 답변을 얻는 방법입니다.'
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
        {/* ChatGPT Title */}
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
                letterSpacing: '2px',
                color: '#ffffff'
              }}
            >
              ChatGPT
            </span>
          </div>
        </motion.div>

        {/* Main Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="flex items-center justify-center"
          style={{ gap: '20px' }}
        >
          {/* 첫 번째 컨테이너 (좌측 재료들) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <motion.div
                key={ingredient.id}
                ref={el => ingredientRefs.current[ingredient.id] = el}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + (index * 0.2) }}
                onClick={() => handleIngredientClick(ingredient)}
                className={`cursor-pointer transition-all duration-300 ${
                  completedIngredients.includes(ingredient.id) 
                    ? 'opacity-50 scale-95 pointer-events-none' 
                    : 'hover:scale-105'
                }`}
              >
                <IngredientCard 
                  name={ingredient.name}
                  image={ingredient.image}
                  isCompleted={completedIngredients.includes(ingredient.id)}
                />
                {completedIngredients.includes(ingredient.id) && (
                  <div className="text-center mt-2">
                    <span className="text-green-600 text-sm font-semibold">✅ 완료</span>
                  </div>
                )}
                <div style={{height:'10px'}}></div>
              </motion.div>
            ))}
          </motion.div>

          {/* 두 번째 컨테이너 (중앙 장바구니) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              width: '600px',
              height: '100%',
              background: 'transparent',
              border: 'none',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Shopping Basket */}
            <div 
              ref={basketRef}
              className="mb-4 relative"
            >
              <img 
                src={basketImg} 
                alt="Shopping Basket" 
                style={{ width: '400px', height: '300px' }}
                className="object-contain"
              />
              
              {/* 완료된 재료들을 장바구니 위에 표시 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {completedIngredients.slice(0, 6).map((ingredientId, index) => {
                    const ingredient = ingredients.find(ing => ing.id === ingredientId)
                    if (!ingredient) return null
                    
                    // 랜덤 회전각 생성 (재료마다 고정된 값을 위해 id 기반)
                    const rotation = (ingredientId * 47) % 360 - 180 // -180 ~ 180도
                    
                    return (
                      <motion.div
                        key={`completed-${ingredientId}`}
                        initial={{ scale: 0, opacity: 0, rotate: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1, 
                          rotate: rotation 
                        }}
                        transition={{ 
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 200 
                        }}
                        className="w-36 h-36 relative" // 크기 1.5배 더 증가 (24 -> 36)
                      >
                        <img 
                          src={ingredient.image} 
                          alt={ingredient.name}
                          className="w-full h-full object-contain"
                          style={{ transform: `rotate(${rotation}deg)` }}
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              
              {/* 완료 카운터 */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg"
              >
                {completedIngredients.length}
              </motion.div>
            </div>

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
            {ingredients.slice(3, 6).map((ingredient, index) => (
              <motion.div
                key={ingredient.id}
                ref={el => ingredientRefs.current[ingredient.id] = el}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 + (index * 0.2) }}
                onClick={() => handleIngredientClick(ingredient)}
                className={`cursor-pointer transition-all duration-300 ${
                  completedIngredients.includes(ingredient.id) 
                    ? 'opacity-50 scale-95 pointer-events-none' 
                    : 'hover:scale-105'
                }`}
              >
                <IngredientCard 
                  name={ingredient.name}
                  image={ingredient.image}
                  isCompleted={completedIngredients.includes(ingredient.id)}
                />
                {completedIngredients.includes(ingredient.id) && (
                  <div className="text-center mt-2">
                    <span className="text-green-600 text-sm font-semibold">✅ 완료</span>
                  </div>
                )}
                <div style={{height:'10px'}}></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 모든 재료 완료 시 축하 메시지 */}
      {completedIngredients.length === ingredients.length && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10001]"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">축하합니다!</h2>
            <p className="text-gray-600 mb-6">
              모든 프롬프트 기법을 성공적으로 학습했습니다!
              이제 실제 ChatGPT에서 활용해보세요.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold"
              onClick={() => window.location.href = '/'}
            >
              메인으로 돌아가기
            </motion.button>
          </motion.div>
        </motion.div>
      )}

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
        onIngredientComplete={handleIngredientComplete}
      />

      {/* 장바구니 애니메이션 - 올바른 프로퍼티명 사용 */}
      <BasketAnimation
        triggerAnimation={animationTrigger}
        ingredientData={animationData?.ingredient}
        basketPosition={animationData?.basketPosition}
        ingredientPosition={animationData?.ingredientPosition}
      />
    </div>
  )
}

export default ChatGPTTutorial