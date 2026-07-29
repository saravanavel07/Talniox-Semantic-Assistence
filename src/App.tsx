import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { AiAssistantCockpit } from './components/AiAssistantCockpit';
import { Footer } from './components/Footer';
import { SystemStatus } from './types';

export default function App() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('idle');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E4E4E6] font-sans selection:bg-[#8C1F1F]/40 selection:text-[#E4E4E6]">
      <Header />
      <main>
        <Hero systemStatus={systemStatus} onSystemStatusChange={setSystemStatus} />
        <Capabilities />
        <ArchitectureDiagram />
        <AiAssistantCockpit systemStatus={systemStatus} setSystemStatus={setSystemStatus} />
      </main>
      <Footer />
    </div>
  );
}
