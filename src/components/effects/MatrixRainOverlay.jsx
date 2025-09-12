import { useEffect, useRef, useState } from "react";

/**
 * MatrixRainOverlay
 *
 * effect:
 *  - "rain"        : 일반 매트릭스 레인
 *  - "binaryRain"  : 0/1만 사용하는 레인(열마다 꼬리, 머리 밝게)
 *
 * 옵션:
 *  - curtainFill: true면 화면이 위->아래로 서서히 "활성"되어 비가 점점 아래로 확장
 *  - curtainDuration: 커튼이 맨 아래까지 도달하는 시간(ms)
 *  - curtainPerColumn: true면 컬럼별로 커튼 진행이 다름
 *  - curtainProfile: "random" | "wave" | "random+wave"
 *  - curtainVariance: random일 때 진행치 편차(비율, 0~1)
 *  - waveAmp: 파동 진폭(비율, 0~1), wave 모드에서 진행치에 가감
 *  - wavePeriodCols: 파동의 가로 주기(컬럼 개수 단위)
 *  - waveSpeed: 초당 파동 회전수(cycles per second)
 */
export default function MatrixRainOverlay({
  maskSelector,
  videoSelector,
  effect = "binaryRain",
  density = 16,
  fontSize = 24,
  speed = 1,
  trailLength = 16,
  curtainFill = true,
  curtainDuration = 3000,
  curtainPerColumn = true,          // ⬅️ 컬럼별 커튼 활성
  curtainProfile = "random",        // "random" | "wave" | "random+wave"
  curtainVariance = 0.35,           // random 편차
  waveAmp = 0.25,                   // wave 진폭
  wavePeriodCols = 24,              // wave 가로 주기(컬럼 수 기준)
  waveSpeed = 0.5,                  // wave 속도(cycles/sec)
  className = "",
  // 마스크 미세 조정(원하면 사용)
  maskScale = 1,
  maskPadding = 0,
  maskOffset = { x: 0, y: 0 },
  maskRadius,
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
    const onPlay  = () => (playingRef.current = true);
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

  // 마스크 위치/반경 추적
  useEffect(() => {
    function updateMaskFromSelector() {
      if (!maskSelector) return;
      const el = document.querySelector(maskSelector);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const baseCx = rect.left + rect.width / 2;
      const baseCy = rect.top + rect.height / 2;
      const baseR  = (Math.max(rect.width, rect.height) / 2) * 1.08;

      const cx = baseCx + (maskOffset?.x ?? 0);
      const cy = baseCy + (maskOffset?.y ?? 0);
      const r  = maskRadius != null ? maskRadius : baseR * (maskScale ?? 1) + (maskPadding ?? 0);

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
  }, [maskSelector, maskScale, maskPadding, maskOffset?.x, maskOffset?.y, maskRadius]);

  // 드로잉 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columnW = Math.max(8, fontSize);
    const rowH = Math.max(fontSize + Math.max(2, density / 2), fontSize + 2);

    let cols = Math.ceil(width / columnW);
    let rows = Math.ceil(height / rowH);

    // 컬럼별 오프셋(Random) 저장
    const colOffset = [];
    // 시간 누적(파동 위상 계산)
    let tSec = 0;

    function setup() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / columnW);
      rows = Math.ceil(height / rowH);
      ctx.font = `${fontSize}px monospace`;

      if (curtainPerColumn && (curtainProfile === "random" || curtainProfile === "random+wave")) {
        // -variance ~ +variance 범위
        for (let c = 0; c < cols; c++) {
          colOffset[c] = (Math.random() * 2 - 1) * Math.max(0, Math.min(1, curtainVariance));
        }
      }
    }
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    setup();

    // 공통 상태
    let last = performance.now();

    // 드롭(y index) + 속도
    let drops = new Array(cols).fill(0).map(() => Math.random() * rows);
    let vels  = new Array(cols).fill(0).map(() => 0.8 + Math.random() * 0.7);

    // 커튼 진행(0~1)
    let curtain = curtainFill ? 0 : 1;

    const glyphs =
      effect === "binaryRain"
        ? "01"
        : "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

    const frame = (t) => {
      rafRef.current = requestAnimationFrame(frame);
      const dt = Math.min(64, t - last);
      last = t;
      tSec += dt / 1000;

      if (!playingRef.current) return;

      // 잔상 페이드
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);

      // 커튼 업데이트 (글로벌)
      if (curtainFill && curtain < 1) {
        const d = Math.max(300, curtainDuration);
        curtain = Math.min(1, curtain + (dt / d) * speed);
      }

      // 각 컬럼 처리
      for (let c = 0; c < cols; c++) {
        // 진행치 계산 (컬럼별 변형)
        let p = curtain;
        if (curtainPerColumn) {
          if (curtainProfile === "random" || curtainProfile === "random+wave") {
            p += colOffset[c] ?? 0;
          }
          if (curtainProfile === "wave" || curtainProfile === "random+wave") {
            const k = (2 * Math.PI) / Math.max(1, wavePeriodCols);
            const phase = k * c + 2 * Math.PI * waveSpeed * tSec;
            p += waveAmp * Math.sin(phase);
          }
          p = clamp01(p);
        }
        const activeRows = Math.floor(rows * p);

        // 드롭 헤드 업데이트
        drops[c] += vels[c] * speed * (dt / 16.7);
        if (drops[c] * rowH > height + trailLength * rowH) {
          drops[c] = -Math.random() * 10;
          vels[c] = 0.8 + Math.random() * 0.7;
        }

        // 꼬리 그리기
        const headRow = Math.floor(drops[c]);

        for (let tIdx = 0; tIdx < trailLength; tIdx++) {
          const r = headRow - tIdx;
          if (r < 0) break;

          // 커튼 미활성 영역은 스킵
          if (r >= activeRows) continue;

          const x = c * columnW + columnW * 0.15;
          const y = r * rowH + fontSize;

          // 문자 선택
          const ch =
            effect === "binaryRain"
              ? ((r + c) & 1) === 0 ? "0" : "1"
              : glyphs[Math.floor(Math.random() * glyphs.length)];

          // 색: 헤드 밝게, 꼬리는 점점 투명
          const a = Math.max(0, 1 - tIdx / trailLength);
          if (tIdx === 0) {
            ctx.fillStyle = "rgba(200,255,200,0.98)";
          } else {
            ctx.fillStyle =
              effect === "binaryRain"
                ? `rgba(0,255,70,${0.85 * a})`
                : `rgba(0,255,70,${0.7 * a})`;
          }
          ctx.fillText(ch, x, y);
        }
      }
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [
    effect, density, fontSize, speed, trailLength,
    curtainFill, curtainDuration, curtainPerColumn, curtainProfile, curtainVariance,
    waveAmp, wavePeriodCols, waveSpeed,
  ]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[35] ${className}`}
      style={{
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
