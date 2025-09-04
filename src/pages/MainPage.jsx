// src/pages/MainPage.jsx
import { useRef, useState, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TypingText from "../components/common/TypingText";
import IngredientOnCircle from "../components/common/IngredientOnCircle";
import BlurCrossfade from "../components/common/BlurCrossfade";
import PixelateBubble from "../components/common/PixelateBubble";

/* 글자별 순차 그라데이션 */
const StaggerFillText = memo(function StaggerFillText({
  text,
  className = "",
  step = 120,        // 글자 시작 지연 간격(ms)
  duration,          // 각 글자 애니메이션 길이 (숫자 ms or "0.2s")
  durationStep = 0,  // 글자마다 추가로 늘릴 길이(ms)
  style,             // 래퍼에 줄 스타일
}) {
  const letters = useMemo(
    () =>
      text.split("").map((ch, i) => {
        const perLetterStyle = {
          "--sd": `${i * step}ms`,
        };
        if (duration != null) {
          const dur =
            typeof duration === "number"
              ? `${duration + i * durationStep}ms`
              : duration;
          perLetterStyle["--duration"] = dur;
        }
        return (
          <span
            key={i}
            style={perLetterStyle}
            className="text-gradient-reveal"
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      }),
    [text, step, duration, durationStep]
  );
  return (
    <span className={`reveal-stagger ${className}`} style={style}>
      {letters}
    </span>
  );
});

export default function MainPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 초기 오버레이(제목/버튼) 표시 상태
  const [overlayGone, setOverlayGone] = useState(false);

  // 비디오 종료 후 주황색 원 표시
  const [showCircle, setShowCircle] = useState(false);

  // 트랜지션 상태
  const [showTransition, setShowTransition] = useState(false);

  // 마우스 위치 (모자이크 버블)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const mosaicActive = !overlayGone; // 재생 전만 활성화

  // 재료들의 원 위 위치 설정 (각도 기준)
  const ingredientPositions = [
    { name: 'broccoli', angle: 320, image: '/images/broccoli.png' },
    { name: 'cheese', angle: 220, image: '/images/cheese.png' },
    { name: 'grapes', angle: 180, image: '/images/grapes.png' },
    { name: 'apple', angle: 0, image: '/images/apple.png' }
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
      // ❌ 기존 5초 후 트랜지션 시작 로직 제거
    } catch {
      v.muted = true; // 모바일 폴백
      await v.play();
      setOverlayGone(true);
      // ❌ 기존 5초 후 트랜지션 시작 로직 제거
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
          // ✅ 영상이 끝나면 원을 띄우고, 약간의 쉼을 준 뒤 블러 트랜지션 시작
          onEnded={() => {
            setShowCircle(true);
            setTimeout(() => setShowTransition(true), 1200); // 필요 시 조절
          }}
        />
      </div>

      {/* 주황색 원 - ✅ 영상 종료 후에만 표시 */}
      {showCircle && (
        <div className="absolute inset-0 z-5 flex items-center justify-center">
          <div className="w-[120vh] h-[120vh] border-4 border-orange-500 rounded-full" />
        </div>
      )}

      {/* 재료 이미지들 - 오버레이가 사라진 후 원 위에 표시 (원은 영상 끝난 뒤 이미 떠 있음) */}
      {showCircle && (
        <>
          {([...ingredientPositions]
            .sort((a, b) => {
              const ax = Math.cos((a.angle * Math.PI) / 180);
              const bx = Math.cos((b.angle * Math.PI) / 180);
              return ax - bx; // 왼쪽(x 작음) → 오른쪽(x 큼)
            })
          ).map((ingredient, idx) => (
            <IngredientOnCircle
              key={ingredient.name}
              name={ingredient.name}
              image={ingredient.image}
              angle={ingredient.angle}
              radius={60}
              active={true}
              delay={idx * 180}   // 0ms, 180ms, 360ms, ...
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

      {/* 메인 베너 - 화면 중앙 */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-20",
          "flex items-center justify-center",
          "transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex flex-col items-center justify-center">
          <StaggerFillText
            text="PRomptinG"
            step={300}
            duration={1000}
            className="text-[80px] font-stretch leading-none"
          />
          <StaggerFillText
            text="[RECIPE]"
            step={300}
            duration={1000}
            className="text-[80px] font-desira leading-none"
          />
        </div>
      </div>

      {/* 텍스트와 버튼 영역 - 메인 베너 하단 */}
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
            text="셰프: 알맞는 재료와 함께<br />완벽한 레시피로 최고의 한 끼를 완성한다"
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
        duration={1.5}
      />

      {/* 커서 픽셀화 버블 — 재생 전만 표시 */}
      {mosaicActive && (
        <PixelateBubble
          videoRef={videoRef}
          mouseX={mouse.x}
          mouseY={mouse.y}
          shape="diamond"     // 마름모
          radius={50}         // 기본 크기
          pixelSize={14}      // 픽셀 크기
          feather={18}        // 가장자리 부드럽게
          follow={0.18}       // 부드럽게 따라오기
          speedGain={0.35}    // 속도에 따른 반경 가산
          maxAdd={22}         // 가산 상한
          active
          zIndex={15}
          overlayAlpha={0.7}  // 덮개와 동일
        />
      )}

    </div>
  );
}
