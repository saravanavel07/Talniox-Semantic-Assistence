import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, SystemStatus } from '../types';
import { Terminal, Send, RefreshCw, Copy, Check, ExternalLink, ShieldCheck, Cpu, Database, Activity } from 'lucide-react';

const SUGGESTED_QUERIES = [
  "Analyze quantum key distribution protocol limits & QKD network scaling in 2026",
  "Synthesize Microsoft Semantic Kernel multi-agent planner architectures & kernel memory binding patterns",
  "Fact-check ambient-pressure room-temperature superconductor replication reports and raw claims",
  "Evaluate zero-knowledge proof rollup performance benchmarks for high-throughput L2 blockchains"
];

interface AiAssistantCockpitProps {
  systemStatus?: SystemStatus;
  setSystemStatus?: (status: SystemStatus) => void;
}

export const AiAssistantCockpit: React.FC<AiAssistantCockpitProps> = ({
  systemStatus = 'idle',
  setSystemStatus,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `### Aegis Semantic Kernel Engine Initialized // Ready for Query

I am **Aegis**, an AI Research Assistant powered by Microsoft Semantic Kernel framework architecture. I execute research requests through a structured kernel pipeline:

1. **Planner**: Synthesizes execution plans & sub-tasks.
2. **Plugins**: Invokes \`WebSearchPlugin\`, \`MemoryPlugin\`, and \`DocumentPlugin\` in parallel threads.
3. **Fact-Check Agent**: Cross-checks claims, confidence bounds, and citation validity.

Select a research mode or enter your research query below to begin.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      planTrace: [
        { step: 'Planner', detail: 'Initialized Semantic Kernel orchestrator', latencyMs: 8 },
        { step: 'MemoryStore', detail: 'Loaded 2,048 vector embeddings into local store', latencyMs: 14 },
        { step: 'FactCheckAgent', detail: 'Confidence validation engine online (0.992)', latencyMs: 10 }
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [researchMode, setResearchMode] = useState<'autonomous' | 'factcheck' | 'memory' | 'document'>('autonomous');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt.trim();
    if (!prompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    const stepTimers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Body pulses while planner is deciding ("planning")
    if (setSystemStatus) setSystemStatus('planning');

    // Step 2: Wings pulse while web search is in progress ("searching web")
    stepTimers.push(
      setTimeout(() => {
        if (setSystemStatus) setSystemStatus('searching web');
      }, 750)
    );

    // Step 3: Tail pulses while memory/vector recall is happening ("recalling memory")
    stepTimers.push(
      setTimeout(() => {
        if (setSystemStatus) setSystemStatus('recalling memory');
      }, 1500)
    );

    // Step 4: Head pulses while final answer is being composed ("answering")
    stepTimers.push(
      setTimeout(() => {
        if (setSystemStatus) setSystemStatus('answering');
      }, 2300)
    );

    try {
      const activePlugins = researchMode === 'factcheck'
        ? ['WebSearchPlugin', 'MemoryPlugin']
        : researchMode === 'memory'
        ? ['MemoryPlugin']
        : researchMode === 'document'
        ? ['DocumentPlugin', 'MemoryPlugin']
        : ['WebSearchPlugin', 'MemoryPlugin', 'DocumentPlugin'];

      const historyForApi = messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode: researchMode,
          history: historyForApi,
          plugins: activePlugins,
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'No response returned from Aegis Kernel.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        planTrace: data.planTrace || [],
        citations: data.citations || [],
        groundingChunks: data.groundingChunks || []
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errorMessageText = err instanceof Error ? err.message : 'Unknown error';
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `**[Aegis Kernel Alert]** Communication failure during research execution: ${errorMessageText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Clear timers and resolve back to idle
      stepTimers.forEach(clearTimeout);
      if (setSystemStatus) setSystemStatus('idle');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = () => {
    setMessages([messages[0]]);
  };

  return (
    <section id="cockpit" className="py-24 bg-[#0A0A0B] relative border-t border-[#7A7D85]/20">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Cockpit Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#7A7D85]/20 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#B33232] mb-2">
              <Terminal className="w-4 h-4 text-[#B33232]" />
              <span>[SECTION 04] // TACTICAL RESEARCH CONSOLE</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#E4E4E6] tracking-tight">
              RESEARCH <span className="text-[#B33232]">CONSOLE</span>
            </h2>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#16171A] p-1.5 rounded-sm border border-[#7A7D85]/30 font-mono text-xs">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setResearchMode('autonomous')}
              className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                researchMode === 'autonomous'
                  ? 'bg-[#8C1F1F] text-[#E4E4E6] font-bold border border-[#B33232]'
                  : 'text-[#8B8D93] hover:text-[#E4E4E6]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#E4E4E6]" />
              AUTONOMOUS
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setResearchMode('factcheck')}
              className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                researchMode === 'factcheck'
                  ? 'bg-[#8C1F1F] text-[#E4E4E6] font-bold border border-[#B33232]'
                  : 'text-[#8B8D93] hover:text-[#E4E4E6]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E4E4E6]" />
              FACT-CHECK
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setResearchMode('memory')}
              className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                researchMode === 'memory'
                  ? 'bg-[#8C1F1F] text-[#E4E4E6] font-bold border border-[#B33232]'
                  : 'text-[#8B8D93] hover:text-[#E4E4E6]'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-[#E4E4E6]" />
              MEMORY
            </motion.button>
          </div>
        </motion.div>

        {/* Cockpit Main Terminal Screen */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-sm bg-[#16171A] border border-[#7A7D85]/40 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col h-[700px]"
        >
          
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-[#0A0A0B] border-b border-[#7A7D85]/20 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8C1F1F] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A7D85] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D1E22] inline-block" />
              </div>
              <span className="text-[#8B8D93] border-l border-[#7A7D85]/30 pl-3">
                AEGIS // CONSOLE TOWER [MODE: <span className="text-[#B33232] font-bold uppercase">{researchMode}</span>]
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sync Status Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#16171A] border border-[#7A7D85]/30 text-[10px]">
                <span className={`w-1.5 h-1.5 rounded-full ${systemStatus !== 'idle' ? 'bg-[#C4432E] animate-ping' : 'bg-[#7A7D85]'}`} />
                <span className="text-[#7A7D85]">system:</span>
                <span className={`font-bold ${systemStatus !== 'idle' ? 'text-[#C4432E] uppercase' : 'text-[#E4E4E6]'}`}>{systemStatus}</span>
              </div>

              <button
                onClick={clearHistory}
                title="Reset Terminal Session"
                className="text-[#8B8D93] hover:text-[#E4E4E6] flex items-center gap-1.5 text-[11px] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                RESET CONSOLE
              </button>
            </div>
          </div>

          {/* Messages Console Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 font-sans">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[#7A7D85]">
                    {msg.role === 'user' ? (
                      <span className="text-[#B33232] font-bold">OPERATOR // USER</span>
                    ) : (
                      <span className="text-[#E4E4E6] font-bold flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-[#B33232]" /> AEGIS KERNEL
                      </span>
                    )}
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Bubble Container */}
                  <div
                    className={`max-w-5xl w-full rounded-sm p-4 sm:p-5 border transition-all ${
                      msg.role === 'user'
                        ? 'bg-[#8C1F1F]/15 border-[#B33232]/40 text-[#E4E4E6] rounded-tr-none'
                        : 'bg-[#0A0A0B] border-[#7A7D85]/30 text-[#E4E4E6] rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    {/* Semantic Kernel Reasoning Plan Trace */}
                    {msg.planTrace && msg.planTrace.length > 0 && (
                      <div className="mb-4 p-3 rounded-sm bg-[#16171A] border border-[#7A7D85]/30 font-mono text-xs">
                        <div className="text-[10px] text-[#B33232] uppercase tracking-widest mb-2 flex items-center justify-between border-b border-[#7A7D85]/20 pb-1">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Activity className="w-3 h-3 text-[#B33232]" />
                            SK EXECUTION PLAN TRACE
                          </span>
                          <span className="text-[#7A7D85]">VERIFIED</span>
                        </div>
                        <div className="space-y-1.5">
                          {msg.planTrace.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start justify-between gap-2 text-[11px]">
                              <span className="text-[#B33232] font-bold flex-shrink-0">[{step.step}]</span>
                              <span className="text-[#E4E4E6] flex-1 truncate">{step.detail}</span>
                              <span className="text-[#7A7D85] flex-shrink-0">{step.latencyMs}ms</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Main Response Body */}
                    <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {/* Grounded Citations */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[#7A7D85]/20 font-mono text-xs">
                        <div className="text-[10px] text-[#B33232] font-bold mb-1.5 uppercase">
                          GROUNDED CITATIONS ({msg.citations.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.citations.map((cite, cIdx) => (
                            <a
                              key={cIdx}
                              href={cite}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#16171A] text-[#E4E4E6] border border-[#7A7D85]/40 hover:border-[#B33232] transition-colors text-[10px] truncate max-w-xs"
                            >
                              <ExternalLink className="w-3 h-3 text-[#B33232]" />
                              {cite.replace(/^https?:\/\//, '')}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Copy Button */}
                    {msg.role === 'assistant' && (
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.content)}
                          className="text-[#7A7D85] hover:text-[#E4E4E6] text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#B33232]" /> COPIED
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> COPY REPORT
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[#B33232]">
                  <Cpu className="w-3 h-3 animate-spin" /> AEGIS KERNEL EXECUTING...
                </div>
                <div className="bg-[#0A0A0B] border border-[#B33232]/50 rounded-sm p-4 text-[#E4E4E6] font-mono text-xs flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-[#C4432E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C4432E]"></span>
                  </span>
                  <span>
                    Executing lifecycle stage: <strong className="text-[#C4432E] uppercase font-bold">{systemStatus}</strong> ...
                  </span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="px-4 py-2 bg-[#0A0A0B] border-t border-[#7A7D85]/20 overflow-x-auto flex items-center gap-2 font-mono text-[11px] no-scrollbar">
            <span className="text-[#B33232] font-bold flex-shrink-0">PROMPT SUGGESTIONS:</span>
            {SUGGESTED_QUERIES.map((q, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-sm bg-[#16171A] hover:bg-[#1D1E22] text-[#E4E4E6] border border-[#7A7D85]/30 hover:border-[#B33232] transition-colors flex-shrink-0 cursor-pointer"
              >
                {q.length > 42 ? `${q.substring(0, 42)}...` : q}
              </motion.button>
            ))}
          </div>

          {/* Input Controls */}
          <div className="p-4 bg-[#0A0A0B] border-t border-[#7A7D85]/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Enter research query or technical specification..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-sm bg-[#16171A] border border-[#7A7D85]/40 focus:border-[#B33232] text-[#E4E4E6] font-sans text-sm focus:outline-none transition-all placeholder:text-[#7A7D85]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!inputPrompt.trim() || isLoading}
                className="px-6 py-3 rounded-sm bg-[#8C1F1F] hover:bg-[#B33232] disabled:opacity-40 disabled:cursor-not-allowed text-[#E4E4E6] font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(140,31,31,0.3)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                EXECUTE
              </motion.button>
            </form>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
