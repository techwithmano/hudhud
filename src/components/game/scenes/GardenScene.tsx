
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Flower } from 'lucide-react';

type GardenSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const flowerPotVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.8, ease: 'easeOut' } },
};

const textVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
};

const BloomingFlower = ({ bloomLevel }: { bloomLevel: number }) => {
  const maxBloom = 4;

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-48 h-48 drop-shadow-lg"
      initial={false}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Stem */}
      <motion.path
        d="M100 120 V 180"
        stroke="hsl(var(--primary))"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      {/* Petals */}
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={i}
          d="M100,120 C 110,80 140,90 120,60"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0, rotate: i * 60 }}
          animate={{
            scale: bloomLevel / maxBloom,
            opacity: bloomLevel > 0 ? 1 : 0,
            y: -((bloomLevel / maxBloom) * 15),
            rotate: i * 60 + (bloomLevel * 10),
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          style={{ transformOrigin: '100px 120px' }}
        />
      ))}
      {/* Center of Flower */}
      <motion.circle
        cx="100"
        cy="105"
        r="10"
        fill="hsl(43 74% 66%)"
        initial={{ scale: 0 }}
        animate={{ scale: bloomLevel > 1 ? 1 : 0, y: -((bloomLevel / maxBloom) * 15) }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </motion.svg>
  );
};

export default function GardenScene({ onComplete, playSound }: GardenSceneProps) {
  const [bloomLevel, setBloomLevel] = useState(0);
  const maxBloom = 4;
  const isComplete = bloomLevel >= maxBloom;

  const handleFlowerClick = () => {
    if (isComplete) return;
    setBloomLevel((prev) => prev + 1);
    playSound('click.mp3', 0.2 + bloomLevel * 0.1);
  };

  const handleNext = () => {
    playSound('collect.mp3', 0.5);
    onComplete();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 to-lime-100 p-4">
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4"
      >
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline flex items-center justify-center gap-2">
          <Flower /> A Garden for a Friend
        </p>
        <AnimatePresence mode="wait">
            <motion.p
                key={isComplete ? 'complete' : 'incomplete'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="mt-2 text-foreground/80 text-sm h-10 flex items-center justify-center"
            >
            {isComplete
              ? "You've made the garden bloom, just like you do in my life."
              : 'A friendship like ours helps beautiful things grow. Tap the flower.'}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <div className="flex-grow flex items-center justify-center">
        <div className="cursor-pointer" onClick={handleFlowerClick}>
          <BloomingFlower bloomLevel={bloomLevel} />
        </div>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          >
            <Button onClick={handleNext} size="lg" className="font-bold">
              Follow the Unforgettable Path <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
