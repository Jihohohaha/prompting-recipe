// src/pages/MainPage.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FourStageFillText from "../components/common/FourStageFillText";
import MosaicBubble from "../components/common/MosaicBubble";
import TypingText from "../components/common/TypingText";

export default function MainPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 초기 오버레이(제목/버튼) 표시 상태
  const [overlayGone, setOverlayGone] = useState(false);

  // 마우스 위치 (모자이크 버블)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const mosaicActive = !overlayGone; // 재생 전만 활성화

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.playsInline = true;
    v.currentTime = 0;
    try {
      v.muted = false;
      await v.play();
      setOverlayGone(true);
      
      // 3초 후 select-field 페이지로 이동
      setTimeout(() => {
        navigate('/select-field');
      }, 3000);
    } catch {
      v.muted = true; // 모바일 폴백
      await v.play();
      setOverlayGone(true);
      
      // 3초 후 select-field 페이지로 이동
      setTimeout(() => {
        navigate('/select-field');
      }, 3000);
    }
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

      {/* 재생 전: 영상 위/글자 아래 70% 검정 덮개 */}
      <div
        className={[
          "absolute inset-0 bg-black/70 z-10 transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* 가운데 타이틀/설명 + 버튼 */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-20",
          "flex flex-col items-center justify-center text-center",
          "transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <FourStageFillText
          text="PRomptinG"
          className="text-[80px] font-stretch leading-none"
          step={120}  // 글자별 딜레이 조절
          animationDuration={5}  // 전체 애니메이션 시간 (초)
        />
        <FourStageFillText
          text="[RECIPE]"
          className="text-[80px] font-desira leading-none"
          step={120}  // 글자별 딜레이 조절
          animationDuration={5}  // 전체 애니메이션 시간 (초)
        />

        <TypingText
          text="AI는 재료고, 사용자가 요리사다. 프롬프트 엔지니어링은 레시피이다.<br />좋은 레시피로 요리를 해야 좋은 음식이 나온다."
          className="mt-4 text-white text-[16px] max-w-[90vw]"
          typingSpeed={100} // 타이핑 속도 (글자당 ms)
          blinkSpeed={100} // 커서 깜박임 속도 (ms)
          initialBlinkCount={12}
        />

        <div className="pointer-events-auto absolute bottom-[20vh] left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={handlePlay}
            className="px-6 py-3 rounded-full border bg-white border-white/40 text-black backdrop-blur-sm
                       hover:bg-white/10 hover:text-white active:scale-95 transition"
            aria-label="영상 재생"
          >
            요리를 시작해볼까요?
          </button>
        </div>
      </div>

      {/* 커서 따라다니는 모자이크(블러) 버블 — 재생 전만 표시 */}
      {mosaicActive && <MosaicBubble mouseX={mouse.x} mouseY={mouse.y} />}
    </div>
  );
}