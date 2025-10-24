import { useEffect, useState } from 'react';
import piercingBg from '@/assets/piercing-background-dark.png';

const ScrollingBackground = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{
        transform: `translateY(${offsetY}px)`,
        willChange: 'transform',
      }}
    >
      <div
        className="absolute inset-0 w-full h-[120vh]"
        style={{
          backgroundImage: `url(${piercingBg})`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          filter: 'blur(15px)',
        }}
      />
      <div 
        className="absolute inset-0 bg-background/50"
      />
    </div>
  );
};

export default ScrollingBackground;
