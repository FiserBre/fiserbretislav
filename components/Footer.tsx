import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Břetislav Fišer. Všechna práva vyhrazena.</p>
        <p className="mt-2 text-xs">Postaveno na React, Tailwind & Gemini 2.5</p>
      </div>
    </footer>
  );
};

export default Footer;