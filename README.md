<div align="center">

# ✦ TALONIX ✦

### Aegis Semantic Kernel AI Research Assistant

**Ask boldly. Explore deeply. Verify every insight.**

[![TypeScript](https://img.shields.io/badge/TypeScript-94.2%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Powered%20by-Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Semantic Kernel](https://img.shields.io/badge/Orchestration-Semantic%20Kernel-5C2D91?style=for-the-badge)](https://learn.microsoft.com/semantic-kernel/)

```text
┌────────────────────────────────────────────────────────┐
│  ◉  TALONIX // AEGIS KERNEL                            │
│  ────────────────────────────────────────────────────  │
│  [ QUERY ] ──▶ [ PLAN ] ──▶ [ SEARCH ] ──▶ [ VERIFY ]  │
│                                                        │
│  ▰▰▰▰▰▰▰░░░  RESEARCH PIPELINE ACTIVE                  │
│                                                        │
│  ◆ Memory  ◆ Documents  ◆ Web  ◆ Citations             │
└────────────────────────────────────────────────────────┘
```

</div>

---

## ✨ The Experience

Talonix is an AI research assistant built around a modern multi-stage pipeline:

> **Question → Plan → Retrieve → Verify → Synthesize**

It combines planning, parallel plugin retrieval, vector memory, fact checking, and cited synthesis into one focused research experience.

## 🦅 Eagle Telemetry HUD

The signature **Eagle Telemetry HUD Mark** is located in `src/components/EagleMark.tsx`. It is an SVG-based telemetry interface designed to make pipeline activity visible while keeping the eagle silhouette as a stable visual anchor.

| Eagle zone | Research stage | HUD effect |
|:--|:--|:--|
| **Head & beak** | Synthesis & answer generation | Bright eye node and red focus highlight |
| **Central body** | Stepwise planning | Facets pulse as the execution plan takes shape |
| **Wings** | Web and document search | Vector wireframes pulse during retrieval |
| **Tail & anchors** | Memory recall | Tail facets illuminate during vector matching |

### Interface effects

- Counter-clockwise compass rotation
- Clockwise inner tracking ring
- Rotating radar sweep
- Pulsing SVG telemetry nodes
- Interactive eagle anatomy zones
- State-driven red, amber, and signal-white highlights

```text
              N 000°
                 ↑
        ╭─── ◉ ───╮
 W 270° ←   ╱╲   Eagle   → E 090°
           ╱◉ ◉╲  Telemetry
        ╰─── ╱╲ ───╯
              ↓
             S 180°
```

## 🧠 Research Pipeline

```text
┌──────────────┐
│ Query Envelope│
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌───────────────────────┐
│ Stepwise Plan│────▶│ Parallel Plugins      │
└──────────────┘     │ • Web search          │
                     │ • Memory retrieval    │
                     │ • Document context    │
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Vector Memory Store   │
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Fact Check & Validate │
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Cited Research Result │
                     └───────────────────────┘
```

1. **Query envelope** captures the prompt, mode, and session context.
2. **Stepwise planner** decomposes the request into focused execution steps.
3. **Parallel plugins** collect web, memory, and document context.
4. **Vector memory** performs relevant context retrieval.
5. **Fact checking** validates claims and reports confidence.
6. **Synthesis** produces a structured answer with citations and plan metadata.

## 🏗️ Architecture

Talonix uses Semantic Kernel-inspired orchestration concepts with Gemini-powered model capabilities.

| Component | Responsibility |
|:--|:--|
| `QueryEnvelope` | Ingest prompts and research mode |
| `StepwisePlanner` | Create and coordinate execution steps |
| `WebSearchPlugin` | Find real-time web context |
| `MemoryPlugin` | Retrieve relevant stored knowledge |
| `DocumentPlugin` | Parse PDFs and text documents |
| `FactCheckAgent` | Cross-check claims against grounding |
| `ResearchSynthesis` | Format the final cited response |

## 🚀 Installation

### Requirements

- Node.js 18 or later
- npm 9 or later
- A Gemini API key

### Setup

```bash
git clone https://github.com/saravanavel07/Talniox-Semantic-Assistence.git
cd Talniox-Semantic-Assistence
npm install
```

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

> Never expose API keys in browser code or commit `.env` files.

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

### Production build

```bash
npm run build
npm run start
```

## 📡 API

### `GET /api/telemetry`

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

```json
{
  "prompt": "Analyze quantum key distribution protocol limits",
  "mode": "autonomous",
  "history": [],
  "plugins": ["WebSearchPlugin", "MemoryPlugin", "DocumentPlugin"]
}
```

The response can include generated text, a plan trace, citations, and grounded context metadata.

## 🛠 Technology

- **TypeScript** — 94.2%
- **CSS** — 4.9%
- **HTML** — 0.9%
- **Gemini** — AI model capability
- **Semantic Kernel** — orchestration architecture
- **SVG** — eagle telemetry interface

---

<div align="center">

### TALONIX // ILLUMINATE THE SIGNAL

**Ground the answer. Verify the insight.**

</div>
