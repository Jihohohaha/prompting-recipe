import { useEffect, useRef } from "react";

/**
 * 화면 일부를 '픽셀화'해서 덮는 오버레이
 * - shape: "diamond" | "circle"
 * - radius: 기본 반경(px) / 마름모는 중심→꼭짓점 거리
 * - feather: 가장자리 부드럽게(블러 px)
 * - follow: 0~1, 작을수록 느리게 따라옴(자연스러움)
 * - speedGain: 마우스 속도(픽셀/프레임)에 곱해 반경 가산
 * - maxAdd: 반경 가산 상한
 * - overlayAlpha: 화면 덮개(예: 검정 0.7)를 픽셀화에도 반영
 */
export default function PixelateBubble({
  videoRef,
  mouseX = -9999,
  mouseY = -9999,
  radius = 40,
  pixelSize = 12,
  active = true,
  zIndex = 25,
  texts = [],
  overlayAlpha = 0,
  overlayColor = "black",
  shape = "diamond",     // 기본: 마름모
  feather = 16,          // 가장자리 부드럽게(블러)
  follow = 0.18,         // 따라오기 계수
  speedGain = 0.35,      // 속도→반경 가산 계수
  maxAdd = 22,           // 반경 가산 최대치
}) {
  const canvasRef = useRef(null);
  const offRef = useRef(document.createElement("canvas"));  // 저해상도 버퍼
  const posRef = useRef({ x: mouseX, y: mouseY });          // 부드러운 좌표
  const prevRef = useRef({ x: mouseX, y: mouseY });
  const tRef = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const off = offRef.current;
    const octx = off.getContext("2d");

    let rafId = 0;

    const fitCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const clipShape = (gctx, cx, cy, r) => {
      gctx.beginPath();
      if (shape === "diamond") {
        gctx.moveTo(cx, cy - r);
        gctx.lineTo(cx + r, cy);
        gctx.lineTo(cx, cy + r);
        gctx.lineTo(cx - r, cy);
        gctx.closePath();
      } else {
        gctx.arc(cx, cy, r, 0, Math.PI * 2);
      }
    };

    const draw = () => {
      const now = performance.now();
      const dt = Math.max(1, now - tRef.current);
      tRef.current = now;

      const v = videoRef?.current;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;

      // === 1) 픽셀화 프레임(저해상도 버퍼)에 렌더 ===
      const ow = Math.max(1, Math.floor(cw / pixelSize));
      const oh = Math.max(1, Math.floor(ch / pixelSize));
      off.width = ow; off.height = oh;
      octx.imageSmoothingEnabled = false;
      octx.clearRect(0, 0, ow, oh);

      if (v && v.videoWidth && v.videoHeight) {
        const vw = v.videoWidth, vh = v.videoHeight;
        const scale = Math.min(cw / vw, ch / vh);
        const dw = vw * scale, dh = vh * scale;
        const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
        // 저해상도 좌표로 변환
        octx.drawImage(
          v, 0, 0, vw, vh,
          dx / pixelSize, dy / pixelSize,
          dw / pixelSize, dh / pixelSize
        );
      } else {
        octx.fillStyle = "black";
        octx.fillRect(0, 0, ow, oh);
      }

      // 화면 덮개 동일 반영(색감 일치)
      if (overlayAlpha > 0) {
        octx.fillStyle = `rgba(0,0,0,${overlayAlpha})`;
        octx.fillRect(0, 0, ow, oh);
      }

      // 텍스트(원하면)
      texts.forEach(({ text, font, color = "#fff", xPerc = 0.5, yPerc = 0.5, align = "center" }) => {
        const patchedFont = font.replace(/(\d+(?:\.\d+)?)px/g, (_, n) => `${parseFloat(n) / pixelSize}px`);
        octx.font = patchedFont;
        octx.fillStyle = color;
        octx.textAlign = align;
        octx.textBaseline = "middle";
        octx.fillText(text, (cw * xPerc) / pixelSize, (ch * yPerc) / pixelSize);
      });

      // === 2) 마우스 → 부드러운 좌표(lerp) ===
      const p = posRef.current;
      const prev = prevRef.current;
      const tx = mouseX, ty = mouseY;

      // 마우스가 화면 밖(-9999)이면 천천히 투명해지는 느낌을 주고 싶을 때는
      // 여기서 p를 화면 밖으로 서서히 보간해도 됨. 지금은 즉시만.
      p.x += (tx - p.x) * follow;
      p.y += (ty - p.y) * follow;

      // 속도(픽셀/프레임) → 반경 가산
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      const speed = Math.hypot(dx, dy); // 프레임 기준
      prev.x = p.x; prev.y = p.y;

      const add = Math.min(maxAdd, speed * speedGain);
      const r = radius + add;

      // === 3) 메인 캔버스: 픽셀화 전체를 그리고, 마스크로 '부드러운 모양' 남기기 ===
      ctx.clearRect(0, 0, cw, ch);

      // (a) 픽셀화 프레임을 화면 크기로 확대
      ctx.imageSmoothingEnabled = false;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(off, 0, 0, ow, oh, 0, 0, cw, ch);

      // (b) feather 마스크로 부드럽게 잘라내기
      ctx.globalCompositeOperation = "destination-in";
      if (feather > 0) ctx.filter = `blur(${feather}px)`;
      ctx.beginPath();
      clipShape(ctx, p.x, p.y, r);
      ctx.fillStyle = "#fff";
      ctx.fill();
      if (feather > 0) ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";

      // 다음 프레임
      if (active) rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      fitCanvas();
      window.addEventListener("resize", fitCanvas);
      rafId = requestAnimationFrame(draw);
    };
    const stop = () => {
      window.removeEventListener("resize", fitCanvas);
      cancelAnimationFrame(rafId);
    };

    start();
    return stop;
  }, [
    videoRef, active, pixelSize, radius,
    mouseX, mouseY, texts,
    overlayAlpha, overlayColor, shape,
    feather, follow, speedGain, maxAdd
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
        mixBlendMode: "normal",
        background: "transparent"
      }}
    />
  );
}
