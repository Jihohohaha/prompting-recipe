// src/pages/MainPage.jsx
import { useRef, useState, memo, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypingText from "../components/common/TypingText";
import IngredientOnCircle from "../components/common/IngredientOnCircle";
import BlurCrossfade from "../components/common/BlurCrossfade";
import PixelateBubble from "../components/common/PixelateBubble";

/* ===== Debug 토글 ===== */
const DEBUG = 0;
const dbg = (cls) => (DEBUG ? cls : "");

/* 글자별 순차 그라데이션 */
const StaggerFillText = memo(function StaggerFillText({
  text,
  className = "",
  step = 120,
  duration,
  durationStep = 0,
  style,
}) {
  const letters = useMemo(
    () =>
      text.split("").map((ch, i) => {
        const perLetterStyle = { "--sd": `${i * step}ms` };
        if (duration != null) {
          const dur =
            typeof duration === "number"
              ? `${duration + i * durationStep}ms`
              : duration;
          perLetterStyle["--duration"] = dur;
        }
        return (
          <span key={i} style={perLetterStyle} className="text-gradient-reveal">
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      }),
    [text, step, duration, durationStep]
  );
  return (
    <span className={`reveal-stagger ${className}`} style={style}>
      {letters}
    </span>
  );
});

/* ===== 코드 타이핑 오버레이 ===== */
function CodeTypingOverlay({
  lines,
  speed = 100,         // 문자당 ms
  loop = true,        // 끝나면 다시 처음부터
  className = "",
}) {
  const [pos, setPos] = useState(0);
  const text = useMemo(() => (lines || []).join("\n"), [lines]);

  // 간단한 타이핑 루프: 전체 문자열을 위에서부터 순서대로
  useEffect(() => {
    let timer;
    const tick = () => {
      setPos((p) => {
        const next = p + 1;
        if (next > text.length) {
          return loop ? 0 : text.length;
        }
        return next;
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
        "whitespace-pre-wrap select-none z-20", // 비디오(z-0) 위에 표시
        dbg("border border-orange-400/60"),
        className,
      ].join(" ")}
    >
      {text.slice(0, pos)}
      <span className="opacity-70">▌</span>
    </pre>
  );
}

export default function MainPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 초기 오버레이(제목/버튼) 표시 상태
  const [overlayGone, setOverlayGone] = useState(false);

  // 비디오 종료 후 주황색 원 표시
  const [showCircle, setShowCircle] = useState(false);

  // 트랜지션 상태
  const [showTransition, setShowTransition] = useState(false);

  // 타이핑 코드 오버레이 표시
  const [showCode, setShowCode] = useState(false);

  // 마우스 위치 (모자이크 버블)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const mosaicActive = !overlayGone; // 재생 전만 활성화

  // 재료들의 원 위 위치 설정 (각도 기준)
  const ingredientPositions = [
    { name: "broccoli", angle: 320, image: "/images/broccoli.png" },
    { name: "cheese", angle: 220, image: "/images/cheese.png" },
    { name: "grapes", angle: 180, image: "/images/grapes.png" },
    { name: "apple", angle: 0, image: "/images/apple.png" },
  ];

  // 오버레이에 표시할 "주황색 코드" 라인들
  const codeLines = [
    "// Prompting Recipe — fast typing overlay",
    "const pantry = new Set(['broccoli','cheese','grapes','apple','salt','pepper','olive_oil']);",
    "const ingredients = ['broccoli','cheese','grapes','apple'];",
    "",
    "function log(...args){ console.log('[cook]', ...args) }",
    "const sleep = (ms) => new Promise(r => setTimeout(r, ms));",
    "",
    "// 기본 전처리",
    "function wash(item){ return `washed(${item})`; }",
    "function chop(item){ return `chopped(${item})`; }",
    "function measure(item, unit='g', qty=50){ return `${qty}${unit} ${item}`; }",
    "",
    "// 선택 유틸",
    "function pick(x){ return pantry.has(x) ? x : null; }",
    "function ensure(...xs){ xs.forEach(x => { if(!pantry.has(x)) throw new Error(`missing: ${x}`) }) }",
    "",
    "async function prep(list){",
    "  log('prep start', list);",
    "  const out = [];",
    "  for(const it of list){",
    "    const w = wash(it);",
    "    const c = chop(w);",
    "    out.push(c);",
    "  }",
    "  log('prep done');",
    "  return out;",
    "}",
    "",
    "function emulsify(a,b){ return `emulsion(${a}+${b})`; }",
    "function reduce(liquid, pct=0.3){ return `reduced(${liquid}:${Math.round(pct*100)}%)`; }",
    "",
    "function season(item, s=['salt','pepper']){",
    "  return `seasoned(${item}::${s.join(',')})`;",
    "}",
    "",
    "// 가열/결합",
    "async function combine(items, { heat='medium', oil='olive_oil' } = {}){",
    "  ensure(oil);",
    "  const base = emulsify(oil, 'juice(grapes)');",
    "  const sauce = reduce(base, 0.4);",
    "  const bowl = items.map(i => season(i));",
    "  return `combine[heat=${heat}](${bowl.join(' + ')} -> ${sauce})`;",
    "}",
    "",
    "function garnish(plate, withWhat=['cheese']){",
    "  return plate + ' + garnish(' + withWhat.join(',') + ')';",
    "}",
    "",
    "// 프롬프트 구성",
    "function buildPrompt({goal, constraints, tone='friendly'} = {}){",
    "  const lines = [];",
    "  lines.push('# Goal');",
    "  lines.push('- ' + (goal || 'Serve a balanced dish with vivid flavor.'));",
    "  lines.push('# Constraints');",
    "  for(const c of (constraints || ['Keep it simple','No burnt taste'])) lines.push('- ' + c);",
    "  lines.push('# Tone');",
    "  lines.push('- ' + tone);",
    "  return lines.join('\\n');",
    "}",
    "",
    "// LLM 모의 호출",
    "async function ask(model, prompt, opts={}){",
    "  await sleep(120);",
    "  return { text: `[${model}] \\n` + prompt + `\\n-> plan: prep -> combine -> plate` };",
    "}",
    "",
    "function plate(content){ return `plate{ ${content} }`; }",
    "",
    "async function cook({ heat='medium', model='gpt-chef' } = {}){",
    "  const prepped = await prep(ingredients);",
    "  const mix = await combine(prepped, { heat });",
    "  const basePlate = plate(mix);",
    "  const finalPlate = garnish(basePlate, ['cheese','grapes']);",
    "  const prompt = buildPrompt({",
    "    goal: 'Explain the recipe in 3 steps with tips.',",
    "    constraints: ['Use pantry items only','Keep timing under 20 min'],",
    "    tone: 'confident & warm'",
    "  });",
    "  const plan = await ask(model, prompt, { temperature: 0.7 });",
    "  return { dish: finalPlate, plan: plan.text };",
    "}",
    "",
    "// 실행",
    "async function main(){",
    "  try {",
    "    log('cooking…');",
    "    const { dish, plan } = await cook({ heat: 'medium-high' });",
    "    log('served:', dish);",
    "    log('plan:\\n' + plan);",
    "  } catch (e){",
    "    console.error('failed:', e.message);",
    "  }",
    "}",
    "",
    "// 확장: 평가 함수",
    "function score(dish){",
    "  const hasCheese = /cheese/.test(dish) ? 1 : 0;",
    "  const brightness = /grapes/.test(dish) ? 1 : 0;",
    "  const greens = /broccoli/.test(dish) ? 1 : 0;",
    "  const s = hasCheese + brightness + greens;",
    "  return `score=${s}/3`;",
    "}",
    "",
    "// 확장: 레시피 카드 출력",
    "function toCard({ dish, plan }){",
    "  return [",
    "    '=== RECIPE CARD ===',",
    "    'Dish: ' + dish,",
    "    score(dish),",
    "    '--- Plan ---',",
    "    plan,",
    "  ].join('\\n');",
    "}",
    "",
    "// 배치 실행(데모)",
    "(async () => {",
    "  await sleep(60);",
    "  const r = await cook({ heat: 'medium' });",
    "  console.log(toCard(r));",
    "})();",
    "",
    "// Prompting tips",
    "// 1) 명확한 목표와 제약을 적되, 과도한 금지어는 피한다.",
    "// 2) 단계/출력 포맷을 구체화하면 재현성이 높아진다.",
    "// 3) 평가 루프를 두어 결과를 스스로 self-check 하게 만든다.",
  ];


  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.playsInline = true;
    v.currentTime = 0;
    try {
      v.muted = false;
      await v.play();
      setOverlayGone(true);
      setShowCode(true); // ✅ 재생 시작 시 코드 오버레이 시작
    } catch {
      v.muted = true; // 모바일 폴백
      await v.play();
      setOverlayGone(true);
      setShowCode(true); // ✅ 폴백에서도 시작
    }
  };

  // 트랜지션 완료 후 페이지 이동
  const handleTransitionComplete = () => {
    navigate("/select-field");
  };

  return (
    <div
      className={`relative min-h-[100dvh] overflow-hidden bg-black ${dbg(
        "border border-red-500/60"
      )}`}
      onMouseMove={(e) => {
        if (!mosaicActive) return;
        setMouse({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setMouse({ x: -9999, y: -9999 })}
    >
      {/* 비디오: 가운데 정렬, 원본비 유지 */}
      <div
        className={`absolute inset-0 z-0 flex items-center justify-center ${dbg(
          "border border-yellow-500/60"
        )}`}
      >
        <video
          ref={videoRef}
          src="/videos/bg.mp4"
          className="h-full object-contain"
          preload="metadata"
          playsInline
          // ✅ 영상이 끝나면: 코드 중지 → 원 → 블러 트랜지션
          onEnded={() => {
            setShowCode(false);       // ✅ 코드 오버레이 종료
            setShowCircle(true);
            setTimeout(() => setShowTransition(true), 1200);
          }}
        />
      </div>

      {/* 🔸 코드 타이핑 오버레이: 재생 중에만 */}
      {showCode && (
        <CodeTypingOverlay
          lines={codeLines}
          speed={0.05}      // 더 느리게/빠르게 조절 가능
          loop={true}     // 영상 길이에 맞춰 반복
          className={`text-[40px] ${dbg("border border-orange-300/60")}`}
        />
      )}

      {/* 주황색 원 - ✅ 영상 종료 후에만 표시 */}
      {showCircle && (
        <div
          className={`absolute inset-0 z-5 flex items-center justify-center ${dbg(
            "border border-orange-500/60"
          )}`}
        >
          <div className="w-[120vh] h-[120vh] border-4 border-orange-500 rounded-full" />
        </div>
      )}

      {/* 재료 이미지들 - 원 위에 표시 (디버그는 div만 적용) */}
      {showCircle && (
        <>
          {([...ingredientPositions]
            .sort((a, b) => {
              const ax = Math.cos((a.angle * Math.PI) / 180);
              const bx = Math.cos((b.angle * Math.PI) / 180);
              return ax - bx;
            }))
            .map((ingredient, idx) => (
              <IngredientOnCircle
                key={ingredient.name}
                name={ingredient.name}
                image={ingredient.image}
                angle={ingredient.angle}
                radius={60}
                active={true}
                delay={idx * 180}
              />
            ))}
        </>
      )}

      {/* 재생 전: 영상 위/글자 아래 70% 검정 덮개 */}
      <div
        className={[
          `absolute inset-0 bg-black/70 z-10 transition-opacity duration-700 ease-out ${dbg(
            "border border-green-500/60"
          )}`,
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* 메인 베너 - 화면 중앙 */}
      <div
        className={[
          `pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ease-out ${dbg(
            "border border-blue-500/60"
          )}`,
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div
          className={`flex flex-col items-center justify-center ${dbg(
            "border border-blue-300/60"
          )}`}
        >
          <StaggerFillText
            text="PRomptinG"
            step={300}
            duration={1000}
            className="text-[80px] font-stretch leading-none"
          />
          <StaggerFillText
            text="[RECIPE]"
            step={300}
            duration={1000}
            className="text-[80px] font-desira leading-none"
          />
        </div>
      </div>

      {/* 텍스트와 버튼 영역 - 메인 베너 하단 */}
      <div
        className={[
          `pointer-events-none absolute inset-0 z-20 flex flex-col justify-end items-center pb-36 transition-opacity duration-700 ease-out ${dbg(
            "border border-cyan-500/60"
          )}`,
          overlayGone ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div
          className={`flex flex-col items-center gap-16 ${dbg(
            "border border-cyan-300/60"
          )}`}
        >
          <TypingText
            text="셰프: 알맞는 재료와 함께<br />완벽한 레시피로 최고의 한 끼를 완성한다"
            className="text-white text-[16px] max-w-[90vw] text-center font-pretendard"
            typingSpeed={100}
            blinkSpeed={100}
            initialBlinkCount={12}
          />
          <div className={`pointer-events-auto ${dbg("border border-cyan-200/60")}`}>
            <button
              type="button"
              onClick={handlePlay}
              className="main-button px-4 py-2 rounded-full border bg-zinc-300 border-zinc-300 text-black
                        hover:bg-zinc-400 hover:scale-105
                        active:scale-95 transition 
                        font-pretendard"
            >
              요리를 시작해볼까요?
            </button>
          </div>
        </div>
      </div>

      {/* 자연스러운 블러 크로스페이드 트랜지션 */}
      <BlurCrossfade
        isActive={showTransition}
        onComplete={handleTransitionComplete}
        duration={1.5}
      />

      {/* 커서 픽셀화 버블 — 재생 전만 표시 */}
      {mosaicActive && (
        <PixelateBubble
          videoRef={videoRef}
          mouseX={mouse.x}
          mouseY={mouse.y}
          shape="diamond"
          radius={50}
          pixelSize={14}
          feather={18}
          follow={0.18}
          speedGain={0.35}
          maxAdd={22}
          active
          zIndex={15}
          overlayAlpha={0.7}
        />
      )}
    </div>
  );
}
