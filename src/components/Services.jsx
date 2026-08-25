import { SERVICES } from '../data/content'
import Button from './ui/Button'
import { LineReveal, Reveal } from './ui/Reveal'

/** Abstract animated line-art figure, one variant per service index. */
function ServiceFigure({ variant }) {
  const common = 'stroke-current'
  const figures = [
    // 01 - dashed orbital ring
    <g key="f1">
      <circle cx="60" cy="60" r="54" fill="none" className={`${common} animate-spin-slow origin-center`} strokeWidth="1.5" strokeDasharray="3 6" />
      <circle cx="60" cy="60" r="30" fill="none" className={common} strokeWidth="1.5" />
      <circle cx="60" cy="30" r="4" className="fill-current" />
    </g>,
    // 02 - crosshair grid
    <g key="f2">
      <rect x="8" y="8" width="104" height="104" fill="none" className={common} strokeWidth="1.5" />
      <line x1="60" y1="8" x2="60" y2="112" className={common} strokeWidth="1.5" strokeDasharray="4 5" />
      <line x1="8" y1="60" x2="112" y2="60" className={common} strokeWidth="1.5" strokeDasharray="4 5" />
      <rect x="42" y="42" width="36" height="36" fill="none" className={`${common} animate-spin-slow origin-center`} strokeWidth="1.5" />
    </g>,
    // 03 - neural nodes
    <g key="f3">
      <circle cx="30" cy="90" r="6" fill="none" className={common} strokeWidth="1.5" />
      <circle cx="90" cy="30" r="6" fill="none" className={common} strokeWidth="1.5" />
      <circle cx="90" cy="90" r="10" fill="none" className={common} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" className="fill-current" />
      <line x1="36" y1="86" x2="84" y2="36" className={common} strokeWidth="1.5" />
      <line x1="36" y1="90" x2="80" y2="90" className={common} strokeWidth="1.5" strokeDasharray="3 4" />
      <line x1="90" y1="36" x2="90" y2="80" className={common} strokeWidth="1.5" strokeDasharray="3 4" />
    </g>,
    // 04 - stacked tiers
    <g key="f4">
      <rect x="20" y="80" width="80" height="16" fill="none" className={common} strokeWidth="1.5" />
      <rect x="32" y="54" width="56" height="16" fill="none" className={common} strokeWidth="1.5" />
      <rect x="44" y="28" width="32" height="16" fill="none" className={`${common}`} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="60" cy="14" r="5" className="fill-current" />
      <line x1="60" y1="19" x2="60" y2="28" className={common} strokeWidth="1.5" />
    </g>,
  ]

  return (
    <svg
      viewBox="0 0 120 120"
      className="ml-auto w-100 shrink-0 opacity-70 lg:w-120"
      aria-hidden="true"
    >
      {figures[variant % figures.length]}
    </svg>
  )
}

function ServiceItem({ item, i }) {
  return (
    <div className="grid grid-cols-1 gap-24 p-20 lg:grid-cols-[1fr_auto] lg:gap-60 lg:p-40">
      <div className="flex flex-col gap-24 lg:gap-40">
        <div className="flex items-baseline justify-between gap-20">
          <span className="font-mono text-caption-20 opacity-50">{item.index}</span>
          <span className="block lg:hidden">
            <ServiceFigure variant={i} />
          </span>
        </div>
        <Reveal>
          <h3 className="text-headline-20">{item.title}</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-520 text-body-10">{item.description}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {item.tags.map((t) => (
              <li key={t} className="flex items-center gap-8 font-mono text-caption-10 uppercase opacity-70">
                <span className="block size-4 bg-current" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="hidden self-center lg:block">
        <ServiceFigure variant={i} />
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="products" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:divide-x lg:divide-theme-fg/15">
        {/* Sticky intro panel */}
        <div className="relative z-1 flex flex-col gap-60 bg-mint p-20 text-black lg:sticky lg:top-[--header-h] lg:min-h-[calc(100svh-var(--header-h))] lg:p-40">
          <h2 className="uppercase">
            <LineReveal lines={SERVICES.headline} lineClassName="text-headline-40 leading-[0.85] whitespace-nowrap" />
          </h2>
          <div className="mt-auto">
            <Button href={SERVICES.cta.href} className="border-black text-black before:bg-black hover:!text-white">
              {SERVICES.cta.label}
            </Button>
          </div>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-theme-fg/15">
          {SERVICES.items.map((item, i) => (
            <ServiceItem key={item.index} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
