'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Lock, Unlock, Sparkles } from 'lucide-react';

type TrailSceneProps = {
  onComplete: () => void;
};

const memories = [
  { id: 1, title: "Our Laughter", content: "For all the times we've laughed until it hurt. You bring so much joy into my life." },
  { id: 2, title: "Your Kindness", content: "For all the times you've been so kind to me. You make the world a better place." },
  { id: 3, title: "Our Secrets", content: "For our inside jokes and all the secrets we share. I love the little world we have together." },
  { id: 4, title: "Our Future", content: "For all the fun things we still have to do. This is just the start of our next adventure together." },
];

export default function TrailScene({ onComplete }: TrailSceneProps) {
  const [unlockedCount, setUnlockedCount] = useState(1);
  const memoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const unlockMemory = (id: number) => {
    // Can only unlock the next sequential memory
    if (id !== unlockedCount) return;
    
    setUnlockedCount(id + 1);
    
    const targetRef = memoryRefs.current[id];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const allUnlocked = unlockedCount > memories.length;

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-100 to-background overflow-y-auto">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-purple-100 via-purple-100/80 to-transparent pt-8 pb-4 text-center backdrop-blur-sm">
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline inline-block">A Path of Our Memories</p>
        <p className="mt-2 text-foreground/80 text-sm">Tap each step to unlock a memory.</p>
      </div>

      <div className="flex flex-col items-center gap-24 py-16 px-4 min-h-full">
        {memories.map((memory, index) => {
          const isUnlocked = index < unlockedCount;
          const isNext = index === unlockedCount - 1;

          return (
            <motion.div
              ref={el => (memoryRefs.current[index] = el)}
              key={memory.id}
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => unlockMemory(index + 1)}
            >
              <Card className={`transition-all duration-500 shadow-lg  ${isNext ? 'cursor-pointer border-primary ring-2 ring-primary shadow-primary/30 shadow-2xl' : ''} ${isUnlocked ? 'border-primary/50' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Heart className={`transition-all duration-500 ${isUnlocked ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                      {memory.title}
                    </span>
                    {isUnlocked ? <Unlock className="text-green-500" /> : <Lock className="text-muted-foreground" />}
                  </CardTitle>
                </CardHeader>
                <AnimatePresence>
                  {isUnlocked && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <CardContent>
                        <p>{memory.content}</p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {allUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="sticky bottom-0 flex justify-center py-8 bg-gradient-to-t from-background to-transparent"
        >
          <Button onClick={() => { onComplete(); }} size="lg" className="font-bold">
            Connect Our Story <Sparkles className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
