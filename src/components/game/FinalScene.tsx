'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

type FinalSceneProps = {
  onRestart: () => void;
};

export default function FinalScene({ onRestart }: FinalSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-8 text-center text-foreground"
    >
      <div className="max-w-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <Heart className="w-16 h-16 text-primary animate-pulse" />
          <Sparkles className="w-12 h-12 text-accent-foreground/80 absolute -right-4 -top-4 animate-pulse" />
          <Sparkles className="w-8 h-8 text-accent-foreground/60 absolute -left-2 top-8 animate-pulse" />
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-4xl md:text-6xl font-headline font-bold mb-4 text-primary"
        >
          To my irreplaceable Nooni,
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed mb-8"
        >
          {`My incredible Huda, my luminous Nooni, you've reached the heart of this little universe I crafted for you. Every glowing flower, every giggling memory, every captured star is a testament to the wonder that you are. It's a reflection of the light you shine, the joy you create, and the home I've found in your friendship.

          Thank you for being my confidante, my cheerleader, and the brightest star in my personal sky. This whimsical world is just a shadow of what you mean to me, but I hope you felt every ounce of love poured into it.
          
          You are, and always will be, my absolute world. With endless love and a universe of gratitude.`}
        </motion.p>
      </div>
    </motion.div>
  );
}
