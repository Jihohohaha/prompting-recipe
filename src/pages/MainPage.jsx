import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TypingText from "../components/common/TypingText";
import BlurCrossfade from "../components/common/BlurCrossfade";
import PixelateBubble from "../components/common/PixelateBubble";

import MatrixRainOverlay from "../components/effects/MatrixRainOverlay";
import HeroTitle from "../components/common/HeroTitle";
import VideoStage from "../components/common/VideoStage";
import CodeTypingOverlay from "../components/common/CodeTypingOverlay";
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
  const [showCode, setShowCode] = useState(false);

  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const mosaicActive = !overlayGone;

  const ingredientPositions = [
    { name: "broccoli", angle: 320, image: "/images/broccoli.png" },
    { name: "cheese", angle: 220, image: "/images/cheese.png" },
    { name: "grapes", angle: 180, image: "/images/grapes.png" },
    { name: "apple", angle: 0, image: "/images/apple.png" },
  ];

  const codeLines = [/* 네가 쓰던 codeLines 그대로 */];

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
    setShowCode(true);
  };

  const handleEnded = () => {
    setShowCode(false);
    setShowCircle(true);
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
      <VideoStage ref={videoRef} onEnded={handleEnded} />

      <MatrixRainOverlay
        effect="binaryRain"          // 0/1로 비처럼 떨어짐
        maskSelector="#statue-hotspot"
        videoSelector="#bg-video"
        fontSize={14}
        density={16}
        speed={1.0}                  // 전체 속도
        trailLength={16}             // 꼬리 길이
        curtainFill={true}           // 위에서부터 점점 활성
        curtainDuration={3000}       // 커튼이 바닥까지 도달하는 시간
      />

      {showCode && (
        <CodeTypingOverlay lines={codeLines} speed={0.05} loop className="text-[40px]" />
      )}

      {showCircle && (
        <div className={`absolute inset-0 z-5 flex items-center justify-center ${dbg("border border-orange-500/60")}`}>
          <div className="w-[120vh] h-[120vh] border-4 border-orange-500 rounded-full" />
        </div>
      )}

      <IngredientRing items={ingredientPositions} radius={60} visible={showCircle} />

      <div
        className={[
          `absolute inset-0 bg-black/70 z-10 transition-opacity duration-700 ease-out`,
          overlayGone ? "opacity-0" : "opacity-100",
          dbg("border border-green-500/60"),
        ].join(" ")}
        aria-hidden="true"
      />

      <HeroTitle visible={!overlayGone} />

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

      <BlurCrossfade isActive={showTransition} onComplete={handleTransitionComplete} duration={1.5} />

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
