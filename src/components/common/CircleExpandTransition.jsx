// src/components/common/CircleExpandTransition.jsx
import { motion } from 'framer-motion'

const CircleExpandTransition = ({ 
  isActive, 
  clickPosition, 
  onComplete, 
  duration = 1.5,
  backgroundColor = '#000000'
}) => {
  if (!isActive || !clickPosition) return null

  // 클릭 지점에서 화면 모든 모서리까지의 거리를 계산하여 최대 반지름 구하기
  const { x, y } = clickPosition
  const { innerWidth: width, innerHeight: height } = window
  
  const distanceToTopLeft = Math.sqrt(x * x + y * y)
  const distanceToTopRight = Math.sqrt((width - x) * (width - x) + y * y)
  const distanceToBottomLeft = Math.sqrt(x * x + (height - y) * (height - y))
  const distanceToBottomRight = Math.sqrt((width - x) * (width - x) + (height - y) * (height - y))
  
  const maxRadius = Math.max(
    distanceToTopLeft,
    distanceToTopRight,
    distanceToBottomLeft,
    distanceToBottomRight
  )

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        backgroundColor,
        borderRadius: '50%',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 9998,
      }}
      initial={{
        width: 0,
        height: 0,
      }}
      animate={{
        width: maxRadius * 2,
        height: maxRadius * 2,
      }}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onAnimationComplete={onComplete}
    />
  )
}

export default CircleExpandTransition