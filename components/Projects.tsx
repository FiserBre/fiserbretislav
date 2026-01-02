import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "CanoeApp",
    description: "Aplikace (v rámci ročníkové práce) věnovaná rychlostní kanoistice, sportu který dělám. do budoucna bude obsahovat mnoho funkcí, těším se na výsledek",
    tags: ["PHP", "MySQL", "CSS"],
    image: "",
    link: "#"
  },
  {
    id: 2,
    title: "denikcheat",
    description: "aplikace pro cheat sportovního deníku",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "",
    link: "https://denikcheat.vercel.app/"
  },
  {
    id: 3,
    title: "Toto portfolio",
    description: "Portfolio prezentující mě a mé projekty",
    tags: ["TypeScript", "React", "Tailwind"],
    image: "",
    link: "#"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Parallax Image Logic
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  // Map scroll progress to image Y position (moves image within the container)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2 }}
      className="perspective-1000 w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group bg-surface border border-white/10 rounded-2xl overflow-hidden cursor-pointer h-[500px]"
      >
        {/* Parallax Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <motion.div 
              style={{ y: imageY, scale: 1.2 }} 
              className="w-full h-full"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-opacity duration-700 opacity-60 group-hover:opacity-40" 
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        </div>
        
        <div 
            className="absolute bottom-0 left-0 w-full p-8 z-10 translate-z-20"
            style={{ transform: "translateZ(50px)" }}
        >
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full border border-accent/20">
                        {tag}
                    </span>
                ))}
            </div>
            <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                {project.title}
            </h3>
            <p className="text-gray-400 mb-6 line-clamp-2">
                {project.description}
            </p>
            <div className="flex items-center text-sm font-semibold tracking-wide uppercase group-hover:translate-x-2 transition-transform">
                Zobrazit Projekt <ExternalLink size={16} className="ml-2" />
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold mb-16 text-center"
        >
          Vybrané <span className="text-primary">Práce</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;