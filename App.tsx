import React, { useState, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import DigitalTwin from './components/DigitalTwin';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
         {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[#050505]"></div>
        
        {/* Nebulas / Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(109,40,217,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.08),transparent_40%)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (isLoading) {
      document.documentElement.classList.remove('scroll-smooth');
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'unset';
      
      const timeout = setTimeout(() => {
        document.documentElement.classList.add('scroll-smooth');
      }, 100);

      return () => {
          clearTimeout(timeout);
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isLoading]);

  return (
    <div className="bg-transparent min-h-screen text-white selection:bg-accent selection:text-black relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ParallaxBackground />

      {/* Main Content Reveal */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
            style={{ scaleX }}
          />

          <Navbar />
          
          <main className="relative z-10">
            <Hero />
            <About />
            <Projects />
            
            {/* Contact / AI Section */}
            <section id="contact" className="py-24 px-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
              <div className="container mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Pojďme <span className="text-accent">Mluvit</span>
                    </h2>
                    <p className="text-gray-400">
                        Popovídejte si s mým AI agentem níže a získejte okamžité odpovědi.
                    </p>
                 </div>
                 <DigitalTwin />
              </div>
            </section>
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default App;