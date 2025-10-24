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
    <div className="fixed inset-0 -z-10">
      {/* Light blur layer for edges */}
      <div 
        className="absolute inset-0 w-full h-[120vh]"
        style={{
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform',
          backgroundImage: `url(${piercingBg})`,
          backgroundSize: '600px 600px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
        }}
      />
      
      {/* Medium blur layer for middle areas */}
      <div 
        className="absolute inset-0 w-full h-[120vh] pointer-events-none"
        style={{
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform',
          backgroundImage: `url(${piercingBg})`,
          backgroundSize: '600px 600px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          mask: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 0%, transparent 75%)',
          WebkitMask: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 0%, transparent 75%)',
        }}
      />
      
      {/* Strong blur layer for center (where text is) */}
      <div 
        className="absolute inset-0 w-full h-[120vh] pointer-events-none"
        style={{
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform',
          backgroundImage: `url(${piercingBg})`,
          backgroundSize: '600px 600px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          filter: 'blur(18px)',
          mask: 'radial-gradient(ellipse 45% 35% at 50% 50%, black 0%, transparent 65%)',
          WebkitMask: 'radial-gradient(ellipse 45% 35% at 50% 50%, black 0%, transparent 65%)',
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/50" />
    </div>
  );
};

export default ScrollingBackground;
