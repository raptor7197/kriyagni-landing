import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CLIENTS } from '../data/content'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { EASE, LineReveal, Reveal } from './ui/Reveal'

const pad = (n) => String(n).padStart(2, '0')

export default function Clients() {
  const [active, setActive] = useState(0)
  const total = CLIENTS.items.length
  const current = CLIENTS.items[active]

  return (
    <section id="clients" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-theme-fg/15">
        {/* Left: intro + list */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-12 p-20">
            <Reveal>
              <Eyebrow>{CLIENTS.eyebrow}</Eyebrow>
            </Reveal>
            <p className="font-mono text-caption-10 tabular-nums opacity-50">
              {pad(active + 1)}—{pad(total)}
            </p>
          </div>

          <h2 className="px-20 py-20 text-headline-50 lg:sticky lg:top-[--header-h]">
            <LineReveal lines={[CLIENTS.headline]} />
          </h2>

          <Reveal className="max-w-520 px-20 text-body-10" delay={0.15}>
            <p>{CLIENTS.description}</p>
          </Reveal>

          <div className="p-20">
            <Button href={CLIENTS.cta.href}>{CLIENTS.cta.label}</Button>
          </div>

          {/* Client list */}
          <ul className="mt-auto divide-y divide-theme-fg/15 border-t border-theme-fg/15">
            {CLIENTS.items.map((c, i) => {
              const isActive = i === active
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`group relative flex w-full items-baseline justify-between gap-12 overflow-hidden px-20 py-16 text-left transition-colors duration-600 ease-out-expo ${
                      isActive ? 'text-theme-bg' : 'text-theme-fg'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 origin-left bg-theme-fg transition-transform duration-600 ease-in-out-quart ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                    <span className="relative z-1 flex items-baseline gap-12">
                      <span className="font-mono text-caption-10 opacity-50">{pad(i + 1)}</span>
                      <span className="text-headline-10">{c.name}</span>
                    </span>
                    <span className="relative z-1 font-mono text-caption-10 uppercase opacity-60">
                      {c.category}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right: preview tile */}
        <div className="hidden min-h-[calc(100svh-var(--header-h))] flex-col lg:flex">
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-mint p-40 text-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center gap-16 text-center"
              >
                {/* Logo placeholder tile — CMS asset drops in here */}
                <div className="flex size-200 items-center justify-center border border-black/20 bg-white p-24">
                  <span className="text-headline-10 uppercase leading-none">{current.name}</span>
                </div>
                <p className="font-mono text-caption-10 uppercase opacity-60">{current.category}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between border-t border-black/10 bg-mint px-20 py-16 text-black">
            <span className="font-mono text-caption-10 uppercase opacity-60">{CLIENTS.eyebrow}</span>
            <span className="font-mono text-caption-10 tabular-nums">
              {pad(active + 1)} / {pad(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
