import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section id={id} className={cn('py-16 relative overflow-hidden', className)}>
      <div className={cn('container mx-auto px-6 md:px-12 relative z-10', containerClassName)}>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
          >
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
};
