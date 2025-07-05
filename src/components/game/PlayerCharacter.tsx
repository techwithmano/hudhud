'use client';
import { motion } from 'framer-motion';

type PlayerCharacterProps = {
  position: { x: number; y: number };
  isJumping?: boolean;
};

export default function PlayerCharacter({ position, isJumping = false }: PlayerCharacterProps) {
  return (
    <motion.div
      className="absolute z-10"
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 0.5 }}
      style={{
        width: '50px',
        height: '80px',
        transform: 'translate(-50%, -100%)', // Center horizontally, bottom aligned
      }}
    >
      <svg viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Head */}
          <motion.path
            d="M25 15C32.7614 15 39 21.2386 39 29C39 36.7614 32.7614 43 25 43C17.2386 43 11 36.7614 11 29C11 21.2386 17.2386 15 25 15Z"
            fill="#F3D1C8"
            stroke="#4A3F3F"
            strokeWidth="2"
          />
          {/* Hair */}
          <motion.path
            d="M10 28C10 18.0589 18.0589 10 28 10V20C18.0589 20 10 28 10 28Z"
            fill="#4A3F3F"
          />
           <motion.path
            d="M40 28C40 18.0589 31.9411 10 22 10V20C31.9411 20 40 28 40 28Z"
            fill="#4A3F3F"
          />
          <circle cx="20" cy="29" r="1.5" fill="#4A3F3F" />
          <circle cx="30" cy="29" r="1.5" fill="#4A3F3F" />
          <path d="M23 35C23 35 24 37 25 37C26 37 27 35 27 35" stroke="#4A3F3F" strokeWidth="1.5" strokeLinecap="round"/>
          
          {/* Body */}
          <motion.path
            d="M18 42H32L35 70H15L18 42Z"
            fill="#87CEEB" // Sky Blue Dress
            stroke="#4A3F3F"
            strokeWidth="2"
          />
          {/* Legs */}
          <motion.rect x="18" y="70" width="5" height="10" fill="#F3D1C8" stroke="#4A3F3F" strokeWidth="1" />
          <motion.rect x="27" y="70" width="5" height="10" fill="#F3D1C8" stroke="#4A3F3F" strokeWidth="1" />
        </g>
      </svg>
    </motion.div>
  );
}
