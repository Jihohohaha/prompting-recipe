// src/components/community/CommunityBackground.jsx
const CommunityBackground = ({ hoveredButton, communityButtons }) => {
  return (
    <div className="absolute inset-0">
      {/* 기본 배경 */}
      <div 
        className="absolute inset-0 transition-opacity bg-black duration-700 ease-out"
        style={{
          opacity: hoveredButton ? 0 : 1
        }}
      />
      
      {/* 호버 시 변경되는 배경 이미지들 */}
      {communityButtons.map((button, index) => {
        const opacities = [0.7, 1, 0.5] // 각각 90%, 90%, 70%
        return (
            <div
            key={`bg-${button.id}`}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
                backgroundImage: `url(${button.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: hoveredButton === button.id ? opacities[index] : 0,
                transform: hoveredButton === button.id ? 'scale(1.05)' : 'scale(1)'
            }}
           />
        )
       })}
      
      {/* 오버레이
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          opacity: hoveredButton ? 1 : 0
        }}
      /> */}
      <div
        className="absolute inset-0 backdrop-blur-md transition-opacity duration-700"
        style={{
          opacity: hoveredButton ? 1 : 0,
        }}
      />
    </div>
  )
}

export default CommunityBackground