# TALONIX // Aegis Semantic Kernel AI Research Assistant

Talonix is an autonomous, military-grade AI Research Assistant built with Microsoft **Semantic Kernel** multi-agent orchestration architecture and powered by Gemini models. It delivers real-time document synthesis, memory vector indexing, parallel plugin execution, and verified fact-checking guardrails within a widescreen tactical console.

---

## 🏛 System Architecture

The Aegis Kernel pipeline follows a 6-stage sequential and parallel execution model:

```
[1. Query Envelope] ---> [2. Stepwise Planner] ---> [3. Parallel Plugins]
                                                         |-- WebSearchPlugin
                                                         |-- MemoryPlugin
                                                         |-- DocumentPlugin
                                                         v
[6. Synthesis & Citation] <--- [5. Fact-Check Agent] <--- [4. Vector Memory Store]
```

1. **Query Envelope (`SK.Context.QueryEnvelope`)**: Ingests unstructured user research prompts, mode flags (`autonomous`, `factcheck`, `memory`), and active session history.
2. **Stepwise Planner (`HandlebarsPlanner.CreatePlanAsync()`)**: Synthesizes a goal-driven step graph decomposing the query into atomic sub-tasks.
3. **Parallel Plugins (`Kernel.InvokeParallelAsync()`)**: Concurrently executes:
   - `WebSearchPlugin`: Real-time query search and grounded URL extraction.
   - `MemoryPlugin`: Vector similarity matching against domain memory stores.
   - `DocumentPlugin`: Contextual PDF/Text document parsing.
4. **Vector Memory Store (`VolatileMemoryStore.SearchAsync()`)**: Queries 2,048 stored embeddings for contextual retrieval and semantic similarity matching.
5. **Fact-Check Agent (`Aegis.Agents.FactCheckAgent.Validate()`)**: Cross-references retrieved claims against groundings, calculates confidence bounds (e.g., 99.2%), and flags hallucination risks.
6. **Research Synthesis (`Aegis.Output.ResearchSynthesis`)**: Formats structured responses complete with step execution traces, citations, and grounded metadata.

---

## 🦅 Technical Specifications: Eagle-Based Telemetry Interface

The signature interface component of Talonix is the **Eagle Telemetry HUD Mark** (`src/components/EagleMark.tsx`), providing diagnostic feedback and direct touch stage manipulation.

### 1. Vector Telemetry Engine (Stationary Vector Silhouette)
- **Stationary Vector Silhouette & Wing Idle**: The low-poly Eagle silhouette is anchored stationarily without rotation or motion badges (`animate-eagle-wing-idle`), providing maximum visual clarity and touch targeting precision.
- **Pulsing Nodes & Vector Snap**: Circuit hardware nodes, head eyes, wing wireframes, and tail anchors pulse dynamically in response to active system pipeline states (`planning`, `searching web`, `recalling memory`, `answering`).

### 2. Anatomical Touch Interaction & Pipeline Stage Mapping
The low-poly vector eagle geometry is split into four interactive touch zones. Tapping or hovering over any part triggers its corresponding system state across the entire cockpit:

| Eagle Anatomy Zone | SVG Element Group | Target System State (`SystemStatus`) | Pipeline Stage Functionality |
| :--- | :--- | :--- | :--- |
| **Head & Beak** | `<g id="head-answering">` | `answering` | **Stage 4: Synthesis & Output Generation** — Head pulses red (`#FF4D4D`), eye node glows high-intensity white, finalizing grounded response formatting. |
| **Central Body & Spine** | `<g id="body-planning">` | `planning` | **Stage 1: Kernel Stepwise Planner** — Body facets illuminate with step-trace pulse effect while planner constructs execution plan. |
| **Left & Right Wings** | `<g id="wings-searching">` | `searching web` | **Stage 2: Parallel Plugin Search** — Wing wireframes pulse along field vectors while `WebSearchPlugin` and `DocumentPlugin` execute concurrently. |
| **Tail & Base Anchors** | `<g id="tail-recalling">` | `recalling memory` | **Stage 3: Vector Memory Recall** — Tail facet illuminates red-orange while vector similarity search queries memory store. |

### 3. Avionics HUD & Reticle Layers
- **Outer Compass Ring**: Counter-clockwise rotating ring (`animate-rotate-ccw`) with cardinal markers (`N 000°`, `S 180°`, `W 270°`, `E 090°`).
- **Inner Reticle Ring**: Clockwise dashed tracking circle (`animate-rotate-cw-fast`).
- **Radar Sweep Arc**: Cold-steel gray rotational sweep line rendering target lock ring flashes upon vector assembly snap.
- **Crosshair Cardinal Reticle**: Precision cardinal crosshairs framing the central low-poly silhouette.

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step-by-Step Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/aegis-semantic-kernel.git
   cd aegis-semantic-kernel
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access the application live at `http://localhost:3000`.

5. **Production Build & Launch**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Environment Variable Setup

The application uses standard server-side environment variables to authenticate with Gemini models while maintaining strict client secret masking:

```env
# .env.example
# Server-side Gemini API key (never exposed to browser)
GEMINI_API_KEY=your_gemini_api_key_here

# Runtime environment (development | production)
NODE_ENV=development
```

---

## 📡 API Reference

### `GET /api/telemetry`
Returns real-time telemetry metrics from the Aegis orchestrator kernel.
- **Response**:
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
Proxies research queries through the Semantic Kernel pipeline.
- **Payload**:
  ```json
  {
    "prompt": "Analyze quantum key distribution protocol limits",
    "mode": "autonomous",
    "history": [],
    "plugins": ["WebSearchPlugin", "MemoryPlugin", "DocumentPlugin"]
  }
  ```
- **Response**:
  Includes `response` text, `planTrace` array with latency metrics per node, `citations`, and grounded metadata chunks.
