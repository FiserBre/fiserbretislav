import React, { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
// Lazy-load heavier parts to reduce initial bundle and improve TTI on low-end devices
const Preloader = lazy(() => import('./components/Preloader'));
const Hero = lazy(() => import('./components/Hero'));
const Projects = lazy(() => import('./components/Projects'));
const DigitalTwin = lazy(() => import('./components/DigitalTwin'));
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
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

  // 1. Force manual scroll restoration immediately on mount
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // 2. Aggressive Scroll Handling
  useEffect(() => {
    // Reset scroll when page unloads to ensure next load starts at top
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (isLoading) {
      // Disable smooth scrolling temporarily to allow instant jump
      document.documentElement.classList.remove('scroll-smooth');
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      // Force top position one last time before unlocking
      window.scrollTo(0, 0);
      // Remove any hash to avoid browser auto-scrolling to anchors
      try {
        if (location.hash) {
          history.replaceState(null, '', location.pathname + location.search);
        }
      } catch (e) {
        // ignore
      }
      // Ensure hero is visible after initial render (small timeout to allow layout)
      setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) {
          hero.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);

      // Temporary guard: prevent unexpected automatic jumps immediately after load.
      // For a short window (500ms) after unlocking scroll, if any automatic script
      // scrolls the page, bring it back to the hero. This avoids race conditions
      // where other scripts (animations/layout measurement) trigger a scroll.
      const guardUntil = Date.now() + 500;
      const onScrollGuard = () => {
        if (Date.now() < guardUntil) {
          const y = window.scrollY || window.pageYOffset || 0;
          if (y > 20) {
            const hero = document.getElementById('hero');
            if (hero) hero.scrollIntoView({ behavior: 'auto', block: 'start' });
            else window.scrollTo(0, 0);
          }
        } else {
          window.removeEventListener('scroll', onScrollGuard);
        }
      };
      window.addEventListener('scroll', onScrollGuard, { passive: true });
      document.body.style.overflow = 'unset';
      
      // Re-enable smooth scrolling after a delay (wait for browser to settle)
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
          <Suspense fallback={<div className="w-screen h-screen bg-black" />}>
            <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
          </Suspense>
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
            <Suspense fallback={<div className="h-[80vh] bg-gradient-to-b from-black to-transparent" />}>
              <Hero />
            </Suspense>
            <About />
            <Suspense fallback={<div className="py-24">Načítání projektů…</div>}>
              <Projects />
            </Suspense>
            
            {/* Contact / AI Section */}
            <section id="contact" className="py-24 px-6 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
              <div className="container mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Využij <span className="text-accent">asistenta</span>
                    </h2>
                    <p className="text-gray-400">
                        Popovídejte si s mým AI agentem níže a získejte okamžité odpovědi.
                    </p>
                 </div>
                 <Suspense fallback={<div className="h-[600px] flex items-center justify-center">Načítání…</div>}>
                   <DigitalTwin />
                 </Suspense>
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