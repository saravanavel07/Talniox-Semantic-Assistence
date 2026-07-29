import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0B] border-t border-[#7A7D85]/20 py-6 font-mono text-xs text-[#7A7D85] text-center">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
        <div>
          TALONIX // AEGIS SEMANTIC KERNEL AI RESEARCH ASSISTANT [SK v4.12.0]
        </div>
        <div className="text-[#8B8D93]">
          FIELD INSTRUMENT TARGETING ENGINE • BUILD #4F89A2 • OPERATIONAL
        </div>
      </div>
    </footer>
  );
};
