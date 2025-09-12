// src/components/gallery/ArtworkModal.jsx
import { useEffect, useState } from 'react'

// 프롬프트 모달 컴포넌트
const PromptModal = ({ artwork, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-8"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      
      <div className="relative bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-white text-2xl font-bold mb-6">프롬프트</h2>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-300 text-base leading-relaxed">
            "{artwork.prompt || '프롬프트 정보가 없습니다.'}"
          </p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

const ArtworkModal = ({ artwork, onClose }) => {
  const [showPromptModal, setShowPromptModal] = useState(false)

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !showPromptModal) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden' // 스크롤 방지
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, showPromptModal])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !showPromptModal) {
      onClose()
    }
  }

  const handlePromptClick = () => {
    setShowPromptModal(true)
  }

  const handleClosePromptModal = () => {
    setShowPromptModal(false)
  }

  // 사용된 AI 목록을 포맷팅하는 함수
  const formatUsedAI = (usedAI) => {
    if (!usedAI || !Array.isArray(usedAI)) {
      return 'AI CHAT GPT, KLING AI' // 기본값
    }
    return `AI ${usedAI.join(', ').toUpperCase()}`
  }

  return (
    <>
      {/* 메인 모달 */}
      <div 
        className="fixed inset-0 z-50 bg-black"
        onClick={handleBackdropClick}
      >
        {/* 배경 텍스트 - 가장 아래 레이어 */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-600 font-stretch text-[8rem] font-bold opacity-60 select-none">
            PRompting RECIPE
          </div>
        </div>

        {/* 컨텐츠 레이어 */}
        <div className="relative z-10 h-full flex flex-col">
          {/* 상단 영역 - X 버튼 */}
          <div className="flex justify-end p-8">
            <button
              onClick={onClose}
              className="w-14 h-14 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-6 space-y-6">

            {/* 작품명 */}
            <div className="text-white text-4xl font-bold text-center">
              {artwork.title || 'UNTITLED'}
            </div>

            {/* 작품 이미지 */}
            <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
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
                  <div className="text-8xl mb-4">🖼️</div>
                  <div className="text-xl">이미지가 없습니다</div>
                </div>
              )}
            </div>

            {/* 아티스트 정보 */}
            <div className="text-white text-xl text-center">
              artist | {artwork.artist || '지원'}
            </div>

            {/* AI 정보 */}
            <div className="text-white text-lg text-center">
              {formatUsedAI(artwork.usedAI)}
            </div>

            {/* 프롬프트 링크 버튼 */}
            <button
              onClick={handlePromptClick}
              className="bg-[#FF6C43] hover:bg-[#e55a35] text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              PROMPT LINK
            </button>
          </div>
        </div>
      </div>

      {/* 프롬프트 모달 */}
      {showPromptModal && (
        <PromptModal 
          artwork={artwork} 
          onClose={handleClosePromptModal}
        />
      )}
    </>
  )
}

export default ArtworkModal