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
          <Sparkles className="w-12 h-12 text-accent-foreground/80 absolute -right-4 -top-4" />
          <Sparkles className="w-8 h-8 text-accent-foreground/60 absolute -left-2 top-8" />
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-4xl md:text-6xl font-headline font-bold mb-4"
        >
          For my dearest Nooni,
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed mb-8"
        >
          {/* /// DEVELOPER NOTE: This is the placeholder for the final message. /// */}
          {`Dearest Huda, my Nooni,
          
          If you're seeing this, it means you've journeyed through the little world I made just for you. Every sparkle, every silly cat, and every corner of this garden is a reflection of the joy and light you bring into my life.
          
          Thank you for being my best friend, my confidante, and my partner in all things fun and crazy. This is just a small token to show you how much you mean to me.
          
          With all my love, always.`}
        </motion.p>
      </div>
    </motion.div>
  );
}
