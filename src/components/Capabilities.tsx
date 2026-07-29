import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PluginInfo } from '../types';
import { Search, Brain, FileText, Code2, Terminal } from 'lucide-react';

const PLUGINS: PluginInfo[] = [
  {
    id: 'web-search',
    name: 'WebSearchPlugin',
    className: 'Aegis.Plugins.WebSearch',
    type: 'RETRIEVAL',
    description: 'Executes parallel search queries across scholarly databases, news API feeds, and live web endpoints with automated link reliability verification.',
    stats: [
      { label: 'LATENCY', value: '42 MS' },
      { label: 'EXEC MODE', value: 'PARALLEL' },
      { label: 'SCHEMA', value: 'BIBTEX/URI' }
    ],
    kernelCodeSample: `// Semantic Kernel Native Plugin Registration
var kernel = Kernel.CreateBuilder()
    .AddGoogleSearchServices()
    .Build();

var searchPlugin = kernel.ImportPluginFromType<WebSearchPlugin>("WebSearch");
var result = await kernel.InvokeAsync(searchPlugin["SearchAndGround"], new() {
    ["query"] = "quantum key distribution benchmark 2026",
    ["top_k"] = 5
});`
  },
  {
    id: 'memory-store',
    name: 'MemoryPlugin',
    className: 'Aegis.Plugins.MemoryStore',
    type: 'VECTOR',
    description: 'Manages episodic and semantic memory vectors, indexing historical operator interactions and research query context via cosine similarity.',
    stats: [
      { label: 'VECTOR INDEX', value: '2,048 NODES' },
      { label: 'METRIC', value: 'COSINE' },
      { label: 'RECALL', value: '18 MS' }
    ],
    kernelCodeSample: `// Semantic Memory Retrieval Invocation
var memoryPlugin = new VolatileMemoryStorePlugin(memoryClient);
kernel.Plugins.AddFromObject(memoryPlugin, "MemoryPlugin");

var context = await kernel.InvokeAsync("MemoryPlugin", "RecallKeyFact", new KernelArguments {
    ["collection"] = "ResearchPapers_Quantum",
    ["minRelevance"] = 0.85
});`
  },
  {
    id: 'doc-parser',
    name: 'DocumentPlugin',
    className: 'Aegis.Plugins.DocumentParser',
    type: 'PARSING',
    description: 'Extracts structured text chunks, mathematical notation, tabular data, and citations from multi-format research manuscripts.',
    stats: [
      { label: 'CHUNKING', value: 'SEMANTIC' },
      { label: 'FORMATS', value: 'PDF/TEX/MD' },
      { label: 'THROUGHPUT', value: '1.4 MB/S' }
    ],
    kernelCodeSample: `// Document Synthesis & Extraction Pipeline
var docPlugin = kernel.ImportPluginFromType<DocumentPlugin>("DocumentPlugin");

var summary = await kernel.InvokeAsync(docPlugin["SynthesizePdfStream"], new() {
    ["document_uri"] = "file://research/superconductor_meta.pdf",
    ["extract_tables"] = true
});`
  }
];

export const Capabilities: React.FC = () => {
  const [activeCodePlugin, setActiveCodePlugin] = useState<PluginInfo | null>(null);

  return (
    <section id="capabilities" className="py-24 bg-[#0A0A0B] relative border-t border-[#7A7D85]/20">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-[#7A7D85]/20 pb-8"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#B33232] mb-2">
              <Terminal className="w-4 h-4 text-[#B33232]" />
              <span>[SECTION 02] // PLUGIN SPECIFICATIONS</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#E4E4E6] tracking-tight">
              SEMANTIC KERNEL <span className="text-[#B33232]">PLUGINS</span>
            </h2>
          </div>
          <p className="font-sans text-[#8B8D93] text-sm max-w-md">
            Extensible native and semantic plugins operating in parallel under the Aegis orchestrator pipeline. Hover or select a plugin card to inspect operational mechanics.
          </p>
        </motion.div>

        {/* Plugin Cards Grid with reveal on hover/scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PLUGINS.map((plugin, idx) => {
            const getIcon = () => {
              if (plugin.id === 'web-search') return <Search className="w-5 h-5 text-[#B33232]" />;
              if (plugin.id === 'memory-store') return <Brain className="w-5 h-5 text-[#E4E4E6]" />;
              return <FileText className="w-5 h-5 text-[#7A7D85]" />;
            };

            return (
              <motion.div
                key={plugin.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-sm bg-[#16171A] border border-[#7A7D85]/30 hover:border-[#B33232] p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7A7D85]/30 group-hover:bg-[#B33232] transition-colors" />

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#7A7D85]/30 group-hover:border-[#B33232]/50 transition-colors">
                      {getIcon()}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#0A0A0B] text-[#7A7D85] border border-[#7A7D85]/30">
                      {plugin.type}
                    </span>
                  </div>

                  {/* Plugin Name & Class */}
                  <h3 className="font-display font-bold text-lg text-[#E4E4E6] mb-1 group-hover:text-[#B33232] transition-colors">
                    {plugin.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#7A7D85] mb-4">
                    {plugin.className}
                  </p>

                  {/* Description - Revealed smoothly on hover or scroll */}
                  <div className="mb-6">
                    <p className="font-sans text-xs text-[#E4E4E6] leading-relaxed transition-all duration-300">
                      {plugin.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-sm bg-[#0A0A0B] border border-[#7A7D85]/20 font-mono text-[10px] mb-6">
                    {plugin.stats.map((st, sIdx) => (
                      <div key={sIdx} className="text-center">
                        <div className="text-[#7A7D85]">{st.label}</div>
                        <div className="font-bold text-[#E4E4E6] mt-0.5">{st.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspect SK Code Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCodePlugin(plugin)}
                  className="w-full py-2.5 rounded-sm bg-[#0A0A0B] hover:bg-[#1D1E22] border border-[#7A7D85]/40 hover:border-[#B33232] font-mono text-xs text-[#E4E4E6] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#B33232]" />
                  INSPECT BINDING CODE
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Code Inspection Modal */}
        <AnimatePresence>
          {activeCodePlugin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="bg-[#16171A] border border-[#B33232] rounded-sm max-w-2xl w-full p-6 shadow-[0_0_50px_rgba(140,31,31,0.3)]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#7A7D85]/30 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#B33232]" />
                    <span className="font-display font-bold text-[#E4E4E6]">{activeCodePlugin.name} Kernel Signature</span>
                  </div>
                  <button
                    onClick={() => setActiveCodePlugin(null)}
                    className="text-[#8B8D93] hover:text-[#E4E4E6] font-mono text-xs px-2.5 py-1 rounded-sm bg-[#0A0A0B] border border-[#7A7D85]/40 cursor-pointer"
                  >
                    [ESC] CLOSE
                  </button>
                </div>

                <p className="font-sans text-xs text-[#8B8D93] mb-4">
                  {activeCodePlugin.description}
                </p>

                <div className="rounded-sm bg-[#0A0A0B] border border-[#7A7D85]/30 p-4 font-mono text-xs text-[#E4E4E6] overflow-x-auto leading-relaxed">
                  <pre>{activeCodePlugin.kernelCodeSample}</pre>
                </div>

                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCodePlugin(null)}
                    className="px-5 py-2 rounded-sm bg-[#8C1F1F] hover:bg-[#B33232] text-[#E4E4E6] font-mono font-bold text-xs transition-colors cursor-pointer"
                  >
                    CLOSE INSPECTOR
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
