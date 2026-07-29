import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { EagleMark } from './EagleMark';
import { TelemetryState, SystemStatus } from '../types';
import { Cpu, Database, ShieldCheck, Zap, ChevronRight, Terminal } from 'lucide-react';

interface HeroProps {
  systemStatus?: SystemStatus;
  onSystemStatusChange?: (status: SystemStatus) => void;
}

export const Hero: React.FC<HeroProps> = ({ systemStatus = 'idle', onSystemStatusChange }) => {
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    status: 'active',
    plannerState: 'EXEC_PLAN_ACTIVE',
    memoryVectors: 2048,
    activePlugins: ['WebSearchPlugin', 'MemoryPlugin', 'DocumentPlugin'],
    orchestratorLatencyMs: 4.2,
    factCheckConfidence: 0.992,
    heapUsedMb: 48.6,
    uptimeSeconds: 3820,
  });

  const [lastQueryTime, setLastQueryTime] = useState<string>(
    new Date().toISOString().substring(11, 19) + ' UTC'
  );

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/telemetry');
        if (res.ok) {
          const data = await res.json();
          setTelemetry(data);
        }
      } catch (err) {
        // simulation fallback
      }
      setLastQueryTime(new Date().toISOString().substring(11, 19) + ' UTC');
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToCockpit = () => {
    document.getElementById('cockpit')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArch = () => {
    document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-tactical-grid">
      {/* Background ambient HUD glow in deep blood red */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#8C1F1F]/20 via-[#1D1E22]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Signature Moment: Animated Eagle HUD Mark with Live Status Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 relative"
          >
            <EagleMark 
              size={280} 
              showRadar={true} 
              status={systemStatus} 
              onStatusSelect={onSystemStatusChange} 
            />
          </motion.div>

          {/* System Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16171A] border border-[#8C1F1F]/60 text-[#E4E4E6] font-mono text-xs mb-6 shadow-[0_0_15px_rgba(140,31,31,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-[#C4432E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4432E]"></span>
            </span>
            <span className="tracking-widest uppercase text-[#B33232] font-semibold">
              FIELD INSTRUMENT // TARGETING ENGINE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-tight mb-6 text-[#E4E4E6]"
          >
            <span className="text-[#B33232]">TALONIX</span>{' '}
            <span className="text-[#7A7D85] font-light">//</span>{' '}
            <span className="text-[#E4E4E6]">AEGIS RESEARCH ASSISTANT</span>
          </motion.h1>

          {/* One-Line Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-sans text-[#8B8D93] text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
          >
            An autonomous AI research instrument powered by Microsoft Semantic Kernel for multi-source document synthesis, memory vector indexing, and verified fact claims.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(179,50,50,0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToCockpit}
              className="px-7 py-3.5 rounded-sm bg-[#8C1F1F] hover:bg-[#B33232] border border-[#B33232] text-[#E4E4E6] font-mono font-bold text-xs tracking-wider flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(140,31,31,0.3)] cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[#E4E4E6]" />
              INITIALIZE RESEARCH CONSOLE
              <ChevronRight className="w-4 h-4 text-[#E4E4E6]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToArch}
              className="px-7 py-3.5 rounded-sm bg-[#16171A] hover:bg-[#1D1E22] border border-[#7A7D85]/50 text-[#E4E4E6] font-mono font-semibold text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              INSPECT PIPELINE FLOW
            </motion.button>
          </motion.div>

          {/* Monospace Live Telemetry Strip */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full max-w-[1500px] rounded-sm bg-[#16171A] border border-[#7A7D85]/40 p-3 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center justify-between border-b border-[#7A7D85]/20 pb-2.5 mb-3 px-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E4E4E6]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-[#C4432E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4432E]"></span>
                </span>
                <span className="font-bold tracking-wider text-[#B33232]">SYSTEM TELEMETRY STRIP</span>
              </div>
              <div className="font-mono text-[11px] text-[#7A7D85]">
                LAST TICK: <span className="text-[#E4E4E6] font-semibold">{lastQueryTime}</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono text-xs">
              
              {/* Metric 1: Planner Status */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#1D1E22] flex items-center gap-3">
                <div className="p-2 rounded-sm bg-[#8C1F1F]/20 text-[#B33232]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7A7D85]">PLANNER STATUS</div>
                  <div className="font-bold text-[#E4E4E6] tracking-tight">{telemetry.plannerState}</div>
                </div>
              </motion.div>

              {/* Metric 2: Vector Index */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#1D1E22] flex items-center gap-3">
                <div className="p-2 rounded-sm bg-[#1D1E22] text-[#7A7D85]">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7A7D85]">VECTOR INDEX</div>
                  <div className="font-bold text-[#E4E4E6]">{telemetry.memoryVectors.toLocaleString()} VECTORS</div>
                </div>
              </motion.div>

              {/* Metric 3: Latency */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#1D1E22] flex items-center gap-3">
                <div className="p-2 rounded-sm bg-[#1D1E22] text-[#7A7D85]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7A7D85]">KERNEL LATENCY</div>
                  <div className="font-bold text-[#E4E4E6]">{telemetry.orchestratorLatencyMs} MS</div>
                </div>
              </motion.div>

              {/* Metric 4: Fact Check Agent */}
              <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#1D1E22] flex items-center gap-3">
                <div className="p-2 rounded-sm bg-[#8C1F1F]/20 text-[#B33232]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7A7D85]">FACT CONFIDENCE</div>
                  <div className="font-bold text-[#B33232]">{(telemetry.factCheckConfidence * 100).toFixed(1)}%</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
