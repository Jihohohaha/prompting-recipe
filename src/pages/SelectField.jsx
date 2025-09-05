// src/pages/SelectField.jsx
/* ===== mode A ===== */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import PageEnterTransition from '../components/common/PageEnterTransition'

/* ===== Debug 토글 ===== */
const DEBUG = false
const dbg = (cls) => (DEBUG ? cls : "")

/* 배경 이미지 레이어 variants: enter 0.6s / leave 0.15s */
const bgVariants = {
  rest: {
    opacity: 0,
    scale: 1.05,
    transition: {
      opacity: { duration: 0.15, ease: 'easeOut' },
      scale:   { duration: 0.7,  ease: 'easeOut' },
    },
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.6, ease: 'easeOut' },
      scale:   { duration: 0.7, ease: 'easeOut' },
    },
  },
}

const SelectField = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const fieldOptions = [
    { 
      id: 1, 
      title: 'ALL-IN-ONE',
      subtitle: '올인원',
      path: '/select-ai/study',
      background: '/images/bg-comprehensive.png',
      description: '예술, 공학, 글쓰기뿐 아니라 상담이나 일상 속 궁금증까지, 주제에 제한 없이 자유롭게 배우고 묻고 나눌 수 있는 공간입니다.\n모든 분야를 연결해 새로운 시각과 배움을 넓혀갈 수 있습니다.',
      cardtitle: 'All-In-One',
      cardsubtitle: '기본적인 AI 활용'
    },
    { 
      id: 2, 
      title: 'ART & CREATIVITY',
      subtitle: '예술 & 창작',
      path: '/select-ai/art',
      background: '/images/bg-art.png',
      description: "상상만 하던 장면이 눈앞에 그려지고, 떠오른 아이디어가 곧바로 디자인이 됩니다. 새로운 도구는 단순히 편리함을 넘어,\n창작의 즐거움을 더 크게 열어줍니다. 지금 여기서, 당신만의 방식으로 예술과 디자인을 펼쳐보세요.",
      cardtitle: 'Art & Creativity',
      cardsubtitle: 'AI로 경험하는 예술과 창작'
    },
    { 
      id: 3, 
      title: 'CODING & DEVELOPMENT',
      subtitle: '프로그래밍 & 개발',
      path: '/select-ai/search',
      background: '/images/bg-coding.png',
      description: '전공자가 아니어도 괜찮습니다. 코딩은 생각보다 단순하고, 작은 시도만으로도 멋진 결과를 만들 수 있습니다.\n처음 시작하는 사람도 즐겁게 배울 수 있는 길을 열어드립니다.',
      cardtitle: 'Coding & Development',
      cardsubtitle: '개발과 프로그래밍을 위한 AI'
    },
    { 
      id: 4, 
      title: 'ESSAY & WRITING', 
      subtitle: '논술 & 글쓰기',
      path: '/select-ai',
      background: '/images/bg-write.png',
      description: `생각을 단순히 떠올리는 데서 끝내지 않고, 논리와 근거를 통해 글로 풀어내며,
      나만의 시각을 분명하게 표현합니다. 처음 쓰는 사람도 쉽게 따라오며, 글쓰기의 힘을 차근차근 키워갈 수 있습니다.`,
      cardtitle: 'Essay & Writing',
      cardsubtitle: 'AI와 함께하는 논술과 글쓰기'
    }
  ]

  // 디버깅용
  console.log('Current hovered card:', hoveredCard?.title || 'none')

  return (
    <div className={`w-full h-screen overflow-hidden relative ${dbg('border border-red-500/60')}`}>

      {/* 상단 보조 배경 레이어(하단보다 작게) */}
      {fieldOptions.map((option) => {
        const active = hoveredCard?.id === option.id
        return (
          <motion.div
            key={`bg-top-${option.id}`}
            className={`absolute inset-0 bg-no-repeat bg-bottom bg-[length:auto_50%] origin-bottom transform-gpu z-30 pointer-events-none ${dbg('border border-blue-500/60')}`}
            style={{ backgroundImage: `url(${option.background})` }}
            variants={bgVariants}
            initial="rest"
            animate={active ? 'active' : 'rest'}
          />
        )
      })}

      {/* 선택 없음: 상단 보조 영역(하단 50%)에 INSPIRATION 표시 */}
      {!hoveredCard && (
        <motion.div
          key="top-inspiration"
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="font-pretendard font-extrabold text-white text-[160px] tracking-[0.08em]">
            INSPIRATION
          </span>
        </motion.div>
      )}


      {/* 배경 레이어 - 최하단 */}
      <div className={`absolute inset-0 z-[1] ${dbg('border border-yellow-400/60')}`}>
        {/* 기본 다크 배경: 복귀 빠르게 */}
        <motion.div 
          className={`absolute inset-0 bg-black ${dbg('border border-amber-500/60')}`}
          animate={{ opacity: hoveredCard ? 0.85 : 1 }}
          transition={{ duration: hoveredCard ? 0.6 : 0.2, ease: 'easeOut' }}
        />

        {/* 메인 배경 이미지 레이어 */}
        {fieldOptions.map((option) => {
          const active = hoveredCard?.id === option.id
          return (
            <motion.div
              key={`bg-bottom-${option.id}`}
              className={`absolute inset-0 bg-no-repeat bg-bottom bg-[length:auto_80%] origin-bottom transform-gpu ${dbg('border border-cyan-500/60')}`}
              style={{ backgroundImage: `url(${option.background})` }}
              variants={bgVariants}
              initial="rest"
              animate={active ? 'active' : 'rest'}
            />
          )
        })}

        {/* 다크 오버레이 */}
        <div className={`absolute inset-0 bg-black/30 backdrop-blur-2xl ${dbg('border border-pink-500/60')}`} />
      </div>

      {/* Navigation */}
      <div style={{ zIndex: 50 }} className={`relative ${dbg('border border-orange-500/60')}`}>
        <Navigation />
      </div>

      {/* 메인 콘텐츠 */}
      <div className={`relative h-full flex items-start justify-center mt-16 z-20 ${dbg('border border-lime-500/60')}`}>
        <PageEnterTransition className={`w-full flex flex-col items-center justify-center px-8 ${dbg('border border-green-500/60')}`}>

          {/* 제목 */}
          <div className={`flex flex-col h-[30vh] items-center ${dbg('border border-purple-500/60')}`}>
            <motion.div 
              className={`text-center ${dbg('border border-fuchsia-500/60')}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className={`text-white/15 text-[100px] font-pretendard font-bold mb-4 ${dbg('border border-indigo-500/60')}`}>
                {hoveredCard?.title ?? "INSPIRATION"}
              </h1>
            </motion.div>
            <motion.div 
              className={`absolute flex h-[100px] items-center justify-center ${dbg('border border-fuchsia-500/60')}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className={`text-white text-[40px] font-pretendard font-bold ${dbg('border border-indigo-500/60')}`}>
                {hoveredCard?.subtitle ?? "어떤 영감이 필요하세요?"}
              </h1>
            </motion.div>
            <motion.p
              className={`text-white/90 w-[60vw] text-lg text-center drop-shadow-lg whitespace-pre-line ${dbg('border border-violet-500/60')}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {hoveredCard?.description ?? "원하는 분야를 선택해 시작해보세요!\n아래의 원에 마우스를 올려 내용을 확인하세요."}
            </motion.p>
          </div>

          {/* 분야 선택 카드들 */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl ${dbg('border border-sky-500/60')}`}>
            {fieldOptions.map((option, index) => (
              /* 바깥 래퍼: 마운트 연출만, 히트박스 비활성화 */
              <motion.div
                key={option.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.7 + (index * 0.15),
                  ease: "easeOut"
                }}
                className={`group will-change-transform pointer-events-none ${dbg('border border-teal-500/60')}`}
              >
                {/* 라우팅/호버 히트박스를 원으로 제한 (Link 자체를 clip) */}
                <Link
                  to={option.path}
                  aria-label={option.cardtitle}
                  className={`inline-block pointer-events-auto w-60 h-60
                    [-webkit-clip-path:circle(50%_at_50%_50%)]
                    [clip-path:circle(50%_at_50%_50%)]`}
                  onMouseEnter={() => setHoveredCard(option)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onTouchStart={() => setHoveredCard(option)}
                  onTouchEnd={() => setHoveredCard(null)}
                >
                  <div
                    className={`w-full h-full bg-white/10 backdrop-blur-md rounded-full
                      shadow-2xl flex items-center justify-center relative overflow-hidden
                      hover:bg-transparent hover:border-transparent
                      border border-white/20 transition-colors duration-500 ${dbg('border-2 border-rose-500/60')}`}
                  >
                    {/* 카드 내용 */}
                    <div className={`relative text-center p-6 group ${dbg('border border-amber-500/60')}`}>
                      <h3 className={`text-white text-xl font-bromawo mb-2 drop-shadow-lg group-hover:text-[22px] group-hover:leading-[30px] transition-all duration-300 ${dbg('border border-yellow-500/60')}`}>
                        {option.cardtitle}
                      </h3>
                      <p className={`text-white/80 text-sm drop-shadow group-hover:text-[16px] group-hover:leading-[22px] transition-all duration-300 ${dbg('border border-yellow-300/60')}`}>
                        {option.cardsubtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </PageEnterTransition>
      </div>
    </div>
  )
}

export default SelectField




/* ===== mode B ===== */

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import Navigation from '../components/layout/Navigation'
// import PageEnterTransition from '../components/common/PageEnterTransition'

// /* ===== Debug 토글 ===== */
// const DEBUG = false
// const dbg = (cls) => (DEBUG ? cls : "")

// /* 카드 호버 전용 variants: 들어갈 때 0.20s / 빠질 때 0.12s */
// const cardVariants = {
//   rest: {
//     scale: 1,
//     y: 0,
//     transition: { type: 'tween', duration: 0.2, ease: 'easeOut' },
//   },
//   hover: {
//     scale: 1.05,
//     y: -10,
//     transition: { type: 'tween', duration: 0.2, ease: 'easeOut' },
//   },
// }

// /* 배경 이미지 레이어 variants: enter 0.6s / leave 0.15s */
// const bgVariants = {
//   rest: {
//     opacity: 0,
//     scale: 1.05,
//     transition: {
//       opacity: { duration: 0.15, ease: 'easeOut' },
//       scale:   { duration: 0.7,  ease: 'easeOut' },
//     },
//   },
//   active: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       opacity: { duration: 0.6, ease: 'easeOut' },
//       scale:   { duration: 0.7, ease: 'easeOut' },
//     },
//   },
// }

// const SelectField = () => {
//   const [hoveredCard, setHoveredCard] = useState(null)

//   const fieldOptions = [
//     { 
//       id: 1, 
//       title: 'ALL-IN-ONE',
//       subtitle: '종합',
//       path: '/select-ai/study',
//       background: '/images/bg-comprehensive.png',
//       description: '다양한 AI 도구를 종합적으로 활용',
//       cardtitle: 'All-In-One',
//       cardsubtitle: '다양한 AI 도구를 종합적으로 활용'
//     },
//     { 
//       id: 2, 
//       title: 'ART & CREATIVITY',
//       subtitle: '예술 & 창작',
//       path: '/select-ai/art',
//       background: '/images/bg-art.png',
//       description: "상상만 하던 장면이 눈앞에 그려지고, 떠오른 아이디어가 곧바로 디자인이 됩니다. 새로운 도구는 단순히 편리함을 넘어, 창작의 즐거움을 더 크게 열어줍니다. 지금 여기서, 당신만의 방식으로 예술과 디자인을 펼쳐보세요.",
//       cardtitle: 'Art & Creativity',
//       cardsubtitle: '예술과 창작을 위한 AI'
//     },
//     { 
//       id: 3, 
//       title: 'CODING & DEVELOPMENT',
//       subtitle: '프로그래밍 & 개발',
//       path: '/select-ai/search',
//       background: '/images/bg-coding.png',
//       description: '전공자가 아니어도 괜찮습니다. 코딩은 생각보다 단순하고, 작은 시도만으로도 멋진 결과를 만들 수 있습니다. 처음 시작하는 사람도 즐겁게 배울 수 있는 길을 열어드립니다.',
//       cardtitle: 'Coding & Development',
//       cardsubtitle: '개발과 프로그래밍을 위한 AI'
//     },
//     { 
//       id: 4, 
//       title: 'ETC', 
//       subtitle: '기타',
//       path: '/select-ai',
//       background: '/images/bg-write.png',
//       description: '그 외 다양한 AI 활용 분야',
//       cardtitle: 'Etc',
//       cardsubtitle: '그 외 다양한 AI 활용 분야'
//     }
//   ]

//   // 디버깅용
//   console.log('Current hovered card:', hoveredCard?.title || 'none')

//   return (
//     <div className={`w-full h-screen overflow-hidden relative ${dbg('border border-red-500/60')}`}>
//       {/* 상단 보조 배경 레이어(하단보다 작게) */}
//       {fieldOptions.map((option) => {
//         const active = hoveredCard?.id === option.id
//         return (
//           <motion.div
//             key={`bg-top-${option.id}`}
//             className={`absolute inset-0 bg-no-repeat bg-bottom bg-[length:auto_50%] origin-bottom transform-gpu z-30 pointer-events-none ${dbg('border border-blue-500/60')}`}
//             style={{ backgroundImage: `url(${option.background})` }}
//             variants={bgVariants}
//             initial="rest"
//             animate={active ? 'active' : 'rest'}
//           />
//         )
//       })}

//       {/* 배경 레이어 - 최하단 */}
//       <div className={`absolute inset-0 z-1 ${dbg('border border-yellow-400/60')}`}>
//         {/* 기본 다크 배경: 복귀 빠르게 */}
//         <motion.div 
//           className={`absolute inset-0 bg-black ${dbg('border border-amber-500/60')}`}
//           animate={{ opacity: hoveredCard ? 0.85 : 1 }}
//           transition={{ duration: hoveredCard ? 0.6 : 0.2, ease: 'easeOut' }}
//         />

//         {/* 메인 배경 이미지 레이어 */}
//         {fieldOptions.map((option) => {
//           const active = hoveredCard?.id === option.id
//           return (
//             <motion.div
//               key={`bg-bottom-${option.id}`}
//               className={`absolute inset-0 bg-no-repeat bg-bottom bg-[length:auto_80%] origin-bottom transform-gpu ${dbg('border border-cyan-500/60')}`}
//               style={{ backgroundImage: `url(${option.background})` }}
//               variants={bgVariants}
//               initial="rest"
//               animate={active ? 'active' : 'rest'}
//             />
//           )
//         })}

//         {/* 다크 오버레이 */}
//         <div className={`absolute inset-0 bg-black/30 backdrop-blur-2xl ${dbg('border border-pink-500/60')}`} />
//       </div>

//       {/* Navigation */}
//       <div style={{ zIndex: 50 }} className={`relative ${dbg('border border-orange-500/60')}`}>
//         <Navigation />
//       </div>

//       {/* 메인 콘텐츠 */}
//       <div className={`relative h-full flex items-start justify-center mt-16 z-20 ${dbg('border border-lime-500/60')}`}>
//         <PageEnterTransition className={`w-full flex flex-col items-center justify-center px-8 ${dbg('border border-green-500/60')}`}>
//           {/* 제목 */}
//           <div className={`flex flex-col h-[30vh] items-center ${dbg('border border-purple-500/60')}`}>
//             <motion.div 
//               className={`text-center ${dbg('border border-fuchsia-500/60')}`}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//             >
//               <h1 className={`text-white/15 text-[100px] font-pretendard mb-4 ${dbg('border border-indigo-500/60')}`}>
//                 {hoveredCard?.title ?? "INSPIRATION"}
//               </h1>
//             </motion.div>
//             <motion.p
//               className={`text-white/90 w-[60vw] text-lg text-center drop-shadow-lg ${dbg('border border-violet-500/60')}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               {hoveredCard?.description ?? "영감에 따라 레시피 내용이 달라집니다! AI 종류에 마우스를 갖다대면 설명을 볼 수 있습니다."}
//             </motion.p>
//           </div>

//           {/* 분야 선택 카드들 */}
//           <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl ${dbg('border border-sky-500/60')}`}>
//             {fieldOptions.map((option, index) => (
//               /* 바깥 래퍼: 마운트 연출 */
//               <motion.div
//                 key={option.id}
//                 initial={{ opacity: 0, y: 0, scale: 1 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ 
//                   duration: 0.6, 
//                   delay: 0.7 + (index * 0.15),
//                   ease: "easeOut"
//                 }}
//                 className={`group cursor-pointer will-change-transform ${dbg('border border-teal-500/60')}`}
//                 onMouseEnter={() => setHoveredCard(option)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 {/* 안쪽: hover 전용 variants */}
//                 <motion.div
//                   variants={cardVariants}
//                   initial="rest"
//                   animate="rest"
//                   whileHover="hover"
//                   className={dbg('border border-emerald-500/60')}
//                 >
//                   <Link to={option.path}>
//                     <div className={`w-60 h-60 bg-white/10 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/20 hover:border-transparent hover:bg-transparent transition-colors duration-150 ${dbg('border-2 border-rose-500/60')}`}>
//                       {/* 호버 오버레이: 길게 남지 않도록 150ms */}
//                       <div className={`absolute inset-0 bg-gradient-to-br from-[#FF2802]/20 to-[#FF8A6A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${dbg('border border-emerald-400/60')}`} />
                      
//                       {/* 카드 내용 */}
//                       <div className={`relative text-center p-6 ${dbg('border border-amber-500/60')}`}>
//                         <h3 className={`text-white text-xl font-bromawo transition-colors duration-150 group-hover:text-white mb-2 drop-shadow-lg ${dbg('border border-yellow-500/60')}`}>
//                           {option.cardtitle}
//                         </h3>
//                         <p className={`text-white/80 text-sm transition-colors duration-150 group-hover:text-white/90 drop-shadow ${dbg('border border-yellow-300/60')}`}>
//                           {option.cardsubtitle}
//                         </p>
//                       </div>

//                       {/* 글로우 효과: 150ms로 동기화 */}
//                       <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${dbg('border border-violet-400/60')}`}>
//                         <div className={`absolute inset-0 bg-white/5 rounded-xl ${dbg('border border-violet-500/60')}`} />
//                         <div className={`absolute -inset-2 bg-white/10 rounded-xl blur-xl ${dbg('border border-violet-600/60')}`} />
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>

//           {/* 하단 안내 텍스트 */}
//           <motion.div
//             className={`mt-12 text-center ${dbg('border border-stone-500/60')}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.6 }}
//           >
//             <p className={`text-white/80 text-sm drop-shadow ${dbg('border border-stone-400/60')}`}>
//               -
//             </p>
//           </motion.div>
//         </PageEnterTransition>
//       </div>
//     </div>
//   )
// }

// export default SelectField

