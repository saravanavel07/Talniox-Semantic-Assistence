import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchNode } from '../types';
import { Network, CheckCircle2, Zap, ShieldAlert, Play, RotateCcw, Activity } from 'lucide-react';

const ARCH_NODES: ArchNode[] = [
  {
    id: 'query',
    title: '1. Query',
    type: 'Input',
    subtitle: 'User Research Intent',
    description: 'Captures incoming unstructured research queries, domain constraints, mode flags, and parameter filters.',
    kernelSignature: 'SK.Context.QueryEnvelope'
  },
  {
    id: 'planner',
    title: '2. Planner',
    type: 'Orchestration',
    subtitle: 'Kernel Stepwise Planner',
    description: 'Decomposes complex research questions into an executable graph of native and semantic functions.',
    kernelSignature: 'HandlebarsPlanner.CreatePlanAsync()'
  },
  {
    id: 'plugins',
    title: '3. Parallel Plugins',
    type: 'Execution',
    subtitle: 'Web, Memory & Document',
    description: 'Executes WebSearchPlugin, MemoryPlugin, and DocumentPlugin concurrently across isolated threads.',
    kernelSignature: 'Kernel.InvokeParallelAsync(Plugins[])'
  },
  {
    id: 'memory',
    title: '4. Memory Store',
    type: 'Vector',
    subtitle: 'Vector Index Lookup',
    description: 'Retrieves prior research context and matches vector embeddings against 2,048 stored domain documents.',
    kernelSignature: 'VolatileMemoryStore.SearchAsync()'
  },
  {
    id: 'factcheck',
    title: '5. Fact-Check Agent',
    type: 'Verification',
    subtitle: 'Verification Guardrail',
    description: 'Validates retrieved claims against cross-referenced citations and computes strict confidence metrics.',
    kernelSignature: 'Aegis.Agents.FactCheckAgent.Validate()'
  },
  {
    id: 'answer',
    title: '6. Answer',
    type: 'Output',
    subtitle: 'Grounded Synthesis',
    description: 'Synthesizes verified research conclusions with inline citations and full execution step traces.',
    kernelSignature: 'Aegis.Output.ResearchSynthesis'
  }
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchNode>(ARCH_NODES[1]); // Default Planner
  const [activeSimIndex, setActiveSimIndex] = useState<number | null>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Live simulation pipeline cycle
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSimulating) {
      timer = setInterval(() => {
        setActiveSimIndex((prev) => {
          const nextIdx = prev === null ? 0 : (prev + 1) % ARCH_NODES.length;
          setSelectedNode(ARCH_NODES[nextIdx]);
          return nextIdx;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const toggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  return (
    <section id="architecture" className="py-24 bg-[#0A0A0B] relative border-t border-[#7A7D85]/20 bg-dot-matrix">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-[#7A7D85]/20 pb-8"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#B33232] mb-2">
              <Network className="w-4 h-4 text-[#B33232]" />
              <span>[SECTION 03] // ORCHESTRATION PIPELINE</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#E4E4E6] tracking-tight">
              AETHELGARD <span className="text-[#B33232]">PIPELINE</span> FLOW
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2 rounded-sm font-mono text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                isSimulating
                  ? 'bg-[#8C1F1F] text-[#E4E4E6] border-[#B33232] shadow-[0_0_15px_rgba(140,31,31,0.3)]'
                  : 'bg-[#16171A] text-[#7A7D85] border-[#7A7D85]/30 hover:text-[#E4E4E6]'
              }`}
            >
              {isSimulating ? (
                <>
                  <Activity className="w-3.5 h-3.5 text-[#E4E4E6] animate-spin" />
                  SIMULATION ACTIVE
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#B33232]" />
                  START LIVE PIPELINE FLOW
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Interactive Flow Diagram Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-sm bg-[#16171A] border border-[#7A7D85]/30 p-6 sm:p-10 mb-12 shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          
          {/* Connector Line Background */}
          <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-[#7A7D85]/20 -translate-y-1/2 pointer-events-none z-0 hidden md:block" />

          {/* Animated Red-Orange Data Particles Traveling along Connector Lines on Loop */}
          <div className="absolute top-1/2 left-[5%] right-[5%] h-1 -translate-y-1/2 pointer-events-none z-0 hidden md:block overflow-hidden">
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: isSimulating ? 2.5 : 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#FF4D4D] to-transparent shadow-[0_0_15px_#FF4D4D]"
            />
          </div>

          {/* Nodes Horizontal Pipeline Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 items-center">
            {ARCH_NODES.map((node, idx) => {
              const isSelected = selectedNode.id === node.id;
              const isActiveSim = activeSimIndex === idx;

              return (
                <div key={node.id} className="relative flex flex-col items-center">
                  {/* Node Box */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setSelectedNode(node);
                      setActiveSimIndex(idx);
                      setIsSimulating(false);
                    }}
                    className={`w-full p-3.5 sm:p-4 rounded-sm border text-left transition-all duration-300 cursor-pointer ${
                      isActiveSim || isSelected
                        ? 'bg-[#1D1E22] border-[#B33232] shadow-[0_0_25px_rgba(179,50,50,0.4)] scale-105'
                        : 'bg-[#0A0A0B] border-[#7A7D85]/30 hover:border-[#7A7D85] hover:bg-[#16171A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-[#16171A] text-[#B33232] border border-[#7A7D85]/30">
                        NODE 0{idx + 1}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${isActiveSim ? 'bg-[#FF4D4D] animate-live-pulse' : isSelected ? 'bg-[#C4432E]' : 'bg-[#7A7D85]/40'}`} />
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#E4E4E6] mb-1 truncate">
                      {node.title}
                    </h4>
                    <p className="font-mono text-[10px] text-[#7A7D85] truncate">
                      {node.subtitle}
                    </p>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Node Detail Inspector Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-10 pt-8 border-t border-[#7A7D85]/30 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 font-mono"
            >
              <div className="p-4 rounded-sm bg-[#0A0A0B] border border-[#B33232]/50 shadow-[0_0_15px_rgba(140,31,31,0.2)]">
                <div className="text-[10px] text-[#B33232] uppercase tracking-widest mb-1 font-semibold flex items-center justify-between">
                  <span>INSPECTED NODE</span>
                  <span className="animate-pulse text-[#FF4D4D]">LIVE</span>
                </div>
                <div className="font-display font-bold text-lg text-[#E4E4E6] mb-1">{selectedNode.title}</div>
                <div className="text-xs text-[#7A7D85]">{selectedNode.subtitle}</div>
              </div>

              <div className="p-4 rounded-sm bg-[#0A0A0B] border border-[#7A7D85]/30 col-span-2 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[#7A7D85] uppercase tracking-widest mb-1">KERNEL FUNCTION SIGNATURE</div>
                  <div className="text-xs text-[#B33232] font-bold mb-3">{selectedNode.kernelSignature}</div>
                  <p className="font-sans text-xs text-[#E4E4E6] leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#7A7D85] pt-3 border-t border-[#7A7D85]/20">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#B33232]" /> Latency: ~12ms
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B33232]" /> State: Synced
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#C4432E]" /> Guardrail: Active
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
