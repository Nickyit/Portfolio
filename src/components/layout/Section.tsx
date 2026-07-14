import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Section = ({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} id={id} className={cn('py-16 relative overflow-hidden', className)}>
      <motion.div 
        style={{ y }}
        className={cn('container mx-auto px-6 md:px-12 relative z-10', containerClassName)}
      >
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-16 md:mb-24"
          >
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-lg max-w-2xl">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {children}
      </motion.div>
    </section>
  );
};
