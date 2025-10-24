const ScrollingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Базовый слой - легкое размытие по краям (3px) */}
      <div
        className="absolute inset-0 bg-background"
        style={{
          backgroundImage: "url('/src/assets/piercing-background-dark.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(3px)',
        }}
      />
      
      {/* Средний слой - среднее размытие (10px) с маской */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/src/assets/piercing-background-dark.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(10px)',
          mask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)',
          WebkitMask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)',
        }}
      />
      
      {/* Верхний слой - сильное размытие по центру (18px) с маской */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/src/assets/piercing-background-dark.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(18px)',
          mask: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 60%)',
          WebkitMask: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 60%)',
        }}
      />
      
      {/* Слой затемнения по центру для читаемости текста */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};

export default ScrollingBackground;
