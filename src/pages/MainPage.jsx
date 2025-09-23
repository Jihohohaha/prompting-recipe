// src/pages/MainPage.jsx
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TypingText from "../components/common/TypingText";
import BlurCrossfade from "../components/common/BlurCrossfade";
import PixelateBubble from "../components/common/PixelateBubble";

import MatrixRainOverlay from "../components/effects/MatrixRainOverlay";
import HeroTitle from "../components/common/HeroTitle";
import VideoStage from "../components/common/VideoStage";
import IngredientRing from "../components/common/IngredientRing";

/* Debug */
const DEBUG = 0;
const dbg = (cls) => (DEBUG ? cls : "");

export default function MainPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [overlayGone, setOverlayGone] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const mosaicActive = !overlayGone;

  const ingredientPositions = [
    { name: "broccoli", angle: 320, image: "/images/broccoli.png" },
    { name: "cheese", angle: 220, image: "/images/cheese.png" },
    { name: "grapes", angle: 180, image: "/images/grapes.png" },
    { name: "apple", angle: 0, image: "/images/apple.png" },
  ];

  // ====== 막판 페이드 아웃 오버레이 ======
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const FADE_BEFORE_END_MS = 2500; // 영상 끝나기 2.5초 전부터 서서히 어두워짐

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const updateFade = () => {
      const dur = Number.isFinite(v.duration) ? v.duration : 0;
      const cur = v.currentTime ?? 0;
      const remainingMs = Math.max(0, (dur - cur) * 1000);

      if (dur > 0 && remainingMs <= FADE_BEFORE_END_MS) {
        const t = 1 - remainingMs / FADE_BEFORE_END_MS; // 0→1
        setFadeOpacity(Math.min(1, Math.max(0, t)));
      } else {
        setFadeOpacity(0);
      }
    };

    const resetFade = () => setFadeOpacity(0);

    v.addEventListener("timeupdate", updateFade);
    v.addEventListener("seeking", updateFade);
    v.addEventListener("loadedmetadata", resetFade);
    v.addEventListener("play", resetFade);

    return () => {
      v.removeEventListener("timeupdate", updateFade);
      v.removeEventListener("seeking", updateFade);
      v.removeEventListener("loadedmetadata", resetFade);
      v.removeEventListener("play", resetFade);
    };
  }, []);

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.playsInline = true;
    try {
      v.muted = false;
      await v.play();
    } catch {
      v.muted = true;
      await v.play();
    }
    setOverlayGone(true);
  };

  const handleEnded = () => {
    setShowCircle(false);
    setTimeout(() => setShowTransition(true), 1200);
  };

  const handleTransitionComplete = () => navigate("/select-field");

  return (
    <div
      className={`relative min-h-[100dvh] overflow-hidden bg-black ${dbg("border border-red-500/60")}`}
      onMouseMove={(e) => {
        if (!mosaicActive) return;
        setMouse({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setMouse({ x: -9999, y: -9999 })}
    >
      {/* 배경 영상 */}
      <VideoStage ref={videoRef} onEnded={handleEnded} />

      {/* 매트릭스 레인 */}
      <MatrixRainOverlay
        effect="binaryRain"
        maskSelector="#statue-hotspot"
        videoSelector="#bg-video"
        fontSize={14}
        density={16}
        speed={1.0}
        trailLength={16}
        curtainFill={true}
        curtainDuration={3000}
      />

      {/* 원형 가이드 (옵션) */}
      {showCircle && (
        <div className={`absolute inset-0 z-5 flex items-center justify-center ${dbg("border border-orange-500/60")}`}>
          <div className="w-[120vh] h-[120vh] border-4 border-orange-500 rounded-full" />
        </div>
      )}

      {/* 재료 링 */}
      <IngredientRing items={ingredientPositions} radius={60} visible={showCircle} />

      {/* 초기 블러/모자이크 덮개 (시작 버튼 누르면 서서히 사라짐) */}
      <div
        className={[
          `absolute inset-0 bg-black/70 z-10 transition-opacity duration-700 ease-out`,
          overlayGone ? "opacity-0" : "opacity-100",
          dbg("border border-green-500/60"),
        ].join(" ")}
        aria-hidden="true"
      />

      {/* 히어로 타이틀 */}
      <HeroTitle visible={!overlayGone} />

      {/* 시작 CTA */}
      <div
        className={[
          "pointer-events-none absolute inset-0 z-20 flex flex-col justify-end items-center pb-36",
          "transition-opacity duration-700 ease-out",
          overlayGone ? "opacity-0" : "opacity-100",
          dbg("border border-cyan-500/60"),
        ].join(" ")}
      >
        <div className={dbg("border border-cyan-300/60")}>
          <TypingText
            text="셰프: 알맞는 재료와 함께<br />완벽한 레시피로 최고의 한 끼를 완성한다"
            className="text-white text-[16px] max-w-[90vw] text-center font-pretendard"
            typingSpeed={100}
            blinkSpeed={100}
            initialBlinkCount={12}
          />
          <div className="flex items-center justify-center pointer-events-auto mt-16">
            <button
              type="button"
              onClick={handlePlay}
              className="main-button px-4 py-2 rounded-full border bg-zinc-300 border-zinc-300 text-black
                         hover:bg-zinc-400 hover:scale-105 active:scale-95 transition font-pretendard"
            >
              요리를 시작해볼까요?
            </button>
          </div>
        </div>
      </div>

      {/* 영상 막판 페이드 오버레이 (끝나기 2.5초 전부터 어둡게) */}
      <div
        className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-200 ease-linear"
        style={{ background: "black", opacity: fadeOpacity }}
      />

      {/* 페이지 전환 블러 크로스페이드 */}
      <BlurCrossfade isActive={showTransition} onComplete={handleTransitionComplete} duration={1.5} />

      {/* 픽셀레이트 버블 (초반 인터랙션용) */}
      {mosaicActive && (
        <PixelateBubble
          videoRef={videoRef}
          mouseX={mouse.x}
          mouseY={mouse.y}
          shape="diamond"
          radius={50}
          pixelSize={14}
          feather={18}
          follow={0.18}
          speedGain={0.35}
          maxAdd={22}
          active
          zIndex={15}
          overlayAlpha={0.7}
        />
      )}
    </div>
  );
}
