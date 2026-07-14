import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = React.memo(() => {
  const [isHoveringHeading, setIsHoveringHeading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Removed useSpring to make the cursor instantly responsive
  // (User reported trailing delay/lag)

  useEffect(() => {
    // Only enable on devices with fine pointer (not touch screens)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 10); // Center the 20x20px circle
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element is a heading, inside a heading, or explicitly opted into magnification
      if (target.closest('h1, h2, h3, h4, h5, h6, .hover-magnify')) {
        setIsHoveringHeading(true);
      } else {
        setIsHoveringHeading(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHoveringHeading ? 5 : 1,
        backgroundColor: isHoveringHeading ? '#ffffff' : 'transparent',
        borderColor: isHoveringHeading ? 'transparent' : '#ffffff',
        borderWidth: isHoveringHeading ? '0px' : '2px',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="w-1 h-1 bg-white rounded-full"
        animate={{ 
          scale: isHoveringHeading ? 0 : 1,
          opacity: isHoveringHeading ? 0 : 1 
        }}
      />
    </motion.div>
  );
});
