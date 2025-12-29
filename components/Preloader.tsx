import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative w-full max-w-md px-6">
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end mb-4"
        >
          <span className="text-2xl font-display font-bold tracking-tighter">
            BF.
          </span>
          <span className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            {count}%
          </span>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Status Text */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex justify-between text-xs text-gray-500 font-mono uppercase"
        >
            <span>Inicializace projektu</span>
            <span>Praha, CZ</span>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
      </div>
    </motion.div>
  );
};

export default Preloader;