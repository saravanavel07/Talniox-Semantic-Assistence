import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';
import { Touchpad } from 'lucide-react';

interface EagleMarkProps {
  size?: number;
  showRadar?: boolean;
  status?: SystemStatus;
  onStatusSelect?: (status: SystemStatus) => void;
  className?: string;
}

export const EagleMark: React.FC<EagleMarkProps> = ({
  size = 280,
  showRadar = true,
  status = 'idle',
  onStatusSelect,
  className = '',
}) => {
  const [lockedOn, setLockedOn] = useState(false);
  const [activeHoverPart, setActiveHoverPart] = useState<string | null>(null);

  useEffect(() => {
    // Sharp "lock-on" pulse trigger after vector assembly snaps (2.2s)
    const timer = setTimeout(() => {
      setLockedOn(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const isPlanning = status === 'planning';
  const isSearching = status === 'searching web';
  const isRecalling = status === 'recalling memory';
  const isAnswering = status === 'answering';
  const isIdle = status === 'idle';

  const handlePartClick = (targetStatus: SystemStatus, partName: string) => {
    if (onStatusSelect) {
      onStatusSelect(targetStatus);
    }
    setActiveHoverPart(partName);
  };

  const getPositionLabel = () => {
    if (isAnswering) return { pos: 'HEAD POSITION', stage: 'STAGE 4: SYNTHESIS & ANSWERING' };
    if (isPlanning) return { pos: 'BODY POSITION', stage: 'STAGE 1: KERNEL PLANNER' };
    if (isSearching) return { pos: 'WINGS POSITION', stage: 'STAGE 2: PARALLEL WEB SEARCH' };
    if (isRecalling) return { pos: 'TAIL POSITION', stage: 'STAGE 3: VECTOR MEMORY RECALL' };
    return { pos: 'TOUCH BIRD ANATOMY TO SET POSITION', stage: 'IDLE // STANDBY' };
  };

  const posInfo = getPositionLabel();

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Active Position HUD Badge Top Header */}
      <div className="mb-3 px-3 py-1 rounded-sm bg-[#16171A] border border-[#B33232]/50 font-mono text-[11px] flex items-center gap-2 text-[#E4E4E6] shadow-[0_0_15px_rgba(140,31,31,0.2)]">
        <Touchpad className="w-3.5 h-3.5 text-[#B33232] animate-pulse" />
        <span className="text-[#B33232] font-bold">{posInfo.pos}</span>
        <span className="text-[#7A7D85]">//</span>
        <span className="text-[#E4E4E6]">{posInfo.stage}</span>
      </div>

      {/* Container for Radar + SVG Eagle Mark */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-700" 
        style={{ width: size, height: size * 0.85 }}
      >
        
        {/* Outer Rotating HUD Compass Ring */}
        <div 
          className="absolute rounded-full border border-[#7A7D85]/30 pointer-events-none animate-rotate-ccw"
          style={{ width: size * 1.5, height: size * 1.5 }}
        >
          {/* Compass Degrees & Ticks */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#B33232] font-bold">N 000°</div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#7A7D85]">S 180°</div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#7A7D85]">W 270°</div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#7A7D85]">E 090°</div>
        </div>

        {/* Inner Counter-Rotating Reticle Ring */}
        <div 
          className="absolute rounded-full border border-dashed border-[#8C1F1F]/40 pointer-events-none animate-rotate-cw-fast"
          style={{ width: size * 1.25, height: size * 1.25 }}
        />

        {/* Radar Sweep Arc in Cold Steel Gray */}
        {showRadar && (
          <div 
            className="absolute rounded-full border border-[#7A7D85]/20 bg-gradient-to-tr from-[#16171A]/40 via-transparent to-[#1D1E22]/20 pointer-events-none"
            style={{ width: size * 1.35, height: size * 1.35 }}
          >
            {/* Radar rotating sweep line in steel gray */}
            <div className="absolute inset-0 rounded-full overflow-hidden animate-radar-gray">
              <div 
                className="w-1/2 h-1/2 bg-gradient-to-br from-[#7A7D85]/20 via-[#7A7D85]/5 to-transparent origin-bottom-right transform rotate-45"
              />
            </div>

            {/* Concentric Avionics HUD Rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-[#7A7D85]/25" />
            <div className="absolute inset-12 rounded-full border border-[#8C1F1F]/20" />
            <div className="absolute inset-20 rounded-full border border-[#7A7D85]/15" />

            {/* Crosshair Cardinal Reticle Marks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#B33232]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#B33232]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-[#7A7D85]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-[#7A7D85]" />

            {/* HUD Target Lock Ring Flash */}
            {(lockedOn || !isIdle) && (
              <div className={`absolute inset-0 rounded-full border-2 ${!isIdle ? 'border-[#C4432E] animate-ping' : 'border-[#B33232]'} opacity-25 pointer-events-none`} />
            )}
          </div>
        )}

        {/* Field Instrument Low-Poly Eagle Silhouette - Live Motion HUD (No Rotation) */}
        <div className="relative z-10 w-full h-full animate-eagle-wing-idle">
          
          {/* Sharp Lock-On Red Flash Overlay when active or snapped */}
          <div 
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              lockedOn || !isIdle ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: !isIdle
                ? 'radial-gradient(circle, rgba(196,67,46,0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(179,50,50,0.15) 0%, transparent 70%)',
            }}
          />

          <svg
            viewBox="0 0 400 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(140,31,31,0.5)]"
          >
            <defs>
              {/* Primary Blood Red Metallic Gradient */}
              <linearGradient id="bloodRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E4E4E6" />
                <stop offset="40%" stopColor="#B33232" />
                <stop offset="100%" stopColor="#8C1F1F" />
              </linearGradient>

              {/* Active High-Glow Orange/Red Gradient */}
              <linearGradient id="activeGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FF4D4D" />
                <stop offset="100%" stopColor="#C4432E" />
              </linearGradient>

              {/* Cold Steel Structural Line Gradient */}
              <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E4E4E6" />
                <stop offset="50%" stopColor="#7A7D85" />
                <stop offset="100%" stopColor="#1D1E22" />
              </linearGradient>

              {/* Facet Fill Translucency */}
              <linearGradient id="facetFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C1F1F" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#16171A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0A0A0B" stopOpacity="0.95" />
              </linearGradient>

              {/* Active Facet Fill */}
              <linearGradient id="activeFacetFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4D4D" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#8C1F1F" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#16171A" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Low-Poly Facet Panels (Hardware Geometry) */}
            <g opacity="0.85">
              
              {/* HEAD FACET (Touch -> Answering) */}
              <g 
                onClick={() => handlePartClick('answering', 'Head (Synthesis)')}
                onTouchStart={() => handlePartClick('answering', 'Head (Synthesis)')}
                onMouseEnter={() => setActiveHoverPart('Head (Synthesis)')}
                onMouseLeave={() => setActiveHoverPart(null)}
                className="cursor-pointer transition-all hover:opacity-100"
              >
                <title>Touch Head: Activate Research Answer Synthesis</title>
                <path
                  d="M200 15 L218 38 L245 42 L225 60 L190 60 L180 48 Z"
                  fill={isAnswering ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isAnswering ? "#FF4D4D" : "#B33232"}
                  strokeWidth={isAnswering ? "3" : "1.5"}
                  className={isAnswering ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
              </g>

              {/* BODY FACETS (Touch -> Planning) */}
              <g 
                onClick={() => handlePartClick('planning', 'Body (Planner)')}
                onTouchStart={() => handlePartClick('planning', 'Body (Planner)')}
                onMouseEnter={() => setActiveHoverPart('Body (Planner)')}
                onMouseLeave={() => setActiveHoverPart(null)}
                className="cursor-pointer transition-all hover:opacity-100"
              >
                <title>Touch Body: Activate Kernel Planner Stage</title>
                <path
                  d="M200 40 L160 80 L200 110 L240 80 Z"
                  fill={isPlanning ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isPlanning ? "#FF4D4D" : "#7A7D85"}
                  strokeWidth={isPlanning ? "3" : "1"}
                  className={isPlanning ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
                <path
                  d="M200 110 L140 130 L200 180 L260 130 Z"
                  fill={isPlanning ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isPlanning ? "#FF4D4D" : "#7A7D85"}
                  strokeWidth={isPlanning ? "3" : "1"}
                  className={isPlanning ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
              </g>

              {/* WINGS FACETS (Touch -> Searching Web) */}
              <g 
                onClick={() => handlePartClick('searching web', 'Wings (Web Search)')}
                onTouchStart={() => handlePartClick('searching web', 'Wings (Web Search)')}
                onMouseEnter={() => setActiveHoverPart('Wings (Web Search)')}
                onMouseLeave={() => setActiveHoverPart(null)}
                className="cursor-pointer transition-all hover:opacity-100"
              >
                <title>Touch Wings: Activate Parallel Web Search Plugin</title>
                <path
                  d="M160 80 L80 100 L140 130 Z"
                  fill={isSearching ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isSearching ? "#FF4D4D" : "#7A7D85"}
                  strokeWidth={isSearching ? "3" : "1"}
                  className={isSearching ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
                <path
                  d="M240 80 L320 100 L260 130 Z"
                  fill={isSearching ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isSearching ? "#FF4D4D" : "#7A7D85"}
                  strokeWidth={isSearching ? "3" : "1"}
                  className={isSearching ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
                <path
                  d="M80 100 L20 120 L100 150 L140 130 Z"
                  fill={isSearching ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isSearching ? "#FF4D4D" : "#8C1F1F"}
                  strokeOpacity={isSearching ? "1" : "0.4"}
                  strokeWidth={isSearching ? "3" : "1"}
                  className={isSearching ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
                <path
                  d="M320 100 L380 120 L300 150 L260 130 Z"
                  fill={isSearching ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isSearching ? "#FF4D4D" : "#8C1F1F"}
                  strokeOpacity={isSearching ? "1" : "0.4"}
                  strokeWidth={isSearching ? "3" : "1"}
                  className={isSearching ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
                <path
                  d="M100 150 L40 180 L120 190 L160 170 Z"
                  fill={isSearching ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isSearching ? "#FF4D4D" : "#7A7D85"}
                  strokeWidth={isSearching ? "3" : "1"}
                  className={isSearching ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
                <path
                  d="M300 150 L360 180 L280 190 L240 170 Z"
                  fill={isSearching ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isSearching ? "#FF4D4D" : "#7A7D85"}
                  strokeWidth={isSearching ? "3" : "1"}
                  className={isSearching ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
              </g>

              {/* TAIL FACET (Touch -> Recalling Memory) */}
              <g 
                onClick={() => handlePartClick('recalling memory', 'Tail (Memory Recall)')}
                onTouchStart={() => handlePartClick('recalling memory', 'Tail (Memory Recall)')}
                onMouseEnter={() => setActiveHoverPart('Tail (Memory Recall)')}
                onMouseLeave={() => setActiveHoverPart(null)}
                className="cursor-pointer transition-all hover:opacity-100"
              >
                <title>Touch Tail: Activate Vector Memory Store Recall</title>
                <path
                  d="M200 180 L160 250 L200 300 L240 250 Z"
                  fill={isRecalling ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isRecalling ? "#FF4D4D" : "#B33232"}
                  strokeWidth={isRecalling ? "3.5" : "1"}
                  className={isRecalling ? "animate-pulse filter drop-shadow-[0_0_18px_#FF4D4D]" : "hover:stroke-[#FF4D4D]"}
                />
              </g>
            </g>

            {/* Scattered Vectors Assembly Group */}
            <g className="animate-eagle-assembly">
              
              {/* HEAD & BEAK (Touch -> Answering) */}
              <g 
                onClick={() => handlePartClick('answering', 'Head (Synthesis)')}
                onTouchStart={() => handlePartClick('answering', 'Head (Synthesis)')}
                onMouseEnter={() => setActiveHoverPart('Head (Synthesis)')}
                onMouseLeave={() => setActiveHoverPart(null)}
                className={`cursor-pointer transition-all ${isAnswering ? "animate-pulse" : "hover:opacity-100"}`}
              >
                <title>Touch Head: Activate Research Answer Synthesis</title>
                {/* Expanded Invisible Touch Area for Head */}
                <polygon 
                  points="180,5 260,25 255,70 145,70 145,25" 
                  fill="transparent" 
                  className="cursor-pointer"
                />
                <path 
                  d="M200 20 L218 38 L235 48 L210 58 L190 58 L182 48 L200 20 Z" 
                  fill={isAnswering ? "url(#activeFacetFill)" : "url(#facetFill)"}
                  stroke={isAnswering ? "url(#activeGlowGrad)" : "url(#bloodRedGrad)"} 
                  strokeWidth={isAnswering ? "4" : "2.5"} 
                  strokeLinejoin="round" 
                  className={isAnswering ? "filter drop-shadow-[0_0_18px_#FF4D4D]" : ""}
                />
                <path 
                  d="M218 38 L242 42 L225 60" 
                  fill="none"
                  stroke={isAnswering ? "#FF4D4D" : "url(#bloodRedGrad)"} 
                  strokeWidth={isAnswering ? "3.5" : "2"} 
                  strokeLinecap="round" 
                />
                <circle 
                  cx="212" 
                  cy="42" 
                  r={isAnswering ? "5" : "2.5"} 
                  fill={isAnswering ? "#FFFFFF" : "#C4432E"} 
                  className="animate-pulse" 
                />
              </g>

              {/* Central HUD Spine & Body (Touch -> Planning) */}
              <g 
                onClick={() => handlePartClick('planning', 'Body (Planner)')}
                onTouchStart={() => handlePartClick('planning', 'Body (Planner)')}
                className={`cursor-pointer ${isPlanning ? "animate-pulse" : ""}`}
              >
                <path 
                  d="M200 58 L200 310" 
                  stroke={isPlanning ? "#FF4D4D" : "url(#steelGrad)"} 
                  strokeWidth={isPlanning ? "3" : "1.5"} 
                  strokeDasharray={isPlanning ? "none" : "3 3"} 
                  className={isPlanning ? "filter drop-shadow-[0_0_15px_#C4432E]" : ""}
                />
              </g>

              {/* Left Wing Field Vector Wireframe */}
              <g 
                onClick={() => handlePartClick('searching web', 'Wings (Web Search)')}
                onTouchStart={() => handlePartClick('searching web', 'Wings (Web Search)')}
                className={`cursor-pointer ${isSearching ? "animate-pulse" : ""}`}
              >
                <path 
                  d="M200 40 L160 80 L80 100 L20 120 L40 180 L100 150 L160 170 L200 180" 
                  stroke={isSearching ? "url(#activeGlowGrad)" : "url(#bloodRedGrad)"} 
                  strokeWidth={isSearching ? "3.5" : "2"} 
                  strokeLinejoin="round" 
                  className={isSearching ? "filter drop-shadow-[0_0_18px_#FF4D4D]" : ""}
                />
                <path 
                  d="M20 120 L10 150 L60 165 L100 150" 
                  stroke={isSearching ? "#FF4D4D" : "url(#steelGrad)"} 
                  strokeWidth={isSearching ? "2.5" : "1.25"} 
                />
                <path 
                  d="M40 180 L30 220 L90 200 L120 190" 
                  stroke={isSearching ? "#FF4D4D" : "url(#steelGrad)"} 
                  strokeWidth={isSearching ? "2.5" : "1.25"} 
                />
                <path 
                  d="M160 170 L130 240 L170 230 L200 180" 
                  stroke={isSearching ? "url(#activeGlowGrad)" : "url(#bloodRedGrad)"} 
                  strokeWidth={isSearching ? "2.5" : "1.25"} 
                />
              </g>

              {/* Right Wing Field Vector Wireframe */}
              <g 
                onClick={() => handlePartClick('searching web', 'Wings (Web Search)')}
                onTouchStart={() => handlePartClick('searching web', 'Wings (Web Search)')}
                className={`cursor-pointer ${isSearching ? "animate-pulse" : ""}`}
              >
                <path 
                  d="M200 40 L240 80 L320 100 L380 120 L360 180 L300 150 L240 170 L200 180" 
                  stroke={isSearching ? "url(#activeGlowGrad)" : "url(#bloodRedGrad)"} 
                  strokeWidth={isSearching ? "3.5" : "2"} 
                  strokeLinejoin="round" 
                  className={isSearching ? "filter drop-shadow-[0_0_18px_#FF4D4D]" : ""}
                />
                <path 
                  d="M380 120 L390 150 L340 165 L300 150" 
                  stroke={isSearching ? "#FF4D4D" : "url(#steelGrad)"} 
                  strokeWidth={isSearching ? "2.5" : "1.25"} 
                />
                <path 
                  d="M360 180 L370 220 L310 200 L280 190" 
                  stroke={isSearching ? "#FF4D4D" : "url(#steelGrad)"} 
                  strokeWidth={isSearching ? "2.5" : "1.25"} 
                />
                <path 
                  d="M240 170 L270 240 L230 230 L200 180" 
                  stroke={isSearching ? "url(#activeGlowGrad)" : "url(#bloodRedGrad)"} 
                  strokeWidth={isSearching ? "2.5" : "1.25"} 
                />
              </g>

              {/* Tail & Base Anchors */}
              <g 
                onClick={() => handlePartClick('recalling memory', 'Tail (Memory Recall)')}
                onTouchStart={() => handlePartClick('recalling memory', 'Tail (Memory Recall)')}
                className={`cursor-pointer ${isRecalling ? "animate-pulse" : ""}`}
              >
                <path 
                  d="M200 180 L160 250 L140 310 L200 290 L260 310 L240 250 Z" 
                  stroke={isRecalling ? "url(#activeGlowGrad)" : "url(#steelGrad)"} 
                  strokeWidth={isRecalling ? "3.5" : "1.75"} 
                  className={isRecalling ? "filter drop-shadow-[0_0_18px_#FF4D4D]" : ""}
                />
                <path 
                  d="M170 260 L200 325 L230 260" 
                  stroke={isRecalling ? "#FF4D4D" : "url(#bloodRedGrad)"} 
                  strokeWidth={isRecalling ? "3" : "1.5"} 
                />
              </g>
            </g>

            {/* Circuit Hardware Nodes */}
            <circle cx="200" cy="20" r={isAnswering ? "6" : "3.5"} fill={isAnswering ? "#FF4D4D" : "#B33232"} className={isAnswering ? "animate-pulse" : ""} />
            <circle cx="200" cy="180" r={isPlanning ? "6" : "4"} fill={isPlanning ? "#FF4D4D" : "#B33232"} className={isPlanning ? "animate-pulse" : ""} />
            <circle cx="160" cy="80" r={isPlanning || isSearching ? "5" : "3"} fill={isPlanning || isSearching ? "#FF4D4D" : "#7A7D85"} />
            <circle cx="240" cy="80" r={isPlanning || isSearching ? "5" : "3"} fill={isPlanning || isSearching ? "#FF4D4D" : "#7A7D85"} />
            <circle cx="80" cy="100" r={isSearching ? "5.5" : "3"} fill={isSearching ? "#FF4D4D" : "#B33232"} className={isSearching ? "animate-pulse" : ""} />
            <circle cx="320" cy="100" r={isSearching ? "5.5" : "3"} fill={isSearching ? "#FF4D4D" : "#B33232"} className={isSearching ? "animate-pulse" : ""} />
            <circle cx="20" cy="120" r={isSearching ? "6" : "3.5"} fill={isSearching ? "#FF4D4D" : "#C4432E"} className={isSearching ? "animate-pulse" : ""} />
            <circle cx="380" cy="120" r={isSearching ? "6" : "3.5"} fill={isSearching ? "#FF4D4D" : "#C4432E"} className={isSearching ? "animate-pulse" : ""} />
            <circle cx="200" cy="325" r={isRecalling ? "5.5" : "3"} fill={isRecalling ? "#FF4D4D" : "#7A7D85"} className={isRecalling ? "animate-pulse" : ""} />
          </svg>
        </div>
      </div>

      {/* Status Readout */}
      <div className="mt-6 flex flex-col items-center gap-2 font-mono text-xs z-20">
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-sm bg-[#16171A] border border-[#7A7D85]/40 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${!isIdle ? 'bg-[#C4432E] animate-ping' : 'bg-[#7A7D85]'}`} />
            <span className="text-[#8B8D93]">SYSTEM STAGE:</span>
            <span className={`font-bold tracking-wider ${!isIdle ? 'text-[#C4432E] uppercase animate-pulse' : 'text-[#E4E4E6]'}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Touch Interactive Instructions Prompt */}
        <div className="text-[10px] text-[#7A7D85] flex items-center gap-1.5 mt-1 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B33232] animate-pulse" />
          <span>Touch or click any part of the Eagle (Head, Body, Wings, Tail) to trigger that specific pipeline stage.</span>
        </div>
      </div>

    </div>
  );
};
