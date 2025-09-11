import { useEffect, useRef, useState } from "react";

/**
 * MatrixRainOverlay
 * - 전체 화면 캔버스에 매트릭스 레인 효과를 그림
 * - maskSelector 로 전달된 요소의 영역은 "구멍"을 내서 비워 둠
 * - videoSelector 로 전달된 <video> 가 play 중일 때만 그린다
 *
 * props
 * - maskSelector: '#statue-hotspot' 처럼 마스크로 제외할 DOM 요소 선택자
 * - videoSelector: '#bg-video' 처럼 재생 상태를 감지할 <video> 선택자
 * - density: 비의 열 밀도(큰 값일수록 조밀)
 * - fontSize: 글자 크기(px)
 * - speed: 낙하 속도 배수
 * - className: 추가 클래스
 */
export default function MatrixRainOverlay({
  maskSelector,
  videoSelector,
  density = 16,
  fontSize = 14,
  speed = 1,
  className = "",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const [maskVars, setMaskVars] = useState({ mx: "50%", my: "50%", mr: "0px" });
  const playingRef = useRef(true);

  // 비디오 재생 상태 감지
  useEffect(() => {
    if (!videoSelector) return;
    const vid = document.querySelector(videoSelector);
    if (!vid) return;

    const onPlay = () => (playingRef.current = true);
    const onPause = () => (playingRef.current = false);
    const onEnded = () => (playingRef.current = false);

    vid.addEventListener("play", onPlay);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("ended", onEnded);

    playingRef.current = !vid.paused;

    return () => {
      vid.removeEventListener("play", onPlay);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("ended", onEnded);
    };
  }, [videoSelector]);

  // 마스크(구멍) 위치/반경 추적
  useEffect(() => {
    function updateMaskFromSelector() {
      if (!maskSelector) return;
      const el = document.querySelector(maskSelector);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const r = (Math.max(rect.width, rect.height) / 2) * 1.08; // 살짝 여유

      setMaskVars({
        mx: `${(cx / vw) * 100}%`,
        my: `${(cy / vh) * 100}%`,
        mr: `${r}px`,
      });
    }

    updateMaskFromSelector();
    const ro = new ResizeObserver(updateMaskFromSelector);
    ro.observe(document.documentElement);

    window.addEventListener("resize", updateMaskFromSelector);
    window.addEventListener("scroll", updateMaskFromSelector, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMaskFromSelector);
      window.removeEventListener("scroll", updateMaskFromSelector);
    };
  }, [maskSelector]);

  // 캔버스 드로잉 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };
    window.addEventListener("resize", onResize);

    const glyphs =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const columnWidth = Math.max(8, fontSize);
    let columns = Math.floor(width / columnWidth);
    let drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height));

    function initColumns() {
      columns = Math.floor(width / columnWidth);
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height));
    }

    ctx.font = `${fontSize}px monospace`;

    let last = performance.now();
    const frame = (t) => {
      rafRef.current = requestAnimationFrame(frame);
      const dt = Math.min(64, t - last);
      last = t;

      if (!playingRef.current) return;

      // 잔상 페이드
      ctx.fillStyle = "rgba(0,0,0,0.075)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const x = i * columnWidth + columnWidth * 0.15;
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const y = drops[i] * (fontSize + density / 2);

        // 꼬리
        ctx.fillStyle = "rgba(0,255,70,0.7)";
        ctx.fillText(char, x, y);
        // 머리
        ctx.fillStyle = "rgba(200,255,200,0.9)";
        ctx.fillText(char, x, y - fontSize);

        const step = (0.06 + 0.04 * Math.random()) * speed * (dt / 16.7);
        drops[i] += step;

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [density, fontSize, speed]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[35] ${className}`}
      style={{
        // statue 영역을 비우는 원형 마스크
        maskImage: `radial-gradient(circle at var(--mx) var(--my), transparent var(--mr), black calc(var(--mr) + 1px))`,
        WebkitMaskImage: `radial-gradient(circle at var(--mx) var(--my), transparent var(--mr), black calc(var(--mr) + 1px))`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        ["--mx"]: maskVars.mx,
        ["--my"]: maskVars.my,
        ["--mr"]: maskVars.mr,
        mixBlendMode: "screen",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
