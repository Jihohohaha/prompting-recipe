// src/components/common/IngredientOnCircle.jsx
import { useEffect, useMemo, useRef } from "react";

const IngredientOnCircle = ({ 
  name, 
  image, 
  angle, 
  radius = 60,
  active = false,     // 원이 뜬 뒤 true
  delay = 0           // 밀리초 지연
}) => {
  const elRef = useRef(null);

  // 각도 → 좌표
  const { x, y, baseTranslate } = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    const baseTranslate = `translate(calc(-50% + ${x}vh), calc(-50% + ${y}vh))`;
    return { x, y, baseTranslate };
  }, [angle, radius]);

  // 마운트/active 변화 시 개별 애니메이션 실행
  useEffect(() => {
    if (!active || !elRef.current) return;
    const el = elRef.current;

    // 초기 상태를 수동 세팅 (깜빡임 방지)
    el.style.opacity = "0";
    el.style.transform = `${baseTranslate} scale(0.9)`;

    // 다음 프레임에서 애니메이션 시작
    const id = requestAnimationFrame(() => {
      el.animate(
        [
          { transform: `${baseTranslate} scale(0.9)`, opacity: 0 },
          { transform: `${baseTranslate} scale(1)`,   opacity: 1 }
        ],
        {
          duration: 500,
          delay,         // ← 왼쪽부터 순차 지연
          easing: "ease",
          fill: "forwards"
        }
      );
    });

    return () => cancelAnimationFrame(id);
  }, [active, baseTranslate, delay]);

  return (
    <div
      ref={elRef}
      className="absolute z-15"
      style={{
        left: '50%',
        top: '50%',
        // 초기 렌더는 숨겨두고(깜빡임 방지), 애니메이션이 fill:forwards로 최종 상태 고정
        opacity: 0,
        transform: `${baseTranslate} scale(0.9)`
      }}
    >
      <img
        src={image}
        alt={name}
        className="w-48 h-48 object-contain"
      />
    </div>
  );
};

export default IngredientOnCircle;
