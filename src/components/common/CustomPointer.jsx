// src/components/common/CustomPointer.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import defaultBarcode from "../../assets/images/barcode.png";

export default function CustomPointer({
  src = defaultBarcode,
  size = 128,
  hotspot = [32, 32],
  smooth = 0.18,
  hideNative = true,
  hideOverInputs = true,
}) {
  const raf = useRef(null);
  const pos = useRef({ x: -9999, y: -9999 });
  const target = useRef({ x: -9999, y: -9999 });
  const imgRef = useRef(null);

  // ✅ state 대신 ref로 가시성/클릭 상태 보관(클로저 이슈 방지)
  const visibleRef = useRef(false);
  const pressedRef = useRef(false);

  useEffect(() => {
    if (hideNative && !window.matchMedia("(pointer: coarse)").matches) {
      document.body.classList.add("cursor-none");
      return () => document.body.classList.remove("cursor-none");
    }
  }, [hideNative]);

  useEffect(() => {
    const move = (e) => {
      const t = e.touches?.[0];
      const cx = t ? t.clientX : e.clientX;
      const cy = t ? t.clientY : e.clientY;

      const tgt = e.target || document.body;
      visibleRef.current = !(hideOverInputs && tgt.closest?.('input, textarea, select, [contenteditable="true"]'));

      // 타깃 좌표(왼쪽/위 기준). 핫스팟은 transform에서 보정.
      target.current.x = cx;
      target.current.y = cy;

      if (!raf.current) loop();
    };
    const enter = () => { visibleRef.current = true; };
    const leave = () => { visibleRef.current = false; };
    const down  = () => { pressedRef.current = true; };
    const up    = () => { pressedRef.current = false; };

    const opts = { passive: true };
    window.addEventListener("pointermove", move, opts);
    window.addEventListener("mousemove", move, opts);
    window.addEventListener("pointerenter", enter);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    // 첫 프레임부터 루프 시작
    if (!raf.current) raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideOverInputs, hotspot[0], hotspot[1]]);

  function loop() {
    pos.current.x += (target.current.x - pos.current.x) * smooth;
    pos.current.y += (target.current.y - pos.current.y) * smooth;

    const el = imgRef.current;
    if (el) {
      // ✅ 화면 좌표를 left/top으로 갱신 (이것 때문에 -9999에서 벗어남)
      el.style.left = `${pos.current.x}px`;
      el.style.top  = `${pos.current.y}px`;
      // 3D 살짝(회전축 기울임)
      el.style.transform = `translate(${-hotspot[0]}px, ${-hotspot[1]}px) perspective(600px) rotateZ(${pressedRef.current ? '-10deg' : '0deg'}) rotateX(${pressedRef.current ? '-8deg' : '0deg'}) scale(${pressedRef.current ? 0.96 : 1})`;

      // ✅ 가시성은 ref로
      el.style.opacity = visibleRef.current ? "1" : "0";
    }
    raf.current = requestAnimationFrame(loop);
  }

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483647, pointerEvents: "none" }}>
      <img
        ref={imgRef}
        src={src}
        alt=""
        width={size}
        height={size}
        draggable={false}
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          willChange: "transform, opacity, left, top",
          display: "block",
          pointerEvents: "none",
          transition: "opacity 150ms",
        }}
        onError={() => console.error("CustomPointer: 이미지 로드 실패 →", src)}
      />
    </div>,
    document.body
  );
}
