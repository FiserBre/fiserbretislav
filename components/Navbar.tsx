import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  const menuItems = [
    { name: 'O mně', href: '#about' },
    { name: 'Projekty', href: '#projects' },
    { name: 'AI chat', href: '#contact' },
  ];

  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-black/20">
          <a href="#" className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary tracking-tighter">
            BF.
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-6 right-6 p-6 bg-surface border border-white/10 rounded-2xl shadow-2xl md:hidden"
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex space-x-6 pt-4 border-t border-white/10">
              <a href="https://github.com/FiserBre" className="text-gray-400"><Github size={24} /></a>
              <a href="#" className="text-gray-400"><Linkedin size={24} /></a>
              <a href="mailto:fiserbretislav@email.cz" className="text-gray-400"><Mail size={24} /></a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;