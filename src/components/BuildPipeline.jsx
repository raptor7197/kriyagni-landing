import { useState } from 'react'
import { m } from 'framer-motion'
import Eyebrow from './ui/Eyebrow'
import { SOFT_EASE } from './ui/Reveal'

const PIPELINE_NODES = [
  {
    id: 'research',
    title: 'Research',
    subtitle: 'Foundation Models',
    phase: 'Phase 01',
    description:
      'Developing first-principles reasoning models, citations, and transparent thinking architectures.',
    pos: { x: 20, y: 152, w: 200, h: 76 },
  },
  {
    id: 'intelligence',
    title: 'Intelligence',
    subtitle: 'Multimodal',
    phase: 'Phase 02',
    description:
      'Synthesizing text, vision, code, and structured data into unified reasoning traces.',
    pos: { x: 260, y: 152, w: 200, h: 76 },
  },
  {
    id: 'agents',
    title: 'AI Agents',
    subtitle: 'Reasoning',
    phase: 'Phase 03A',
    description:
      'Autonomous decision engines that weigh trade-offs and surface hidden assumptions.',
    pos: { x: 500, y: 44, w: 200, h: 76 },
  },
  {
    id: 'physical',
    title: 'Physical Intel',
    subtitle: 'Embodied',
    phase: 'Phase 03B',
    description:
      'Bringing spatial reasoning and computer vision to robotics and real-world hardware.',
    pos: { x: 500, y: 260, w: 200, h: 76 },
  },
  {
    id: 'products',
    title: 'Products',
    subtitle: 'Consumer & Enterprise',
    phase: 'Phase 04',
    description:
      'Shipping Mandana AI for individuals, research teams, founders, and enterprises.',
    pos: { x: 740, y: 152, w: 220, h: 76 },
  },
  {
    id: 'impact',
    title: 'Impact',
    subtitle: 'Real-world Systems',
    phase: 'Phase 05',
    description:
      'Deploying transparent intelligence to public impact, science, and global systems.',
    pos: { x: 1000, y: 152, w: 200, h: 76 },
  },
]

const PATHS = [
  {
    id: 'research-intel',
    from: 'research',
    to: 'intelligence',
    d: 'M 220 190 L 260 190',
    dur: '2.5s',
  },
  {
    id: 'intel-agents',
    from: 'intelligence',
    to: 'agents',
    d: 'M 460 190 C 480 190, 480 82, 500 82',
    dur: '3s',
  },
  {
    id: 'intel-physical',
    from: 'intelligence',
    to: 'physical',
    d: 'M 460 190 C 480 190, 480 298, 500 298',
    dur: '3.2s',
  },
  {
    id: 'agents-products',
    from: 'agents',
    to: 'products',
    d: 'M 700 82 C 720 82, 720 190, 740 190',
    dur: '3s',
  },
  {
    id: 'physical-products',
    from: 'physical',
    to: 'products',
    d: 'M 700 298 C 720 298, 720 190, 740 190',
    dur: '3.2s',
  },
  {
    id: 'products-impact',
    from: 'products',
    to: 'impact',
    d: 'M 960 190 L 1000 190',
    dur: '2.5s',
  },
]

const ACTIVE_ROUTES = {
  agents: new Set(['research-intel', 'intel-agents', 'agents-products', 'products-impact']),
  physical: new Set(['research-intel', 'intel-physical', 'physical-products', 'products-impact']),
}

export default function BuildPipeline() {
  const [activeNode, setActiveNode] = useState(PIPELINE_NODES[0])
  const [activeBranch, setActiveBranch] = useState('agents')

  const selectNode = (node) => {
    if (node.id === 'agents' || node.id === 'physical') setActiveBranch(node.id)
    setActiveNode(node)
  }

  const isPathActive = (path) => ACTIVE_ROUTES[activeBranch].has(path.id)

  return (
    <div className="hidden w-full flex-col gap-24 md:flex">
      {/* Header text */}
      <div className="flex flex-col gap-10 text-center items-center">
        <Eyebrow>Mandana Research</Eyebrow>
        <h2 className="text-headline-30 uppercase font-medium tracking-tight">How we build.</h2>
        <p className="font-mono text-caption-20 opacity-70">
          Research &rarr; Intelligence &rarr; Products &rarr; Impact
        </p>
      </div>

      {/* Main Diagram Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border border-theme-fg/15 bg-theme-bg/80 p-16 sm:p-24 shadow-sm overflow-hidden backdrop-blur">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(rgba(var(--theme-fg), 0.4) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Desktop / Large Screen View (>= 1024px): SVG + HTML Overlay */}
        <div className="hidden lg:block relative w-full aspect-[1220/380] max-w-[1220px] mx-auto overflow-visible">
          {/* SVG Connections & Flow Pulses */}
          <svg
            viewBox="0 0 1220 380"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          >
            {PATHS.map((p) => {
              const isActive = isPathActive(p)

              return (
                <g key={p.id}>
                  {/* Base path line */}
                  <path
                    d={p.d}
                    fill="none"
                    stroke={
                      isActive
                        ? '#a1ffcb'
                        : 'rgba(var(--theme-fg), 0.2)'
                    }
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    className="transition-colors duration-300"
                  />
                  {/* Smooth, single flowing pulse dot along path */}
                  {isActive && (
                    <circle r="3.5" fill="#a1ffcb" filter="drop-shadow(0 0 4px #a1ffcb)">
                      <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
                    </circle>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Nodes Overlay */}
          {PIPELINE_NODES.map((node) => {
            const isSelected = activeNode.id === node.id

            return (
              <m.button
                key={node.id}
                type="button"
                onClick={() => selectNode(node)}
                onMouseEnter={() => selectNode(node)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: SOFT_EASE }}
                style={{
                  left: `${(node.pos.x / 1220) * 100}%`,
                  top: `${(node.pos.y / 380) * 100}%`,
                  width: `${(node.pos.w / 1220) * 100}%`,
                  height: `${(node.pos.h / 380) * 100}%`,
                }}
                className={`absolute z-10 flex items-center gap-10 rounded-xl px-12 py-10 text-left transition-all duration-300 border ${
                  isSelected
                    ? 'border-mint bg-theme-bg shadow-[0_0_16px_rgba(161,255,203,0.25)]'
                    : 'border-mint/40 bg-theme-bg/95 hover:border-mint hover:shadow-sm'
                }`}
              >
                {/* Steady Dot Indicator (NO heavy animate-ping) */}
                <span className="relative flex size-6 shrink-0 items-center justify-center">
                  <span
                    className={`size-5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-mint scale-125 shadow-[0_0_8px_#a1ffcb]'
                        : 'bg-theme-fg/30'
                    }`}
                  />
                </span>

                {/* Node Text - Clean two-line display with no overflow */}
                <div className="flex flex-col min-w-0 flex-1 leading-tight">
                  <span className="font-bold text-[12px] xl:text-[13px] text-theme-fg whitespace-nowrap">
                    {node.title}
                  </span>
                  <span className="font-mono text-[10px] xl:text-[11px] text-theme-fg/60 whitespace-nowrap mt-1">
                    {node.subtitle}
                  </span>
                </div>
              </m.button>
            )
          })}
        </div>

        {/* Medium Screen View (Tablet 768px - 1023px): Horizontal Scroll Canvas */}
        <div className="hidden md:block lg:hidden overflow-x-auto pb-8">
          <div className="relative w-[1100px] h-[350px] mx-auto shrink-0">
            <svg
              viewBox="0 0 1220 380"
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            >
              {PATHS.map((p) => {
                const isActive = isPathActive(p)
                return (
                  <g key={p.id}>
                    <path
                      d={p.d}
                      fill="none"
                      stroke={isActive ? '#a1ffcb' : 'rgba(var(--theme-fg), 0.2)'}
                      strokeWidth={isActive ? '2.5' : '1.5'}
                    />
                    {isActive && (
                      <circle r="3.5" fill="#a1ffcb" filter="drop-shadow(0 0 4px #a1ffcb)">
                        <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
                      </circle>
                    )}
                  </g>
                )
              })}
            </svg>

            {PIPELINE_NODES.map((node) => {
              const isSelected = activeNode.id === node.id
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => selectNode(node)}
                  onMouseEnter={() => selectNode(node)}
                  style={{
                    left: `${(node.pos.x / 1220) * 100}%`,
                    top: `${(node.pos.y / 380) * 100}%`,
                    width: `${(node.pos.w / 1220) * 100}%`,
                    height: `${(node.pos.h / 380) * 100}%`,
                  }}
                  className={`absolute z-10 flex items-center gap-10 rounded-xl px-12 py-10 text-left transition-all border ${
                    isSelected
                      ? 'border-mint bg-theme-bg shadow-[0_0_16px_rgba(161,255,203,0.25)]'
                      : 'border-mint/40 bg-theme-bg/95 hover:border-mint'
                  }`}
                >
                  <span
                    className={`size-5 rounded-full shrink-0 ${
                      isSelected ? 'bg-mint' : 'bg-theme-fg/30'
                    }`}
                  />
                  <div className="flex flex-col leading-tight min-w-0 flex-1">
                    <span className="font-bold text-[12px] text-theme-fg whitespace-nowrap">
                      {node.title}
                    </span>
                    <span className="font-mono text-[10px] text-theme-fg/60 whitespace-nowrap mt-1">
                      {node.subtitle}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile View (< 768px): Vertical Clean Architecture Chain */}
        <div className="md:hidden flex flex-col gap-10 relative z-10">
          {PIPELINE_NODES.map((node, idx) => {
            const isSelected = activeNode.id === node.id
            return (
              <div key={node.id} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => selectNode(node)}
                  className={`w-full flex items-center justify-between rounded-xl border p-14 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-mint bg-theme-bg shadow-[0_0_14px_rgba(161,255,203,0.25)]'
                      : 'border-theme-fg/20 bg-theme-bg/90'
                  }`}
                >
                  <div className="flex items-center gap-12">
                    <span
                      className={`size-8 rounded-full shrink-0 transition-all ${
                        isSelected ? 'bg-mint shadow-[0_0_6px_#a1ffcb]' : 'bg-theme-fg/30'
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-body-10 text-theme-fg">
                        {node.title}
                      </span>
                      <span className="font-mono text-caption-10 text-theme-fg/60">
                        {node.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-caption-10 uppercase text-mint font-medium">
                    {node.phase}
                  </span>
                </button>

                {/* Vertical connector line */}
                {idx < PIPELINE_NODES.length - 1 && (
                  <div className="h-14 w-[1.5px] bg-mint/40 my-1 relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-4 bg-mint animate-pulse" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Active Node Detail Banner */}
        <div className="mt-16 sm:mt-24 border-t border-theme-fg/15 pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-12 relative z-10">
          <div className="flex items-center gap-10">
            <span className="font-mono text-caption-10 uppercase text-mint bg-mint/10 border border-mint/30 px-10 py-3 rounded-full">
              {activeNode.phase}
            </span>
            <span className="font-bold text-body-10 text-theme-fg">
              {activeNode.title}
            </span>
            <span className="font-mono text-caption-10 text-theme-fg/60 hidden sm:inline">
              — {activeNode.subtitle}
            </span>
          </div>
          <p className="font-mono text-caption-10 text-theme-fg/80 max-w-xl">
            {activeNode.description}
          </p>
        </div>
      </div>
    </div>
  )
}
