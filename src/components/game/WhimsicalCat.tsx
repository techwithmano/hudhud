'use client';

import { motion } from 'framer-motion';

export default function WhimsicalCat({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Body */}
        <path d="M20,70 C20,50 80,50 80,70 L80,90 C80,100 20,100 20,90 Z" fill="#E6E6FA" />
        {/* Head */}
        <circle cx="50" cy="45" r="25" fill="#E6E6FA" />
        {/* Ears */}
        <path d="M30,20 L40,5 L50,20 Z" fill="#E6E6FA" />
        <path d="M70,20 L60,5 L50,20 Z" fill="#E6E6FA" />
        {/* Eyes */}
        <circle cx="40" cy="45" r="3" fill="black" />
        <circle cx="60" cy="45" r="3" fill="black" />
        {/* Nose & Mouth */}
        <path d="M48,52 C48,55 52,55 52,52" stroke="black" fill="transparent" />
        {/* Tail */}
        <motion.path
          d="M80,80 Q90,70 95,60"
          stroke="#E6E6FA"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          animate={{
            d: ["M80,80 Q90,70 95,60", "M80,80 Q85,65 95,65", "M80,80 Q90,70 95,60"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
