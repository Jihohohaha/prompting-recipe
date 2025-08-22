// src/components/layout/Navigation.jsx
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState(null)

  // 현재 페이지 확인 함수
  const isActivePage = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // 네비게이션 메뉴 아이템들
  const menuItems = [
    { path: '/', label: '홈', marginRight: '-12px' }, // 홈과 튜토리얼 사이 간격 조절
    { path: '/tutorial-gpt', label: '튜토리얼' },
    { path: '/select-field', label: '객관식 퀴즈' },
    { path: '/community/information', label: '주관식 퀴즈' },
    { path: '/community/creation', label: '커뮤니티' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-transparent">
      {/* 좌측 로고/브랜드명 */}
      <div className="flex items-center">
        <h1 
          className="text-2xl font-bold"
          style={{
            fontFamily: 'Michroma, monospace',
            fontWeight: 400,
            fontSize: '18px',
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
      <div className="flex items-center">
        {menuItems.map((item, index) => {
          const isActive = isActivePage(item.path)
          const isHovered = hoveredItem === index

          return (
            <div 
              key={item.path}
              className="relative flex flex-col items-center"
              style={{ 
                width: '80px', 
                minHeight: '50px',
                marginRight: item.marginRight || '16px' // 개별 간격 설정, 기본값 16px
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link 
                to={item.path}
                className="font-pretendard transition-colors duration-300 text-center"
                style={{ 
                  color: (isActive || isHovered) ? '#FF8A6A' : '#A7A7A7' 
                }}
              >
                {item.label}
              </Link>
              
              {/* 그릇 아이콘 - 고정된 위치에 표시 */}
              <div className="mt-0 flex justify-center items-center" style={{ height: '24px' }}>
                {(isActive || isHovered) && (
                  <img 
                    src="/images/bowl-icon.png" 
                    alt="Active indicator"
                    style={{ 
                      width: '48px',
                      height: '16px',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation