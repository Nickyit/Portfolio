import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const CustomCursor = React.memo(() => {
  const [isHoveringHeading, setIsHoveringHeading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Removed useSpring to make the cursor instantly responsive
  // (User reported trailing delay/lag)

  useEffect(() => {
    // Only enable on devices with fine pointer (not touch screens) and when reduced motion is not preferred
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isHeading = !!target.closest('h1, h2, h3, h4, h5, h6');
      setIsHoveringHeading((prev) => (prev !== isHeading ? isHeading : prev));
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* High-resolution vector spotlight circle for headings (perfectly round, ultra-crisp anti-aliased edges) */}
      <motion.div
        className="absolute -top-[50px] -left-[50px] w-[100px] h-[100px] pointer-events-none"
        initial={false}
        animate={{
          scale: isHoveringHeading ? 1 : 0.2,
          opacity: isHoveringHeading ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <svg 
          className="w-full h-full block" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            cx="50" 
            cy="50" 
            r="49.5" 
            fill="#ffffff" 
            shapeRendering="geometricPrecision" 
          />
        </svg>
      </motion.div>

      {/* Default 20px cursor ring with center dot */}
      <motion.div
        className="absolute -top-[10px] -left-[10px] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center pointer-events-none"
        initial={false}
        animate={{
          scale: isHoveringHeading ? 0 : 1,
          opacity: isHoveringHeading ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  );
});
