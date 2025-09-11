// src/pages/Community/AIGallery.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '../../components/layout/Navigation'
import ArtworkTicker from '../../components/gallery/ArtworkTicker'
import ArtworkModal from '../../components/gallery/ArtworkModal'
import apiService from '../../services/apiService'

const AIGallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const transformBackendData = (backendData) => {
    return backendData.map(item => ({
      id: item.board_id,
      title: item.title,
      artist: item.user.name,
      image: item.images && item.images.length > 0 ? item.images[0].image_url : null,
      prompt: item.content,
      style: "AI Generated",
      createdAt: item.created_at,
      user: item.user
    }))
  }

  // 컴포넌트 마운트 시 갤러리 데이터 로드
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true)
        const response = await apiService.getRecentGalleryImages()
        
        if (response.data && response.data.data) {
          const transformedData = transformBackendData(response.data.data)
          setArtworks(transformedData)
        } else {
          console.warn('Unexpected API response structure:', response.data)
          setArtworks([])
        }
      } catch (error) {
        console.error('갤러리 데이터 로드 실패:', error)
        setError('갤러리 데이터를 불러오는데 실패했습니다.')
        setArtworks([])
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryData()
  }, [])

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork)
  }

  const handleCloseModal = () => {
    setSelectedArtwork(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">갤러리를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Navigation />
      
      {/* 메인 레이아웃 - 좌우 분할 */}
      <div className="flex h-screen relative z-10">
        {/* 왼쪽 정보 섹션 */}
        <div className="w-1/3 flex flex-col justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl absolute top-20 self-start"
          >
            {/* 커뮤니티로 돌아가기 버튼 */}
            <Link 
              to="/community"
              className="text-[_#FF6C43_] hover:text-red-400 inline-block 
              font-pretendard transition-colors text-lg"
            >
              ← 커뮤니티로 돌아가기
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            {/* Prompting Recipe 제목 */}
            <div className="pb-28">
              <h1 className="text-[_#FF6C43_] text-6xl font-bold text-center font-stretch pb-4">
                PRompting
              </h1>
              <h2 className="text-[_#FF6C43_] text-4xl font-bold text-center font-stretch">
                [RECIPE]
              </h2>
            </div>

            {/* 설명 텍스트 */}
            <div className="text-white text-lg font-pretendard leading-normal text-center">
              <p>
                열심히 학습한 뒤 생성형 ai를 통해<br />
                다양한 아트 결과물들을 만들어낼 수 있습니다.<br />
                이제 그 결과물들을 갤러리에서 만나보세요 !<br />
                프롬프트도 확인할 수 있답니다
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* 갤러리 통계 */}
            {artworks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 text-gray-400 text-sm text-center"
              >
                총 {artworks.length}개의 작품이 전시되고 있습니다
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* 오른쪽 Ticker 섹션 */}
        <div className="w-2/3 flex items-center justify-center relative">
          <div
            className="absolute top-32 bg-gray-500 text-[_#FF6C43_] border-[_#FF6C43_] border 
             rounded-2xl left-8 py-2 px-8 w-fit 
             transform -rotate-1.75 z-50"
          >
            AI 아트 갤러리
          </div>
          {artworks.length > 0 ? (
            <ArtworkTicker 
              artworks={artworks} 
              onArtworkClick={handleArtworkClick}
            />
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">🎨</div>
              <div className="text-xl mb-2">아직 등록된 작품이 없습니다</div>
              <div className="text-sm">첫 번째 작품을 등록해보세요!</div>
            </div>
          )}
        </div>
      </div>

      {/* 작품 상세 모달 */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal 
            artwork={selectedArtwork} 
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AIGallery