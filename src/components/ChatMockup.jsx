import { m } from 'framer-motion'
import { CHAT } from '../data/content'
import { SOFT_EASE } from './ui/Reveal'

/**
 * Static Mandana reasoning-trace window - the org's flagship product.
 * Mirrors the live app UI: session rail, open question, reasoning tree,
 * decision chips. Steps reveal in sequence on scroll into view.
 */
export default function ChatMockup() {
  return (
    <div className="relative w-full">
      {/* Titlebar */}
      <div className="flex items-center justify-between border border-b-0 border-theme-fg/15 bg-black-deep px-20 py-16 text-white">
        <div className="flex items-center gap-12">
          <img src="/logo.png" alt="" className="logo-invert-header h-20 w-20" />
          <span className="font-mono text-caption-20">{CHAT.brand}</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="relative flex size-8">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex size-8 rounded-full bg-mint" />
          </span>
          <span className="font-mono text-caption-10 uppercase text-mint">{CHAT.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] border border-theme-fg/15 bg-black-deep text-white">
        {/* Session rail */}
        <aside className="hidden w-140 flex-col gap-12 border-r border-white/10 p-20 sm:flex">
          {CHAT.sidebar.map((item, i) => (
            <span
              key={item}
              className={`font-mono text-caption-10 uppercase transition-colors duration-600 ${
                i === 0 ? 'text-mint' : 'text-white/50 hover:text-white'
              }`}
            >
              {item}
            </span>
          ))}
          <span className="mt-auto font-mono text-caption-10 uppercase text-white/40">
            {CHAT.tab}
          </span>
        </aside>

        {/* Conversation */}
        <div className="flex flex-col gap-20 p-20">
          {/* Question */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 1, ease: SOFT_EASE }}
            className="border border-white/15 bg-white/5 p-16"
          >
            <p className="text-body-20">{CHAT.question}</p>
          </m.div>

          {/* Reasoning trace */}
          <div className="border border-white/15 bg-white/5 p-16 font-mono text-caption-20 leading-[1.9]">
            <p className="mb-8 flex items-baseline gap-8 text-mint">
              <span className="uppercase">{CHAT.srcLabel}</span>
              <span className="text-white">{CHAT.srcPath}</span>
            </p>
            {CHAT.steps.map((step, i) => (
              <m.p
                key={step.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: SOFT_EASE }}
                className="flex items-baseline gap-8 whitespace-nowrap"
              >
                <span className="text-white/40">{step.glyph}</span>
                <span className={step.accent ? 'text-white' : 'text-white/80'}>
                  {step.label}
                </span>
                {step.accent && <span className="text-mint">{step.accent}</span>}
              </m.p>
            ))}
          </div>

          {/* Status + chips */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 1, delay: 0.2, ease: SOFT_EASE }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-12">
              <p className="font-mono text-caption-10 uppercase text-mint">
                {CHAT.decision}
              </p>
              <p className="font-mono text-caption-10 uppercase text-white/40">
                {CHAT.tradeOffs}
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              {CHAT.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 px-12 py-6 font-mono text-caption-10 uppercase text-white/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </m.div>

          {/* Cursor */}
          <p className="font-mono text-caption-20 text-mint">
            ▍<span className="animate-pulse">_</span>
          </p>
        </div>
      </div>
    </div>
  )
}