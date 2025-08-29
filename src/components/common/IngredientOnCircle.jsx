// src/components/common/IngredientOnCircle.jsx
const IngredientOnCircle = ({ 
  name, 
  image, 
  angle, 
  radius = 60 
}) => {
  // 각도를 라디안으로 변환
  const radian = (angle * Math.PI) / 180;
  
  // 원의 중심에서 각도에 따한 위치 계산 (vh 단위)
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  return (
    <div
      className="absolute z-15"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}vh), calc(-50% + ${y}vh))`,
      }}
    >
      <img
        src={image}
        alt={name}
        className="w-48 h-48 object-contain" // w-48 h-48에서 w-44 h-44로 변경
      />
    </div>
  );
};

export default IngredientOnCircle;