// src/components/common/TypingText.jsx
import { useState, useEffect, memo } from "react";

const TypingText = memo(function TypingText({ 
  text, 
  typingSpeed = 50, 
  blinkSpeed = 500,
  initialBlinkCount = 3,
  className = ""
}) {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  const fullText = text.replace(/<br\s*\/?>/g, "\n");
  const fullTextLines = fullText.split('\n');

  useEffect(() => {
    let intervalId;
    let blinkCounter = 0;
    
    // 1단계: 초기 커서 깜빡임
    const startInitialBlink = () => {
      intervalId = setInterval(() => {
        if (blinkCounter < initialBlinkCount * 2) {
          setShowCursor(prev => !prev);
          blinkCounter++;
        } else {
          clearInterval(intervalId);
          startTyping();
        }
      }, blinkSpeed);
    };

    // 2단계: 타이핑 시작
    const startTyping = () => {
      let index = 0;
      setShowCursor(true); // 타이핑 시작 시 커서 보이게 함
      intervalId = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.substring(0, index));
          index++;
        } else {
          clearInterval(intervalId);
          setIsTypingComplete(true);
        }
      }, typingSpeed);
    };

    startInitialBlink();

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, [fullText, typingSpeed, blinkSpeed, initialBlinkCount]);

  // 타이핑 완료 후 커서 숨김
  useEffect(() => {
    if (isTypingComplete) {
      setShowCursor(false);
    }
  }, [isTypingComplete]);

  const typedLines = typedText.split('\n');

  return (
    <div className={className}>
      {fullTextLines.map((line, lineIndex) => (
        <p key={lineIndex} className="min-h-[1.5em] relative">
          {typedLines[lineIndex] || ''}
          {
            // 커서 렌더링 조건: 타이핑 중이거나, 초기 깜빡임 단계일 때만 표시
            !isTypingComplete && (typedLines.length - 1 === lineIndex) && (
              <span className="inline-block relative w-[2px] h-[1.1em] ml-[2px] bg-white animate-blink" style={{ opacity: showCursor ? 1 : 0 }} />
            )
          }
        </p>
      ))}
    </div>
  );
});

export default TypingText;