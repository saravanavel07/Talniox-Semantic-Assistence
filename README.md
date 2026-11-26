<div align="center">

# ✦ TALONIX ✦
### Aegis Semantic Kernel · AI Research Assistant

**Ask boldly. Explore deeply. Verify every insight.**

[![TypeScript](https://img.shields.io/badge/TypeScript-94.2%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Semantic Kernel](https://img.shields.io/badge/Orchestration-Semantic%20Kernel-5C2D91?style=for-the-badge)](https://learn.microsoft.com/semantic-kernel/)

### A research cockpit built to turn complex questions into grounded answers.

</div>

---

## ✨ The experience

Talonix is an AI research assistant designed to break a question into manageable steps, gather relevant context, check claims, and synthesize a cited response. Its telemetry-inspired interface makes the research flow visible while you work.

> **From question → plan → sources → verification → synthesis.**

## 🦅 Live telemetry, in motion

The **Eagle Telemetry HUD Mark** (`src/components/EagleMark.tsx`) is the visual centerpiece: an SVG eagle silhouette framed by avionics-inspired rings, reticles, and status indicators. Its motion and color cues are designed to make system activity easy to scan—not just decorative.

| HUD element | Visual effect | What it communicates |
| --- | --- | --- |
| Compass ring | Slow counter-clockwise rotation | Orientation and ambient telemetry |
| Inner reticle | Faster clockwise dashed rotation | Active tracking |
| Radar sweep | Rotating sweep arc | Ongoing scan activity |
| Vector nodes | State-driven pulses and glow | Pipeline activity and connections |
| Eagle touch zones | Highlight on hover or selection | Selectable research stages |

### Follow the signal

| Eagle zone | Research stage | HUD response |
| --- | --- | --- |
| **Head & beak** | Answering · synthesis | Bright eye node and focused red highlight |
| **Central body & spine** | Planning | Facet pulses as the plan takes shape |
| **Wings** | Web and document search | Wireframe vectors pulse during parallel retrieval |
| **Tail & base anchors** | Memory recall | Tail facets glow as relevant context is retrieved |

The eagle remains centered as a stable visual anchor. Motion is reserved for rings, sweep lines, and stateful telemetry, helping active signals stand out from the background.

## 🧠 How a research request flows

```text
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────────┐
│  Your question  │───▶│  Stepwise plan  │───▶│  Parallel retrieval  │
└─────────────────┘    └─────────────────┘    │  Web · Memory · Docs │
                                               └──────────┬───────────┘
                                                          ▼
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────────┐
│ Cited synthesis │◀───│ Claim checking  │◀───│ Relevant context     │
└─────────────────┘    └─────────────────┘    └──────────────────────┘
```

1. **Capture** the prompt, selected modes, and session context.
2. **Plan** a sequence of focused research steps.
3. **Retrieve** from web search, memory, and documents in parallel.
4. **Check** claims against available grounding and flag uncertainty.
5. **Synthesize** a structured response with citations and execution details.

## 🏛 Architecture

```text
Query Envelope → Stepwise Planner → Parallel Plugins
                                      ├─ WebSearchPlugin
                                      ├─ MemoryPlugin
                                      └─ DocumentPlugin
             Research Synthesis ← Fact-Check Agent ← Vector Memory
```

The README describes a Semantic Kernel-inspired, multi-stage orchestration flow powered by Gemini models. See the implementation for the current runtime behavior and supported capabilities.

## 🚀 Get started

### Requirements

- Node.js 18 or later
- npm 9 or later
- A Gemini API key for model-backed features

### Run locally

```bash
git clone https://github.com/saravanavel07/Talniox-Semantic-Assistence.git
cd Talniox-Semantic-Assistence
npm install
```

Create a `.env` file in the project root and add your key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

Keep API keys private; do not commit your `.env` file.

```bash
npm run dev
```

Open the local URL printed by the development server. To create and run a production build:

```bash
npm run build
npm run start
```

## 📡 API overview

### `GET /api/telemetry`

Returns orchestrator status and telemetry information. Example response shape:

```json
{
  "status": "active",
  "plannerState": "EXEC_PLAN_ACTIVE",
  "memoryVectors": 2048,
  "activePlugins": ["WebSearchPlugin", "MemoryPlugin", "DocumentPlugin"],
  "orchestratorLatencyMs": 4.2,
  "factCheckConfidence": 0.992,
  "heapUsedMb": 48.6,
  "uptimeSeconds": 3820
}
```

### `POST /api/chat`

Submits a research prompt to the chat pipeline. Example request:

```json
{
  "prompt": "Analyze quantum key distribution protocol limits",
  "mode": "autonomous",
  "history": [],
  "plugins": ["WebSearchPlugin", "MemoryPlugin", "DocumentPlugin"]
}
```

The documented response includes generated text, a plan trace, citations, and grounding metadata. Exact request and response behavior may depend on the current implementation.

## 🛠 Built with

- **TypeScript** for the application
- **CSS** for the interface and visual effects
- **Gemini** for AI model capabilities
- **Semantic Kernel** multi-agent orchestration concepts

---

<div align="center">

**TALONIX · Illuminate the signal. Ground the answer.**

</div>
