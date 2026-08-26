import { useState } from 'react'
import { m } from 'framer-motion'
import { PERSONAS } from '../data/content'
import Eyebrow from './ui/Eyebrow'
import { LineReveal, Reveal, SOFT_EASE } from './ui/Reveal'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Inline persona glyph — small editorial illustration rendered as SVG so each
 * persona card has visual weight without needing external assets.
 */
function PersonaFigure({ id }) {
  const common = 'stroke-current'

  const figs = {
    students: (
      <g>
        <rect x="22" y="14" width="76" height="92" fill="none" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="34" y1="32" x2="86" y2="32" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="34" y1="46" x2="78" y2="46" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="34" y1="60" x2="82" y2="60" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="34" y1="74" x2="70" y2="74" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <circle cx="98" cy="92" r="14" fill="none" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="108" y1="102" x2="118" y2="112" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
      </g>
    ),
    researcher: (
      <g>
        <rect x="14" y="20" width="40" height="80" fill="none" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="22" y1="32" x2="46" y2="32" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="22" y1="42" x2="42" y2="42" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="22" y1="52" x2="46" y2="52" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="22" y1="62" x2="38" y2="62" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <circle cx="76" cy="60" r="22" fill="none" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="76" y1="60" x2="76" y2="44" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="76" y1="60" x2="90" y2="60" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="92" y1="76" x2="104" y2="88" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
      </g>
    ),
    founders: (
      <g>
        <path d="M20 96 L60 56 L80 76 L100 36" fill="none" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <circle cx="20" cy="96" r="4" className="fill-current" />
        <circle cx="60" cy="56" r="4" className="fill-current" />
        <circle cx="80" cy="76" r="4" className="fill-current" />
        <circle cx="100" cy="36" r="4" className="fill-current" />
        <line x1="14" y1="104" x2="106" y2="104" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
      </g>
    ),
    government: (
      <g>
        <path d="M22 100 L22 50 L60 22 L98 50 L98 100 Z" fill="none" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="36" y1="60" x2="36" y2="100" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="52" y1="60" x2="52" y2="100" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="68" y1="60" x2="68" y2="100" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="84" y1="60" x2="84" y2="100" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
        <line x1="14" y1="100" x2="106" y2="100" className={common} {...{ ...{ strokeWidth: '1.5' } }} />
      </g>
    ),
  }

  return (
    <m.svg
      viewBox="0 0 120 120"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: SOFT_EASE }}
    >
      {figs[id] || figs.researcher}
    </m.svg>
  )
}

export default function Personas() {
  const [active, setActive] = useState(0)
  const current = PERSONAS.items[active]

  return (
    <section
      id="personas"
      className="scroll-mt-[--header-h] border-t border-theme-fg/15"
    >
      <div className="grid grid-cols-1 divide-y divide-theme-fg/15 lg:grid-cols-[1fr_2fr] lg:divide-x lg:divide-y-0">
        {/* Left rail — eyebrow + headline + tabs */}
        <div className="flex flex-col gap-24 p-20 lg:gap-40 lg:p-40">
          <Reveal duration={1.2} ease={SOFT_EASE}>
            <Eyebrow>{PERSONAS.eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="text-headline-40 uppercase">
            <LineReveal lines={PERSONAS.headline} duration={0.9} ease={SOFT_EASE} mount />
          </h2>

          {/* Persona tabs */}
          <ul
            role="tablist"
            aria-label="Mandana personas"
            className="mt-auto flex flex-wrap gap-8"
          >
            {PERSONAS.items.map((p, i) => {
              const isActive = i === active
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`relative isolate overflow-hidden border border-theme-fg px-16 py-10 font-mono text-caption-20 uppercase transition-colors duration-600 ease-out-expo ${
                      isActive
                        ? 'bg-theme-fg text-theme-bg'
                        : 'bg-theme-bg text-theme-fg hover:bg-theme-fg hover:text-theme-bg'
                    }`}
                  >
                    {p.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right — active persona card */}
        <div
          role="tabpanel"
          aria-labelledby={`persona-${current.id}`}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]"
        >
          {/* Text panel */}
          <div className="flex flex-col gap-20 border-t border-theme-fg/15 p-20 lg:gap-24 lg:border-t-0 lg:p-40">
            <p className="font-mono text-caption-10 uppercase opacity-50">
              {current.eyebrow}
            </p>
            <Reveal key={`${current.id}-title`} mount duration={0.9} ease={SOFT_EASE}>
              <h3 className="text-headline-30">{current.title}</h3>
            </Reveal>
            <Reveal key={`${current.id}-body`} mount delay={0.1} duration={0.9} ease={SOFT_EASE}>
              <p className="max-w-560 text-body-10">{current.body}</p>
            </Reveal>
            <ul
              key={`${current.id}-tags`}
              className="mt-auto flex flex-col gap-8 pt-16 font-mono text-caption-10 uppercase opacity-70 sm:flex-row sm:flex-wrap sm:gap-x-24 sm:gap-y-8"
            >
              {current.tags.map((t) => (
                <li key={t} className="flex items-center gap-8">
                  <span className="block size-4 bg-current" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Figure panel — fixed height on desktop so it doesn't stretch the row */}
          <div
            key={`${current.id}-fig`}
            className="flex aspect-square items-center justify-center self-center border-t border-theme-fg/15 bg-accent/10 p-32 lg:my-40 lg:mr-40 lg:aspect-square lg:h-auto lg:w-[min(100%,300px)] lg:justify-self-end lg:border-l lg:border-t-0"
            aria-hidden="true"
          >
            <PersonaFigure id={current.id} />
          </div>
        </div>
      </div>

      {/* Counter + section index */}
      <div className="flex items-center justify-between border-t border-theme-fg/15 p-20 font-mono text-caption-10 uppercase opacity-50">
        <span>
          {pad(active + 1)}/{pad(PERSONAS.items.length)}
        </span>
        <span>Mandana · For every kind of clearer thinker</span>
      </div>
    </section>
  )
}
