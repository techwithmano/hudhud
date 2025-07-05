'use client';

import { motion } from 'framer-motion';

type FinalSceneProps = {
  onRestart: () => void;
};

export default function FinalScene({ onRestart }: FinalSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="max-w-2xl w-full bg-card/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
      >
        <div className="max-h-[80vh] overflow-y-auto text-left text-foreground font-body">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">To My Nooni 🌷</h2>
            <p className="text-lg leading-relaxed">
                If you’re reading this, then you’ve walked through a world built just for you.
                Every flower that bloomed, every star you collected — it was all made to remind you of something simple, but so true:
                <strong> You are loved beyond words.</strong>
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                You are more than a best friend. You’re my calm, my chaos, my comfort, my favorite laugh.
                I made this game because I couldn’t just say how much you mean to me — I had to show you.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                Every corner of this place was shaped by the way you make the real world feel softer.
                I don’t know how you do it, but when you’re near, even the worst days feel okay.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                You’ve been there for me when I didn’t even ask. You’ve made me feel seen. You’ve made me feel safe.
                And I swear, Nooni, if I could build you a thousand gardens like this, I would — just to watch you smile as you walk through them.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
                So when the screen goes dark and this little world fades, remember:
                <strong> You are magic. You are light. You are my forever friend.</strong>
            </p>
            <p className="mt-6 text-right text-lg">— From me, always 💙</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
