import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y: backgroundY }}
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} 
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.2),rgba(10,10,10,1))]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-block"
        >
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-6 tracking-tight overflow-hidden pb-2">
          {/* Increased y initial values for more dramatic entrance */}
          <motion.div
            initial={{ y: "150%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: 1.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Břetislav
          </motion.div>
          <motion.div
            initial={{ y: "150%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-secondary"
          >
            Fišer
          </motion.div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Tvořím pohlcující weby pomocí react type.js, js a dalsich frameworků
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2.2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;