// src/components/gallery/ArtworkTicker.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// 더미 데이터 - 실제 프로젝트의 src/assets/images 폴더 이미지들 사용
const DUMMY_ARTWORKS = [
  {
    id: 1,
    title: 'DIGITAL DREAM',
    artist: 'AIArtist',
    image: '/src/assets/images/ai-art-gallery.png',
    style: 'Digital Art',
    prompt: 'A futuristic cityscape with neon lights and floating buildings',
    usedAI: ['ChatGPT', 'DALL-E'],
    createdAt: new Date('2024-03-15')
  },
  {
    id: 2,
    title: 'ANCIENT WISDOM',
    artist: 'CreativeBot',
    image: '/src/assets/images/statue.png',
    style: 'Classical',
    prompt: 'Ancient Greek statue with modern artistic interpretation',
    usedAI: ['ChatGPT', 'Midjourney'],
    createdAt: new Date('2024-03-10')
  },
  {
    id: 3,
    title: 'MOSAIC VISION',
    artist: 'PixelMaster',
    image: '/src/assets/images/mosaic.png',
    style: 'Abstract',
    prompt: 'Colorful mosaic pattern with geometric shapes and vibrant colors',
    usedAI: ['Kling AI'],
    createdAt: new Date('2024-03-12')
  },
  {
    id: 4,
    title: 'NATURAL FLOW',
    artist: 'EcoArt',
    image: '/src/assets/images/basil.png',
    style: 'Nature',
    prompt: 'Organic patterns inspired by plant structures and natural forms',
    usedAI: ['ChatGPT', 'Stable Diffusion'],
    createdAt: new Date('2024-03-08')
  },
  {
    id: 5,
    title: 'COSMIC ENERGY',
    artist: 'StarGazer',
    image: '/src/assets/images/background.png',
    style: 'Space Art',
    prompt: 'Galactic nebula with swirling colors and cosmic dust particles',
    usedAI: ['ChatGPT', 'Kling AI'],
    createdAt: new Date('2024-03-14')
  },
  {
    id: 6,
    title: 'FOOD FUSION',
    artist: 'CulinaryVision',
    image: '/src/assets/images/tomato-halftone.png',
    style: 'Pop Art',
    prompt: 'Pop art style food illustration with halftone patterns',
    usedAI: ['ChatGPT', 'Kling AI'],
    createdAt: new Date('2024-03-11')
  },
  {
    id: 7,
    title: 'CHEESE DREAMS',
    artist: 'DairyArt',
    image: '/src/assets/images/cheese.png',
    style: 'Surreal',
    prompt: 'Surreal interpretation of dairy products in dreamlike setting',
    usedAI: ['ChatGPT', 'Kling AI'],
    createdAt: new Date('2024-03-09')
  },
  {
    id: 8,
    title: 'ORGANIC MESH',
    artist: 'BioDesign',
    image: '/src/assets/images/broccoli.png',
    style: 'Bio Art',
    prompt: 'Organic structures and natural textures with scientific precision',
    usedAI: ['ChatGPT', 'Kling AI'],
    createdAt: new Date('2024-03-13')
  },
  {
    id: 9,
    title: 'CULINARY ART',
    artist: 'FoodieBot',
    image: '/src/assets/images/olive.png',
    style: 'Still Life',
    prompt: 'Mediterranean inspired olive branches with artistic flair',
    usedAI: ['ChatGPT', 'Kling AI'],
    createdAt: new Date('2024-03-07')
  },
  {
    id: 10,
    title: 'SPICE WORLD',
    artist: 'FlavorAI',
    image: '/src/assets/images/pepperoni.png',
    style: 'Food Art',
    prompt: 'Vibrant spices and ingredients in dynamic composition',
    usedAI: ['ChatGPT', 'Kling AI'],
    createdAt: new Date('2024-03-06')
  }
];

// 개별 작품 카드 컴포넌트 - 23:18 비율 적용
const ArtworkCard = ({ artwork, onClick }) => {
  // 제목의 첫 번째 글자와 나머지를 분리하는 함수
  const renderStyledTitle = (title) => {
    if (!title) return '';
    const firstChar = title.charAt(0);
    const restChars = title.slice(1);
    
    return (
      <>
        <span className="text-red-600">{firstChar}</span>
        <span className="text-white">{restChars}</span>
      </>
    );
  };

  // 사용된 AI 목록을 문자열로 변환
  const formatUsedAI = (usedAI) => {
    if (!usedAI || !Array.isArray(usedAI)) {
      return 'AI CHAT GPT, KLING AI'; // 기본값
    }
    return `AI ${usedAI.join(', ').toUpperCase()}`;
  };

  return (
    <div className="flex-shrink-0 relative" style={{ transform: 'rotate(-3deg)' }}>
      {/* 이미지 카드 - 23:18 비율 (가로 409px, 세로 320px) */}
      <motion.div
        className="cursor-pointer group relative"
        style={{ width: '614px', height: '480px' }}
        onClick={onClick}
      >
        <div className="relative w-full h-full overflow-hidden bg-gray-900 border border-gray-700 shadow-2xl">
          {artwork.image ? (
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ aspectRatio: '23/18' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <div className="text-sm">No Image</div>
              </div>
            </div>
          )}
          
          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 px-4 py-2 rounded-full">
              자세히 보기
            </div>
          </div>

          {/* 이미지 위에 오버레이되는 텍스트들 - 하단 중앙 */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center space-y-2">
            
            {/* 작성자 정보 */}
            <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-1">
              <p className="text-white text-sm font-medium">
                artist | {artwork.artist || '지원'}
              </p>
            </div>
            
            {/* AI 정보 - 실제 사용된 AI 표시 */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-1">
              <p className="text-white text-xs font-medium">
                {formatUsedAI(artwork.usedAI)}
              </p>
            </div>
            
          </div>
        </div>
      </motion.div>

      {/* 작품 제목 - 별도 요소로 분리, 이미지 아래 겹치게 */}
      <div className="absolute bottom-0 left-0 right-0 text-center translate-y-8 z-10">
        <h3 className="font-bold text-7xl uppercase tracking-widest" title={artwork.title}>
          {renderStyledTitle(artwork.title)}
        </h3>
      </div>
    </div>
  );
};

const ArtworkTicker = ({ artworks, onArtworkClick }) => {
  const [duplicatedArtworks, setDuplicatedArtworks] = useState([]);
  const controls = useAnimation();
  const tickerContainerRef = useRef(null);
  const animationRef = useRef({ startTime: 0, duration: 0 });

  // 사용할 작품 데이터 결정 (props로 받은 것이 있으면 사용, 없으면 더미 데이터)
  const displayArtworks = artworks && artworks.length > 0 ? artworks : DUMMY_ARTWORKS;

  useEffect(() => {
    if (displayArtworks.length > 0) {
      // 15번 복사해서 충분한 양의 이미지 확보
      const repeatCount = 15;
      const repeated = Array(repeatCount).fill().flatMap(() => displayArtworks);
      setDuplicatedArtworks(repeated);
    }
  }, [displayArtworks]);

  useEffect(() => {
    if (duplicatedArtworks.length > 0) {
      // 23:18 비율에 맞는 카드 크기로 업데이트 (409px + gap)
      const cardWidth = 634; // 409px + 21px gap
      const singleSetWidth = displayArtworks.length * cardWidth;
      const duration = 1000; 
      
      animationRef.current = {
        startTime: Date.now(),
        duration: duration * 1000
      };
      
      controls.start({
        x: singleSetWidth * 5, // 오른쪽으로 5세트만큼 이동
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear'
          }
        }
      });
    }
  }, [duplicatedArtworks, displayArtworks.length, controls]);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    // 23:18 비율에 맞는 카드 크기로 업데이트
    const cardWidth = 634;
    const singleSetWidth = displayArtworks.length * cardWidth;
    const duration = 1000;
    
    // 현재 transform 값을 DOM에서 직접 가져오기
    const element = tickerContainerRef.current;
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const transform = computedStyle.transform;
      
      let currentX = -singleSetWidth * 10; // 기본값
      
      if (transform && transform !== 'none') {
        const matrix = transform.match(/matrix.*\((.+)\)/);
        if (matrix) {
          const values = matrix[1].split(', ');
          currentX = parseFloat(values[4]) || -singleSetWidth * 10;
        }
      }
      
      // 현재 위치에서 애니메이션 재시작
      controls.start({
        x: singleSetWidth * 5, // 오른쪽으로 5세트만큼 이동
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear'
          }
        }
      });
    }
  };

  const handleArtworkClick = (artwork) => {
    if (onArtworkClick) {
      onArtworkClick(artwork);
    } else {
      console.log('Clicked artwork:', artwork);
    }
  };

  if (duplicatedArtworks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400 text-lg">작품을 불러오는 중...</div>
      </div>
    );
  }

  const cardWidth = 634; // 업데이트된 카드 너비
  const singleSetWidth = displayArtworks.length * cardWidth;

  return (
    <div className="relative w-full overflow-hidden h-[580px]">
      {/* 그라디언트 페이드 효과 */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      {/* 티커 컨테이너 */}
      <div
        className="flex h-full items-center py-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={tickerContainerRef}
          className="flex gap-5"
          initial={{ x: -singleSetWidth * 10 }} // 10세트만큼 왼쪽에서 시작
          animate={controls}
        >
          {duplicatedArtworks.map((artwork, index) => (
            <ArtworkCard
              key={`${artwork.id}-${index}`}
              artwork={artwork}
              onClick={() => handleArtworkClick(artwork)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ArtworkTicker;