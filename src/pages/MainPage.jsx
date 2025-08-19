import { useRef, useState, memo, useMemo } from "react";

/* ── 글자별 그라데이션: 한 번만 실행되도록 안정화 ───────────────────────── */
const StaggerFillText = memo(function StaggerFillText({ text, className = "", step = 70 }) {
  const letters = useMemo(
    () =>
      text.split("").map((ch, i) => (
        <span
          key={i}
          style={{ "--sd": `${i * step}ms` }}
          className="text-gradient-reveal"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      )),
    [text, step]
  );

  return <span className={`reveal-stagger ${className}`}>{letters}</span>;
});

export default function MainPage() {
  const videoRef = useRef(null);

  // 초기 오버레이(제목/버튼) 표시 상태
  const [overlayGone, setOverlayGone] = useState(false);

  // 마우스 위치 (모자이크 버블)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const MOSAIC_RADIUS = 50; // 버블 반지름(px)
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
    } catch {
      v.muted = true; // 모바일 폴백
      await v.play();
      setOverlayGone(true);
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
          src="/bg.mp4"
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
        <StaggerFillText
          text="PRomptinG"
          className="text-[80px] font-stretch leading-none"
        />
        <StaggerFillText
          text="[RECIPE]"
          className="text-[80px] font-desira leading-none"
        />

        <h3 className="mt-4 text-white text-[16px] max-w-[90vw]">
          AI는 재료고, 사용자가 요리사다. 프롬프트 엔지니어링은 레시피이다.
          <br />
          좋은 레시피로 요리를 해야 좋은 음식이 나온다.
        </h3>

        <div className="pointer-events-auto absolute bottom-[20vh] left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={handlePlay}
            className="px-6 py-3 rounded-full border bg-white border-white/40 text-black backdrop-blur-sm
                       hover:bg-white/10 active:scale-95 transition"
            aria-label="영상 재생"
          >
            요리를 시작해볼까요?
          </button>
        </div>
      </div>

      {/* 커서 따라다니는 모자이크(블러) 버블 — 재생 전만 표시 */}
      {mosaicActive && (
        <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
          <div
            className="
              absolute rounded-full
              backdrop-blur-[10px] backdrop-contrast-150 backdrop-saturate-75 backdrop-brightness-90
              transition-transform duration-75
            "
            style={{
              left: mouse.x - MOSAIC_RADIUS,
              top: mouse.y - MOSAIC_RADIUS,
              width: MOSAIC_RADIUS * 2,
              height: MOSAIC_RADIUS * 2,
            }}
          />
        </div>
      )}
    </div>
  );
}
