// src/components/common/IngredientCard.jsx
import { motion } from 'framer-motion'

const IngredientCard = ({ name, image }) => {
  return (
    <motion.div
      className="relative"
      style={{
        width: '160px',
        height: '170px',
        background: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid #FFFFFF',
        borderRadius: '20px',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 재료 이름 */}
      <div
        style={{
          fontFamily: 'NeoDunggeunmo, monospace',
          fontWeight: 400,
          fontSize: '22px',
          textShadow: '0.2px 0 black, 0 0.2px black, -0.2px 0 black, 0 -0.2px black, 0.2px 0.2px black, -0.2px -0.2px black, 0.2px -0.2px black, -0.2px 0.2px black',
          lineHeight: '100%',
          textAlign: 'center',
          color: '#000000',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30px'
        }}
      >
        {name}
      </div>

      {/* 재료 이미지 */}
      <div className="flex-1 flex items-center justify-center" style={{ marginTop: '-10px' }}>
        <img
          src={image}
          alt={name}
          style={{
            maxWidth: '170px',
            maxHeight: '140px',
            objectFit: 'contain'
          }}
        />
      </div>
    </motion.div>
  )
}

export default IngredientCard