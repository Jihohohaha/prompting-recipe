import { useEffect, useMemo, useState } from "react";

export default function CodeTypingOverlay({
  lines,
  speed = 100,
  loop = true,
  className = "",
  dbg = () => "",
}) {
  const [pos, setPos] = useState(0);
  const text = useMemo(() => (lines || []).join("\n"), [lines]);

  useEffect(() => {
    let timer;
    const tick = () => {
      setPos((p) => {
        const n = p + 1;
        return n > text.length ? (loop ? 0 : text.length) : n;
      });
      timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, speed, loop]);

  return (
    <pre
      className={[
        "pointer-events-none absolute top-0 left-0 right-0 p-6",
        "font-mono text-[12px] leading-5 text-orange-400/90",
        "whitespace-pre-wrap select-none z-30",
        dbg("border border-orange-400/60"),
        className,
      ].join(" ")}
    >
      {text.slice(0, pos)}
      <span className="opacity-70">▌</span>
    </pre>
  );
}
