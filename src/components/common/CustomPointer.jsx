// src/components/CustomPointer.jsx
import { useEffect, useRef, useState } from "react";
// 방법 1) public 폴더 사용: src="/barcode-big.png" 로 전달
// 방법 2) assets import 사용 예시:
// import barcodeImg from "@/assets/barcode-big.png";

export default function CustomPointer({
  src = "/barcode-big.png", // public/ 아래 두기
  size = 128,               // 이미지 크기(px)
  hotspot = [32, 32],       // 클릭 기준점(이미지 내 좌표)
  smooth = 0.18,            // 따라오는 부드러움(0~1)
  hideNative = true,        // OS 커서 숨김
  hideOverInputs = true,    // 입력창 위에서는 숨김
}) {
  const raf = useRef(null);
  const pos = useRef({ x: -9999, y: -9999 });
  const target = useRef({ x: -9999, y: -9999 });
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (hideNative && !window.matchMedia("(pointer: coarse)").matches) {
      document.body.classList.add("cursor-none");
      return () => document.body.classList.remove("cursor-none");
    }
  }, [hideNative]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches; // 터치 기기
    if (coarse) return; // 터치 환경에서는 비활성

    const onMove = (e) => {
      if (hideOverInputs && e.target.closest('input, textarea, select, [contenteditable="true"]')) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      target.current.x = e.clientX - hotspot[0];
      target.current.y = e.clientY - hotspot[1];
      if (!raf.current) loop();
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideOverInputs, hotspot[0], hotspot[1]]);

  function loop() {
    pos.current.x += (target.current.x - pos.current.x) * smooth;
    pos.current.y += (target.current.y - pos.current.y) * smooth;
    if (imgRef.current) {
      imgRef.current.style.transform =
        `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${pressed ? 0.96 : 1})`;
      imgRef.current.style.opacity = visible ? "1" : "0";
    }
    raf.current = requestAnimationFrame(loop);
  }

  return (
    <div className="fixed left-0 top-0 z-[10000] pointer-events-none">
      <img
        ref={imgRef}
        src={src}
        alt=""
        width={size}
        height={size}
        draggable={false}
        className="select-none will-change-transform transition-opacity duration-150"
        style={{ transform: "translate3d(-9999px,-9999px,0)", opacity: 0 }}
      />
    </div>
  );
}
