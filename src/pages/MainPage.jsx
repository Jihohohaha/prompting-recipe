// src/pages/MainPage.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FourStageFillText from "../components/common/FourStageFillText";
import MosaicBubble from "../components/common/MosaicBubble";
import TypingText from "../components/common/TypingText";
import IngredientOnCircle from "../components/common/IngredientOnCircle";
import BlurCrossfade from "../components/common/BlurCrossfade";

export default function MainPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  // OAuth 로그인 상태 추가
  const { user, isAuthenticated } = useAuth();

  // 초기 오버레이(제목/버튼) 표시 상태
  const [overlayGone, setOverlayGone] = useState(false);
  
  // 트랜지션 상태 추가
  const [showTransition, setShowTransition] = useState(false);

  // 마우스 위치 (모자이크 버블)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const mosaicActive = !overlayGone; // 재생 전만 활성화

  // 재료들의 원 위 위치 설정 (각도 기준)
  const ingredientPositions = [
    { name: 'broccoli', angle: 320, image: '/images/broccoli.png' },  // 좌상단
    { name: 'cheese', angle: 220, image: '/images/cheese.png' },       // 우상단
    { name: 'grapes', angle: 180, image: '/images/grapes.png' },      // 좌측
    { name: 'apple', angle: 0, image: '/images/apple.png' }           // 우측
  ];

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.playsInline = true;
    v.currentTime = 0;
    try {
      v.muted = false;
      await v.play();
      setOverlayGone(true);
      
      // 5초 후 자연스러운 트랜지션 시작
      setTimeout(() => {
        setShowTransition(true);
      }, 5000);
    } catch {
      v.muted = true; // 모바일 폴백
      await v.play();
      setOverlayGone(true);
      
      // 5초 후 자연스러운 트랜지션 시작
      setTimeout(() => {
        setShowTransition(true);
      }, 5000);
    }
  };

  // 트랜지션 완료 후 페이지 이동
  const handleTransitionComplete = () => {
    navigate('/tutorial-gpt'); // 또는 원하는 다른 페이지
  };

  // 로그인 페이지로 이동
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden bg-black"
      onMouseMove={(e) => {
        if (!mosaicActive) return;
        setMouse({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setMouse({ x: -9999, y: -9999 })}
    >

      {/* 비디오: 가운데 정렬, 원본비 유지 */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src="/videos/bg.mp4"
          className="h-full object-contain"
          preload="metadata"
          playsInline
        />
      </div>

      {/* 주황색 원 - 오버레이가 사라진 후 표시 */}
      {overlayGone && (
        <div className="absolute inset-0 z-5 flex items-center justify-center">
          <div className="w-[120vh] h-[120vh] border-4 border-orange-500 rounded-full" />
        </div>
      )}

      {/* 재료 이미지들 - 오버레이가 사라진 후 원 위에 표시 */}
      {overlayGone && (
        <>
          {ingredientPositions.map((ingredient) => (
            <IngredientOnCircle
              key={ingredient.name}
              name={ingredient.name}
              image={ingredient.image}
              angle={ingredient.angle}
              radius={60} // 원의 반지름과 맞춤 (120vh / 2 = 60vh)
            />
          ))}
        </>
      )}

      {/* 재생 전: 영상 위/글자 아래 70% 검정 덮개 */}
      <div
        className={[
          "absolute inset-0 bg-black/70 z-10 transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* OAuth 로그인 상태 표시 - 우상단 (오버레이가 있을 때만) */}
      {!overlayGone && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-4">
          {isAuthenticated ? (
            // 로그인한 사용자 정보
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-white text-sm font-medium">
                {user?.name || '사용자'}님
              </span>
            </div>
          ) : (
            // 로그인 버튼
            <button
              onClick={handleLoginClick}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 border border-white/20"
            >
              로그인하기
            </button>
          )}
        </div>
      )}

      {/* 메인 베너 - 화면 중앙에 위치 */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-20",
          "flex items-center justify-center",
          "transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex flex-col items-center justify-center">
          <FourStageFillText
            text="PRomptinG"
            className="text-[80px] font-stretch leading-none"
            step={120}
            animationDuration={5}
          />
          <FourStageFillText
            text="[RECIPE]"
            className="text-[80px] font-desira leading-none"
            step={120}
            animationDuration={5}
          />
        </div>
      </div>

      {/* 텍스트와 버튼 영역 - 메인 베너 하단에 위치 */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-20",
          "flex flex-col justify-end items-center pb-36",
          "transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-6">
          <TypingText
            text="AI는 재료고, 사용자가 요리사다. 프롬프트 엔지니어링은 레시피다.<br />좋은 레시피로 요리를 해야 좋은 음식이 나온다."
            className="text-white text-center text-lg font-light max-w-4xl"
            typingSpeed={50}
          />
          
          {/* 시작 버튼에 로그인 상태 반영 */}
          <button
            onClick={handlePlay}
            className="pointer-events-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isAuthenticated ? `${user?.name || '사용자'}님, 시작하기` : '시작하기'}
          </button>

          {/* 로그인하지 않은 사용자를 위한 안내 텍스트 */}
          {!isAuthenticated && (
            <p className="text-white/80 text-sm text-center mt-2">
              로그인하지 않아도 모든 학습 콘텐츠를 이용할 수 있습니다.<br />
              개인화 서비스를 원하시면 로그인해주세요.
            </p>
          )}
        </div>
      </div>

      {/* 모자이크 버블 - 마우스 추적 */}
      {mosaicActive && (
        <MosaicBubble
          x={mouse.x}
          y={mouse.y}
          size={200}
          className="z-15"
        />
      )}

      {/* 트랜지션 컴포넌트 */}
      {showTransition && (
        <BlurCrossfade
          onComplete={handleTransitionComplete}
          className="z-50"
        />
      )}
    </div>
  );
}