// src/components/common/StaggerFillText.jsx
import { memo, useMemo } from "react";

/* ── 글자별 그라데이션: 3단계 애니메이션 ───────────────────────── */
const StaggerFillText = memo(function StaggerFillText({ text, className = "", step = 70 }) {
  const letters = useMemo(
    () =>
      text.split("").map((ch, i) => (
        <span
          key={i}
          style={{ "--sd": `${i * step}ms` }}
          className="text-gradient-three-stage"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      )),
    [text, step]
  );

  return <span className={`reveal-stagger ${className}`}>{letters}</span>;
});

export default StaggerFillText;