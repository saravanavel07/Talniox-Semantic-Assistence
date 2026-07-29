import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK (Server-Side Only)
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'online',
      system: 'Aegis // Semantic Kernel v4.12.0',
      timestamp: new Date().toISOString(),
      apiKeyConfigured: !!apiKey,
    });
  });

  // Simulated live kernel telemetry endpoint
  app.get('/api/telemetry', (_req, res) => {
    const memoryUsage = process.memoryUsage();
    res.json({
      status: 'active',
      plannerState: 'idle',
      memoryVectors: 256 + Math.floor(Math.random() * 12),
      activePlugins: ['WebSearchPlugin', 'MemoryPlugin', 'DocumentPlugin'],
      orchestratorLatencyMs: +(4.2 + Math.random() * 1.5).toFixed(2),
      factCheckConfidence: 0.985,
      heapUsedMb: +(memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  // Chat/Research completion endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { prompt, mode = 'autonomous', history = [], plugins = ['WebSearchPlugin', 'MemoryPlugin', 'DocumentPlugin'] } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt string is required' });
        return;
      }

      if (!ai) {
        // Fallback if API key is not yet set in environment
        res.json({
          response: `[Aegis Kernel Alert] GEMINI_API_KEY environment variable is missing. Operating in offline simulation mode for query: "${prompt}". Please verify API Key setup in Secrets settings.`,
          planTrace: [
            { step: 'Planner', detail: 'Generated execution graph with 3 nodes', latencyMs: 12 },
            { step: 'MemoryPlugin', detail: 'Searched 256 indexed vectors (cosine sim > 0.85)', latencyMs: 28 },
            { step: 'FactCheckAgent', detail: 'Confidence rating: 0.92', latencyMs: 15 }
          ],
          citations: ['https://learn.microsoft.com/en-us/semantic-kernel/']
        });
        return;
      }

      // Build context and system prompt
      const systemInstruction = `You are Aegis, a grand, highly technical AI Research Assistant built on the Microsoft Semantic Kernel framework architecture.
Your persona is precise, confident, analytical, and authoritative. You avoid fluff, marketing terminology, and superficial praise.
You analyze research questions through the lens of a multi-agent kernel:
1. Planner: Generates step-by-step execution plans.
2. Plugins: Leverages WebSearchPlugin (live web context), MemoryPlugin (vector database & semantic memory recall), and DocumentPlugin (structural code/pdf synthesis).
3. Fact-Check Agent: Cross-checks evidence, logical coherence, and domain validity.

Active Mode: ${mode}
Enabled Plugins: ${plugins.join(', ')}

When responding, structure your response clearly using markdown with technical headers, code blocks where relevant, clear step breakdowns, and concise conclusions.`;

      // Formulate query message list or context
      const chatContents = history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      chatContents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      // Call Gemini 3.6 Flash
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: chatContents.length > 0 ? chatContents : prompt,
        config: {
          systemInstruction,
          temperature: 0.4,
          tools: mode === 'autonomous' || plugins.includes('WebSearchPlugin') ? [{ googleSearch: {} }] : [],
        },
      });

      const responseText = response.text || 'No response text returned.';

      // Extract search grounding sources if present
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const citations: string[] = [];
      if (groundingChunks && Array.isArray(groundingChunks)) {
        for (const chunk of groundingChunks) {
          if (chunk.web?.uri) {
            citations.push(chunk.web.uri);
          }
        }
      }

      // Generate realistic Kernel execution trace metadata
      const planTrace = [
        {
          step: 'Planner',
          detail: `Synthesized multi-step execution graph (${mode.toUpperCase()} mode)`,
          latencyMs: Math.floor(10 + Math.random() * 15)
        },
        {
          step: 'Plugins',
          detail: `Executed ${plugins.length} active plugins in parallel: ${plugins.join(', ')}`,
          latencyMs: Math.floor(40 + Math.random() * 60)
        },
        {
          step: 'MemoryStore',
          detail: `Retrieved semantic embeddings context (Similarity threshold: 0.88)`,
          latencyMs: Math.floor(18 + Math.random() * 25)
        },
        {
          step: 'FactCheckAgent',
          detail: `Verified claims consistency score: ${(0.95 + Math.random() * 0.04).toFixed(3)}`,
          latencyMs: Math.floor(20 + Math.random() * 30)
        }
      ];

      res.json({
        response: responseText,
        planTrace,
        citations,
        groundingChunks: groundingChunks || [],
      });
    } catch (err: unknown) {
      console.error('Error in /api/chat endpoint:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Aegis Engine] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
