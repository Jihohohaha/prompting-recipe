// src/components/common/FourStageFillText.jsx (최종 안전 버전)
import { memo, useMemo } from "react";

/* ── 글자별 그라데이션: 4단계 애니메이션 (안전한 방법) ───────────────────────── */
const FourStageFillText = memo(function FourStageFillText({ 
  text, 
  className = "", 
  step = 100,
  animationDuration = 4
}) {
  const letters = useMemo(
    () =>
      text.split("").map((ch, i) => (
        <span
          key={i}
          style={{ 
            "--sd": `${i * step}ms`,
            "--duration": `${animationDuration}s`
          }}
          className="text-gradient-four-stage"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      )),
    [text, step, animationDuration]
  );

  return (
    <span className={`reveal-stagger ${className}`}>
      {letters}
      {/* 폴백 버전 (그라데이션이 안 될 때) */}
      <span className="sr-only">
        {text}
      </span>
    </span>
  );
});

export default FourStageFillText;