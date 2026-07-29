import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#0A0A0B]/95 backdrop-blur-md border-[#7A7D85]/30 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.9)]'
          : 'bg-transparent border-white/5 py-5'
      }`}
    >
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <div className="relative w-9 h-9 rounded bg-[#16171A] border border-[#8C1F1F] flex items-center justify-center overflow-hidden group shadow-[0_0_12px_rgba(140,31,31,0.3)]">
            <Shield className="w-5 h-5 text-[#B33232] group-hover:text-[#E4E4E6] transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-wider text-[#E4E4E6]">
                TALONIX
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium tracking-tight bg-[#8C1F1F]/20 text-[#B33232] border border-[#8C1F1F]/50 rounded-sm">
                AEGIS
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#7A7D85] tracking-widest uppercase">
              Semantic Kernel Engine
            </p>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-[#8B8D93] hover:text-[#E4E4E6] transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#8C1F1F] text-[10px]">01//</span> HERO
          </button>
          <button
            onClick={() => scrollToSection('capabilities')}
            className="text-[#8B8D93] hover:text-[#E4E4E6] transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#8C1F1F] text-[10px]">02//</span> PLUGINS
          </button>
          <button
            onClick={() => scrollToSection('architecture')}
            className="text-[#8B8D93] hover:text-[#E4E4E6] transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#8C1F1F] text-[10px]">03//</span> ARCHITECTURE
          </button>
          <button
            onClick={() => scrollToSection('cockpit')}
            className="text-[#8B8D93] hover:text-[#E4E4E6] transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#8C1F1F] text-[10px]">04//</span> CONSOLE
          </button>
        </nav>

        {/* Live Kernel Status Badge & Action */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-sm bg-[#16171A] border border-[#7A7D85]/40 font-mono text-[11px] text-[#E4E4E6]">
            <span className="relative flex h-2 w-2">
              <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-[#C4432E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4432E]"></span>
            </span>
            <span className="text-[#E4E4E6] font-semibold">SK v4.12</span>
            <span className="text-[#7A7D85]">|</span>
            <span className="text-[#B33232]">ONLINE</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection('cockpit')}
            className="px-4 py-2 rounded-sm bg-[#8C1F1F] hover:bg-[#B33232] border border-[#B33232] text-xs font-mono font-semibold tracking-wider text-[#E4E4E6] transition-all shadow-[0_0_15px_rgba(140,31,31,0.3)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#E4E4E6]" />
              LAUNCH CONSOLE
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
