import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const yText = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const skills = [
    "React", "TypeScript", "Tailwind", "PHP", "Node.js", "Framer Motion", "WordPress", "MySQL"
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-40 relative overflow-hidden">
       {/* Background Text Decorations */}
      <motion.div style={{ x: xLeft, y: yText }} className="absolute top-0 left-0 text-[10rem] md:text-[20rem] font-bold text-white/5 whitespace-nowrap select-none pointer-events-none font-display">
        VÁŠEŇ
      </motion.div>
      <motion.div style={{ x: xRight, y: yText }} className="absolute bottom-0 right-0 text-[10rem] md:text-[20rem] font-bold text-white/5 whitespace-nowrap select-none pointer-events-none font-display">
        TVORBA
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Weby jsou můj <span className="text-secondary">koníček</span>.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Jsem vývojář se sídlem v Praze. Stavím webové stránky, upravuji projekty a tvořím interaktivní cesty.
              Moje filozofie je jednoduchá: výkon by nikdy neměl jít na úkor estetiky.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              S více než 5 lety zkušeností v moderním ekosystému JavaScriptu pomáhám značkám a jednotlivcům vyniknout 
              v digitálním šumu.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-accent font-mono text-sm">0{index + 1}.</span>
                <p className="font-semibold text-lg mt-2">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;