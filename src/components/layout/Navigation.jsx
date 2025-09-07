// src/components/layout/Navigation.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // 현재 페이지 확인 함수
  const isActivePage = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // 네비게이션 메뉴 아이템들
  const menuItems = [
    { path: '/', label: '홈' },
    { path: '/tutorial-gpt', label: '튜토리얼' },
    { path: '/select-field', label: '객관식 퀴즈' },
    { path: '/community/information', label: '주관식 퀴즈' },
    { path: '/community', label: '커뮤니티' }
  ]

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfileMenu(!showProfileMenu)
    } else {
      navigate('/login')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setShowProfileMenu(false)
      // 로그아웃 후에도 현재 페이지에 머무름 (기존 동작 유지)
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  // 사용자 이름의 첫 글자를 가져오는 함수
  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase()
    }
    return '?'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 bg-transparent">
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

      {/* 우측 그룹 - 네비게이션 메뉴와 프로필 버튼 */}
      <div className="flex items-center">
        {/* 네비게이션 메뉴들 */}
        {menuItems.map((item, index) => {
          const isActive = isActivePage(item.path)
          const isHovered = hoveredItem === index

          return (
            <div 
              key={item.path}
              className="relative flex flex-col items-center justify-center mx-3"
              style={{ 
                height: '36px'
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link 
                to={item.path}
                className="font-pretendard transition-colors duration-300 text-center px-2 relative"
                style={{ 
                  color: (isActive || isHovered) ? '#FF8A6A' : '#A7A7A7',
                  fontSize: '14px'
                }}
              >
                {item.label}
                
                {/* 그릇 아이콘 - 텍스트와 겹치게 배치 */}
                {(isActive || isHovered) && (
                  <img 
                    src="/images/bowl-icon.png" 
                    alt="Active indicator"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    style={{ 
                      width: '40px',
                      height: '14px',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </Link>
            </div>
          )
        })}

        {/* 프로필 버튼 - 네비게이션과 같은 높이로 정렬 */}
        <div className="relative ml-4">
          <button
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs transition-all duration-300 hover:scale-110 relative"
            style={{
              background: isAuthenticated 
                ? 'linear-gradient(135deg, #FF2802 0%, #FF8A6A 100%)'
                : 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            {isAuthenticated ? getInitial() : '?'}
            
            {/* 온라인 상태 표시 (로그인된 경우) */}
            {isAuthenticated && (
              <div 
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"
              />
            )}
          </button>

          {/* 프로필 드롭다운 메뉴 (로그인된 경우만) */}
          {isAuthenticated && showProfileMenu && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              {/* 사용자 정보 */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.name || '사용자'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              {/* 메뉴 아이템들 */}
              <Link
                to="/mypage"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                내 정보
              </Link>
              
              <Link
                to="/my-progress"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                학습 진도
              </Link>

              <hr className="my-1" />
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation