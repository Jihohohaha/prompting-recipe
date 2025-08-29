// src/components/common/MosaicBubble.jsx
const MosaicBubble = ({ mouseX, mouseY, radius = 50 }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      <div
        className="
          absolute rounded-full
          backdrop-blur-[10px] backdrop-contrast-150 backdrop-saturate-75 backdrop-brightness-90
          transition-transform duration-75
        "
        style={{
          left: mouseX - radius,
          top: mouseY - radius,
          width: radius * 2,
          height: radius * 2,
        }}
      />
    </div>
  );
};

export default MosaicBubble;