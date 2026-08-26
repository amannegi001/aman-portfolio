import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Use MotionValues to avoid React state re-renders on every mousemove frame
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.15 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Subtle outer ambient ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan/40 dark:border-cyan/50 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: isPointer ? -24 : -16,
          translateY: isPointer ? -24 : -16,
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? 'rgba(30, 193, 203, 0.08)' : 'transparent',
        }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-cyan hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: -4,
          translateY: -4,
          scale: isPointer ? 0 : 1,
        }}
      />
    </>
  );
};
