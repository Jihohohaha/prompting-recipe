// src/pages/MainPage.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FourStageFillText from "../components/common/FourStageFillText";
import MosaicBubble from "../components/common/MosaicBubble";
import TypingText from "../components/common/TypingText";
import IngredientOnCircle from "../components/common/IngredientOnCircle";
import BlurCrossfade from "../components/common/BlurCrossfade";

export default function MainPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

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
    navigate('/select-field');
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
            className="text-white text-[16px] max-w-[90vw] text-center font-pretendard"
            typingSpeed={100}
            blinkSpeed={100}
            initialBlinkCount={12}
          />
          
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handlePlay}
              className="main-button px-4 py-2 rounded-full border bg-zinc-300 border-zinc-300 text-black
                        hover:bg-zinc-400 hover:scale-105
                        active:scale-95 transition 
                        font-pretendard"
            >
              요리를 시작해볼까요?
            </button>
          </div>
        </div>
      </div>

      {/* 자연스러운 블러 크로스페이드 트랜지션 */}
      <BlurCrossfade 
        isActive={showTransition}
        onComplete={handleTransitionComplete}
        duration={1.5} // 1.5초로 자연스럽게
      />

      {/* 커서 따라다니는 모자이크(블러) 버블 — 재생 전만 표시 */}
      {mosaicActive && <MosaicBubble mouseX={mouse.x} mouseY={mouse.y} />}
    </div>
  );
}