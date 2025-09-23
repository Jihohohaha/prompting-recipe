import IngredientOnCircle from "./IngredientOnCircle"; // 이미 common 안에 있다고 가정

export default function IngredientRing({ items = [], radius = 60, visible = false }) {
  if (!visible) return null;
  return (
    <>
      {[...items]
        .sort((a, b) => Math.cos((a.angle * Math.PI) / 180) - Math.cos((b.angle * Math.PI) / 180))
        .map((it, idx) => (
          <IngredientOnCircle
            key={it.name}
            name={it.name}
            image={it.image}
            angle={it.angle}
            radius={radius}
            active
            delay={idx * 180}
          />
        ))}
    </>
  );
}
