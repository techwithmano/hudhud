'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flower, Sparkles } from 'lucide-react';
import WhimsicalCat from '@/components/game/WhimsicalCat';

type GardenSceneProps = {
  onComplete: () => void;
  playSound: (soundFile: string, volume?: number) => void;
};

const collectibles = [
  {
    id: 'cat',
    render: (props: any) => <WhimsicalCat {...props} />,
    pos: { x: '20%', y: '65%' },
    message: {
      title: 'The Guardian of Giggles',
      content:
        "This whimsical cat holds every one of our inside jokes and protects the moments we've laughed until we've cried. It's a tribute to the pure, unfiltered joy you bring into my life.",
    },
    className: 'w-28 h-28 md:w-32 md:h-32',
  },
  {
    id: 'flower',
    render: (props: any) => (
       <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <Flower {...props} />
      </motion.div>
    ),
    pos: { x: '50%', y: '50%' },
    message: {
      title: 'The Bloom of Support',
      content:
        'This flower will never wilt, just like your unwavering support. With you by my side, I feel like I can grow, bloom, and reach for the sun. You make my world beautiful.',
    },
    className: 'w-24 h-24 md:w-28 md:h-28 text-pink-400',
  },
  {
    id: 'sparkles',
    render: (props: any) => (
       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <Sparkles {...props} />
      </motion.div>
    ),
    pos: { x: '80%', y: '60%' },
    message: {
      title: 'A Shard of Your Starlight',
      content:
        "This isn't just a sparkle; it's a tiny piece of the magic you carry within you. You don't just brighten my day; you make my whole world glitter. Thank you for being you.",
    },
    className: 'w-24 h-24 md:w-28 md:h-28 text-yellow-300 fill-yellow-300',
  },
];

export default function GardenScene({ onComplete, playSound }: GardenSceneProps) {
  const [dialogContent, setDialogContent] = useState<{ title: string; content: string } | null>(null);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);

  const handleInteraction = (item: typeof collectibles[0]) => {
    if (collectedItems.includes(item.id)) return;

    setDialogContent(item.message);
    setCollectedItems(prev => [...prev, item.id]);
  };

  const handleNext = () => {
    onComplete();
  };

  const allCollected = collectedItems.length === collectibles.length;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <p className="text-primary-foreground bg-primary/70 p-2 rounded-md shadow-lg text-lg font-headline">
          The Whispering Garden
        </p>
        <p className="mt-2 text-foreground/80 text-sm">
          {allCollected ? "You've gathered all the memories!" : 'Listen closely... the garden has secrets to share. Click on each memory.'}
        </p>
      </motion.div>

      <div className="w-full h-full relative">
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-green-200/50 rounded-t-full"></div>

        {collectibles.map((item, index) => {
          const isCollected = collectedItems.includes(item.id);
          return (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer"
              style={{ left: item.pos.x, top: item.pos.y, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.2, type: 'spring' }}
              whileHover={{ scale: isCollected ? 1 : 1.1 }}
              onClick={() => handleInteraction(item)}
            >
              {item.render({
                className: `${item.className} drop-shadow-lg transition-opacity duration-500 ${isCollected ? 'opacity-40' : 'opacity-100'}`,
                style: { filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.2))' }
              })}
            </motion.div>
          );
        })}
      </div>

      {allCollected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <Button onClick={handleNext} size="lg" className="font-bold">
            Follow the Unforgettable Path <Sparkles className="ml-2" />
          </Button>
        </motion.div>
      )}

      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent className="font-body">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">{dialogContent?.title}</DialogTitle>
            <DialogDescription className="text-foreground pt-4 text-base">
              {dialogContent?.content}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
