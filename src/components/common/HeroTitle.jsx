import { memo, useMemo } from "react";

const StaggerFillText = memo(function StaggerFillText({
  text, className = "", step = 120, duration, durationStep = 0, style,
}) {
  const letters = useMemo(
    () => text.split("").map((ch, i) => {
      const per = { "--sd": `${i * step}ms` };
      if (duration != null) {
        per["--duration"] = typeof duration === "number" ? `${duration + i * durationStep}ms` : duration;
      }
      return (
        <span key={i} style={per} className="text-gradient-reveal">
          {ch === " " ? "\u00A0" : ch}
        </span>
      );
    }),
    [text, step, duration, durationStep]
  );
  return <span className={`reveal-stagger ${className}`} style={style}>{letters}</span>;
});

export default function HeroTitle({ visible = true, dbg = () => "" }) {
  return (
    <div
      className={[
        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
        "transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "opacity-0",
        dbg("border border-blue-500/60"),
      ].join(" ")}
    >
      <div className={`flex flex-col items-center ${dbg("border border-blue-300/60")}`}>
        <StaggerFillText text="PRomptinG" step={300} duration={1000} className="text-[80px] font-stretch leading-none" />
        <StaggerFillText text="[RECIPE]" step={300} duration={1000} className="text-[80px] font-desira leading-none" />
      </div>
    </div>
  );
}
