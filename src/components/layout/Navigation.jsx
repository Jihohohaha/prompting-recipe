// src/components/layout/Navigation.jsx
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black bg-opacity-20 backdrop-blur-sm">
      {/* 좌측 로고/브랜드명 */}
      <div className="flex items-center">
        <h1 
          className="text-2xl font-bold"
          style={{
            fontFamily: 'Michroma, monospace',
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: '100%',
            background: 'linear-gradient(180deg, #FF2802 0%, #FF8A6A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {"{PROMPTING recipe}"}
        </h1>
      </div>

      {/* 우측 네비게이션 메뉴 */}
      <div className="flex items-center space-x-8">
        <Link 
          to="/" 
          className="text-white hover:text-[#FF8A6A] transition-colors duration-300 font-medium"
        >
          홈
        </Link>
        <Link 
          to="/tutorial-gpt" 
          className="text-white hover:text-[#FF8A6A] transition-colors duration-300 font-medium"
        >
          튜토리얼
        </Link>
        <Link 
          to="/select-field" 
          className="text-white hover:text-[#FF8A6A] transition-colors duration-300 font-medium"
        >
          객관식 퀴즈
        </Link>
        <Link 
          to="/community/information" 
          className="text-white hover:text-[#FF8A6A] transition-colors duration-300 font-medium"
        >
          주관식 퀴즈
        </Link>
        <Link 
          to="/community/creation" 
          className="text-white hover:text-[#FF8A6A] transition-colors duration-300 font-medium"
        >
          커뮤니티
        </Link>
      </div>
    </nav>
  )
}

export default Navigation