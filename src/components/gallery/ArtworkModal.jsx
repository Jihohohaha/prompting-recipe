// src/components/gallery/ArtworkModal.jsx
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ArtworkModal = ({ artwork, onClose, onLike }) => {
  const [isLiking, setIsLiking] = useState(false)

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden' // 스크롤 방지
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleLikeClick = async () => {
    if (isLiking || !onLike) return
    
    setIsLiking(true)
    try {
      await onLike(artwork.id)
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackdropClick}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      
      {/* 모달 컨텐츠 */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-full">
            {/* 왼쪽: 작품 이미지 */}
            <div className="lg:col-span-2 relative">
              <div className="aspect-video lg:aspect-auto lg:h-[600px] bg-gray-800 flex items-center justify-center">
                {artwork.image ? (
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNzAgMjI1SDIxMFYxNjVIMjcwVjIyNVpNMzMwIDIyNUgzOTBWMTY1SDMzMFYyMjVaTTI3MCAyODVIMjEwVjM0NUgyNzBWMjg1Wk0zMzAgMjg1SDM5MFYzNDVIMzMwVjI4NVoiIGZpbGw9IiM2Mzc0OEYiLz4KPC9zdmc+'
                    }}
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-6xl mb-4">🖼️</div>
                    <div>이미지가 없습니다</div>
                  </div>
                )}
              </div>
            </div>

            {/* 오른쪽: 작품 정보 */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[600px]">
              {/* HELLO 텍스트 */}
              <div className="text-center mb-6">
                <div className="text-white text-lg font-semibold tracking-wider">
                  HELLO
                </div>
              </div>

              {/* 작품 제목과 아티스트 */}
              <div className="mb-6">
                <h2 className="text-white text-2xl font-bold mb-2">
                  {artwork.title}
                </h2>
                <p className="text-gray-400 text-lg">
                  {artwork.artist}
                </p>
              </div>

              {/* 작품 스타일과 날짜 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {artwork.style}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Created on {new Date(artwork.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>

              {/* 프롬프트 */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">🎯 PROMPT</h3>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{artwork.prompt || '프롬프트 정보가 없습니다.'}"
                  </p>
                </div>
              </div>


              {/* 액션 버튼들 */}
              <div className="space-y-3">
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                  💾 컬렉션에 저장
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: artwork.title,
                        text: `${artwork.artist}의 작품: ${artwork.title}`,
                        url: window.location.href
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert('링크가 클립보드에 복사되었습니다!')
                    }
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  🔤 공유하기
                </button>
              </div>

              {/* 아티스트 프로필 */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {artwork.artist?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {artwork.artist}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {artwork.user?.email || 'AI 아티스트'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ArtworkModal