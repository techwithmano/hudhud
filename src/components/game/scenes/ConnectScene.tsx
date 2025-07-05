'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';

type ConnectSceneProps = {
  onComplete: () => void;
  // This prop might be passed but it's not used to avoid errors with missing files.
  playSound?: (soundFile: string, volume?: number) => void;
};

const points = [
  { x: '50%', y: '85%', message: 'It started with a simple "hello"...' },
  { x: '20%', y: '60%', message: '...and grew with every shared secret.' },
  { x: '15%', y: '30%', message: 'For all the times you made me laugh.' },
  { x: '50%', y: '20%', message: 'You became a constant, a guiding star.' },
  { x: '85%', y: '30%', message: 'For always understanding, even without words.' },
  { x: '80%', y: '60%', message: 'And for all the adventures yet to come.' },
];

export default function ConnectScene({ onComplete }: ConnectSceneProps) {
  const [connected, setConnected] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const handleDotClick = (index: number) => {
    if (index === connected.length && !connected.includes(index)) {
      const newConnected = [...connected, index];
      setConnected(newConnected);
      setActiveMessage(points[index].message);
    }
  };

  const allConnected = connected.length === points.length;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline">
          The Constellation of Us
        </p>
        <p className="mt-2 text-foreground/80 text-sm">
          Connect the memories to reveal the heart of our story.
        </p>
      </motion.div>

      <div className="relative w-[90vw] h-[70vh] max-w-lg max-h-lg">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 85, 60, 0.3))' }}>
          <AnimatePresence>
            {connected.length > 1 &&
              connected.slice(1).map((dotIndex, i) => {
                const prevPoint = points[connected[i]];
                const currentPoint = points[dotIndex];
                return (
                  <motion.line
                    key={`${i}-${dotIndex}`}
                    x1={prevPoint.x.replace('%', '')}
                    y1={prevPoint.y.replace('%', '')}
                    x2={currentPoint.x.replace('%', '')}
                    y2={currentPoint.y.replace('%', '')}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                );
              })}
            {allConnected && (
                <motion.line
                    key="final-line"
                    x1={points[points.length - 1].x.replace('%', '')}
                    y1={points[points.length - 1].y.replace('%', '')}
                    x2={points[0].x.replace('%', '')}
                    y2={points[0].y.replace('%', '')}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            )}
          </AnimatePresence>
        </svg>

        {points.map((point, index) => {
          const isConnected = connected.includes(index);
          const isNext = index === connected.length;
          return (
            <motion.button
              key={index}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{
                left: point.x,
                top: point.y,
                transform: 'translate(-50%, -50%)',
                backgroundColor: isConnected ? 'hsl(var(--primary))' : 'rgba(255, 255, 255, 0.8)',
                border: isNext ? '2px solid hsl(var(--primary))' : '2px solid transparent',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.5 + index * 0.1, type: 'spring' } }}
              whileHover={{ scale: isNext ? 1.3 : 1.1 }}
              onClick={() => handleDotClick(index)}
            >
              {isConnected ? (
                <Heart className="w-4 h-4 text-white animate-pulse" />
              ) : (
                <span className="text-primary font-bold">{index + 1}</span>
              )}
            </motion.button>
          );
        })}
      </div>
      
      <AnimatePresence>
      {activeMessage && (
        <motion.div
            key={activeMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-24 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md flex items-center gap-2"
        >
            <MessageCircle className="w-5 h-5 text-primary" />
            <p className="text-foreground">{activeMessage}</p>
        </motion.div>
      )}
      </AnimatePresence>


      {allConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <p className="text-white text-2xl font-headline bg-primary/70 p-3 rounded-md">You revealed the heart of our story!</p>
          <Button onClick={onComplete} size="lg" className="font-bold">
            Now, Let's Wish Upon a Star <Sparkles className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
