export type SystemStatus = 'idle' | 'planning' | 'searching web' | 'recalling memory' | 'answering';

export interface TelemetryState {
  status: string;
  plannerState: string;
  memoryVectors: number;
  activePlugins: string[];
  orchestratorLatencyMs: number;
  factCheckConfidence: number;
  heapUsedMb: number;
  uptimeSeconds: number;
}

export interface PlanStep {
  step: 'Planner' | 'Plugins' | 'MemoryStore' | 'FactCheckAgent' | string;
  detail: string;
  latencyMs: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  planTrace?: PlanStep[];
  citations?: string[];
  groundingChunks?: any[];
  isStreaming?: boolean;
}

export interface PluginInfo {
  id: string;
  name: string;
  className: string;
  type: 'Retrieval' | 'Vector' | 'Parsing' | 'RETRIEVAL' | 'VECTOR' | 'PARSING';
  description: string;
  kernelCodeSample: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ArchNode {
  id: string;
  title: string;
  type: 'Input' | 'Orchestration' | 'Execution' | 'Vector' | 'Verification' | 'Output';
  subtitle: string;
  description: string;
  kernelSignature: string;
}
