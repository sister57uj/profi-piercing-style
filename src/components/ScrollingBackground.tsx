const ScrollingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
      {/* Animated geometric shapes */}
      <div className="absolute top-10 left-[10%] w-20 h-20 border-2 border-primary/20 rounded-lg animate-float-slow rotate-45" />
      <div className="absolute top-[20%] right-[15%] w-16 h-16 bg-primary/5 rounded-full animate-float-medium" />
      <div className="absolute bottom-[30%] left-[20%] w-24 h-24 border-2 border-accent/15 animate-float-fast" 
           style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      <div className="absolute top-[40%] right-[25%] w-12 h-12 bg-neon-pink/10 rounded-lg animate-float-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-32 h-32 border-2 border-primary/10 rounded-full animate-float-medium" />
      <div className="absolute top-[60%] left-[30%] w-14 h-14 bg-accent/5 animate-float-fast rotate-12" />
      <div className="absolute bottom-[40%] left-[5%] w-18 h-18 border-2 border-neon-pink/20 rounded-lg animate-float-slow -rotate-12" />
      <div className="absolute top-[30%] left-[40%] w-10 h-10 bg-primary/8 rounded-full animate-float-medium" />
      <div className="absolute bottom-[50%] right-[30%] w-20 h-20 border border-accent/10 animate-float-fast"
           style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      <div className="absolute top-[70%] right-[40%] w-16 h-16 bg-neon-pink/5 rounded-full animate-float-slow" />
    </div>
  );
};

export default ScrollingBackground;
