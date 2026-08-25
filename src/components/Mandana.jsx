import { useState } from 'react'
import { CHAT, CLIENTS, FAQ } from '../data/content'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { LineReveal, Reveal, SOFT_EASE } from './ui/Reveal'
import ChatMockup from './ChatMockup'
import FAQCarousel from './FAQ'

const pad = (n) => String(n).padStart(2, '0')

export default function Mandana() {
  const [active, setActive] = useState(0)
  const total = CLIENTS.items.length

  return (
    <section id="mandana" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-theme-fg/15">
        {/* Left: intro + reasoning steps */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-12 p-20">
            <Reveal duration={1.2} ease={SOFT_EASE}>
              <Eyebrow>{CLIENTS.eyebrow}</Eyebrow>
            </Reveal>
            <p className="font-mono text-caption-10 tabular-nums opacity-50">
              {pad(active + 1)}-{pad(total)}
            </p>
          </div>

          <h2 className="px-20 py-20 text-headline-50 lg:sticky lg:top-[--header-h]">
            <LineReveal lines={[CLIENTS.headline]} duration={1.2} ease={SOFT_EASE} />
          </h2>

          <Reveal
            className="max-w-520 px-20 text-body-10"
            delay={0.15}
            duration={1.2}
            ease={SOFT_EASE}
          >
            <p>{CLIENTS.description}</p>
          </Reveal>

          <div className="p-20">
            <Button href={CLIENTS.cta.href}>{CLIENTS.cta.label}</Button>
          </div>

          {/* Reasoning steps */}
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

        {/* Right: live chat mockup - sticky on desktop, stacked on mobile */}
        <div className="flex items-center justify-center bg-mint/20 p-12 lg:sticky lg:top-[--header-h] lg:self-start lg:p-40">
          <Reveal duration={1.2} ease={SOFT_EASE} className="w-full">
            <ChatMockup />
          </Reveal>
          <span className="sr-only">{CHAT.question}</span>
        </div>
      </div>

      {/* FAQ carousel - flagship product Q&A */}
      <div id="faq" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
        <FAQCarousel />
      </div>
    </section>
  )
}
