import { forwardRef } from "react";

const VideoStage = forwardRef(function VideoStage(
  { src = "/videos/bg.mp4", onEnded, hotspotRect, dbg = () => "" },
  videoRef
) {
  const { left, top, width, height } = hotspotRect || {};
  return (
    <div className={`absolute inset-0 z-0 flex items-center justify-center ${dbg("border border-yellow-500/60")}`}>
      <video
        ref={videoRef}
        id="bg-video"
        src={src}
        className="h-full object-contain"
        preload="metadata"
        playsInline
        onEnded={onEnded}
      />
      {/* statue 영역 앵커 */}
      <div
        id="statue-hotspot"
        className="absolute"
        style={{
          left: left ?? "calc(50% - 180px)",
          top: top ?? "18vh",
          width: width ?? "360px",
          height: height ?? "800px",
        }}
      />
    </div>
  );
});

export default VideoStage;
