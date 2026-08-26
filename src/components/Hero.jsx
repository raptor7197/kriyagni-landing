import { HERO } from '../data/content'
import Button from './ui/Button'
import { LineReveal, Reveal, SOFT_EASE } from './ui/Reveal'
import DotsField from './DotsField'
import LogoMarquee from './LogoMarquee'

const HERO_DURATION = 1.4

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative isolate overflow-hidden border-b border-theme-fg/15">
        <DotsField className="pointer-events-none absolute inset-0 h-full w-full" density={90} />
        <div className="relative z-1 flex items-end justify-between gap-12 px-12 pb-16 pt-60 lg:px-20 lg:pt-100">
          <div className="flex items-baseline gap-8">
            <span className="text-headline-30 leading-none">{HERO.titleA}</span>
            <span className="text-headline-30 leading-none opacity-60">{HERO.titleB}</span>
          </div>
          <p className="hidden font-mono text-caption-10 uppercase opacity-50 sm:block">
            {HERO.note}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 bg-theme-fg text-theme-bg lg:grid-cols-2">
        <div className="flex flex-col p-12 lg:p-40">
          <h1 className="mt-auto uppercase">
            <LineReveal
              lines={HERO.stacked}
              lineClassName="text-headline-40 leading-[0.82] whitespace-nowrap"
              mount
              duration={HERO_DURATION}
              ease={SOFT_EASE}
            />
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-24 border-t border-theme-bg/20 p-12 lg:gap-32 lg:border-l lg:border-t-0 lg:p-40">
          <p className="max-w-520 text-body-30 text-theme-bg">{HERO.intro}</p>
          <div className="flex flex-col items-start justify-between gap-20 lg:flex-row lg:items-end">
            <Reveal delay={0.45} mount duration={HERO_DURATION} ease={SOFT_EASE}>
              <Button
                href={HERO.cta.href}
                variant="outline"
                className="border-theme-bg text-theme-bg before:bg-mint hover:!text-black"
              >
                {HERO.cta.label}
              </Button>
            </Reveal>
            <Reveal
              delay={0.55}
              className="max-w-320 text-body-10 opacity-70 sm:hidden"
              mount
              duration={HERO_DURATION}
              ease={SOFT_EASE}
            >
              {HERO.note}
            </Reveal>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 overflow-hidden border-t border-theme-fg/15 py-20">
        <p className="px-12 font-mono text-caption-10 uppercase opacity-50 lg:px-20">
          {HERO.marqueeLabel}
        </p>
        <LogoMarquee items={HERO.marqueeLogos} />
      </div>
    </section>
  )
}
