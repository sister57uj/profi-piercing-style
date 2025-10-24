import { useEffect, useState } from 'react';

const ScrollingBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

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
          transform: `translateY(${parallaxOffset}px)`,
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
          transform: `translateY(${parallaxOffset}px)`,
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
          transform: `translateY(${parallaxOffset}px)`,
          filter: 'blur(18px)',
          mask: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 60%)',
          WebkitMask: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default ScrollingBackground;
