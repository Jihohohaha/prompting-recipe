// src/components/common/AICard.jsx
import { motion } from 'framer-motion'

export default function AICard({
  title,
  subtitle,
  frontImageSrc,
  onClick,
  index = 0,
  className = "",
  facts, // [{ label, subtitle, percent, reverse? }] (reverse=true면 낮을수록 별↑)
}) {
  // 기본 지표
  const baseFacts = [
    { label: 'Language Fluency',  subtitle: '언어 표현력',   percent: 95 },
    { label: 'Reasoning Ability', subtitle: '논리적 사고력', percent: 90 },
    { label: 'Factual Accuracy',  subtitle: '정확도',       percent: 75 },
    { label: 'Code Literacy',     subtitle: '코딩 능력',     percent: 85 },
    { label: 'Creativity',        subtitle: '창의력',       percent: 92 },
    { label: 'Hallucination Risk',subtitle: '환각률',       percent: 25 },
  ];

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // 10% 단위마다 별 0.5개: 90~100 → 5.0, 80~90 → 4.5, ... , 0~10 → 0.5
  const toHalfStarDecile = (percent = 0, reverse = false) => {
    const p = clamp(Number(percent) || 0, 0, 100);
    const v = reverse ? 100 - p : p;
    const d = Math.min(9, Math.floor(v / 10)); // 0..9 (100은 9로 고정)
    return (d * 0.5) + 0.5;                    // 0.5, 1.0, 1.5, ... , 5.0
  };

  // ★★★★★ 위에 채움층을 넓이로 마스킹해서 반개 표현
  const StarRow = ({ value = 0 }) => {
    const rating = clamp(Math.round(value * 2) / 2, 0, 5); // 0.5 단위 정규화
    const pct = (rating / 5) * 100;
    return (
      <span className="relative inline-block leading-none align-middle select-none" aria-label={`${rating} stars`}>
        <span className="text-gray-300">★★★★★</span>
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
          <span className="text-black">★★★★★</span>
        </span>
      </span>
    );
  };

  const source = (facts && facts.length ? facts : baseFacts);
  const items = source.map(it => ({
    ...it,
    rating: it.rating != null ? it.rating : toHalfStarDecile(it.percent, !!it.reverse),
  }));

  return (
    <motion.div
      className={`group relative w-full ${className}`}
      style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      onClick={onClick}
    >
      {/* 마스크(둥근 모서리/클리핑/그림자) */}
      <div className="relative h-full w-full rounded-2xl overflow-visible shadow-lg [perspective:1200px]">
        {/* 3D Stage (회전 담당) */}
        <div className="absolute inset-0 transform-gpu [transform-style:preserve-3d] overflow-visible">
          {/* 앞면 */}
          <div className="
            absolute inset-0 flex items-center justify-center
            transition-transform duration-700 ease-in-out
            [transform:rotateY(0deg)_translateZ(0.1px)]
            group-hover:[transform:rotateY(-180deg)_translateZ(0.1px)]
            [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
          ">
            <div className="absolute inset-0 bg-white border-4 border-white rounded-2xl pointer-events-none" />
            {frontImageSrc ? (
              <img src={frontImageSrc} alt={`${title} front`} className="absolute h-[180px] opacity-10 object-contain z-10" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No Front Image</span>
              </div>
            )}
            <div className="relative z-20 text-center p-6">
              <h3 className="text-[36px] font-bold text-black">{title}</h3>
              {subtitle && (
                <p className="mt-2 text-gray-800 text-[16px] leading-relaxed px-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* 뒷면 */}
          <div className="
            absolute inset-0 flex items-center justify-center
            transition-transform duration-700 ease-in-out
            [transform:rotateY(180deg)_translateZ(0.1px)]
            group-hover:[transform:rotateY(0deg)_translateZ(0.1px)]
            [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
          ">
            <div className="absolute inset-0 bg-white/50 border-4 border-white rounded-2xl pointer-events-none" />
            <div className="relative z-20 text-center p-2 m-6 w-full bg-white text-black border border-black">
              <div className="w-full text-left">
                <div className="text-[20px] font-extrabold leading-tight mb-1">Nutrition Facts</div>
                <div className="text-[10px] text-gray-700 mb-2">GPT - AI Nutrition Facts</div>
                <div className="border-t border-black my-1 mb-2" />

                {items.map((it, i) => (
                  <div key={`${it.label}-${i}`} className="mb-1">
                    <div className="flex text-[12px] justify-between items-center font-bold">
                      <span>{it.label}</span>
                      <span className="tabular-nums">.......... {it.percent}%</span>
                    </div>
                    {it.subtitle && (
                      <div className="text-[10px] text-gray-600 mt-1">{it.subtitle}</div>
                    )}
                    <div className="mt-[-20px] text-right">
                      <StarRow value={it.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* /뒷면 */}
        </div>
      </div>
    </motion.div>
  )
}
