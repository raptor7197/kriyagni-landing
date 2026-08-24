import { HERO } from '../data/content'
import Button from './ui/Button'
import { LineReveal, Reveal } from './ui/Reveal'
import LogoMarquee from './LogoMarquee'

export default function Hero() {
  return (
    <section id="top" className="relative">
      {/* Staggered display grid */}
      <div className="grid min-h-[calc(100svh-var(--header-h))] grid-rows-2">
        <div className="grid grid-cols-2 divide-x divide-theme-fg/15">
          <div className="flex items-end px-12 pb-20 pt-80 lg:px-20 lg:pt-188">
            <h1 className="text-headline-50">
              <LineReveal lines={[HERO.titleA]} mount />
            </h1>
          </div>
          <div />
        </div>
        <div className="grid grid-cols-2 divide-x divide-theme-fg/15">
          <div />
          <div className="flex items-end bg-mint px-12 pb-20 pt-80 text-black lg:px-20 lg:pt-188">
            <p className="text-headline-50">
              <LineReveal lines={[HERO.titleB]} delay={0.15} mount />
            </p>
          </div>
        </div>
      </div>

      {/* placing winners. */}
      <div className="grid min-h-[65svh] grid-cols-1 bg-theme-fg text-theme-bg lg:grid-cols-2">
        <div className="flex flex-col p-20">
          <h2 className="mt-auto uppercase">
            <LineReveal
              lines={HERO.stacked}
              lineClassName="text-headline-50 leading-[0.82] whitespace-nowrap"
              mount
            />
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-32 p-20 lg:border-l lg:border-theme-bg/20">
          <Reveal className="max-w-520 text-body-30" delay={0.1} mount>
            {HERO.intro}
          </Reveal>
          <div className="flex flex-col items-start justify-between gap-20 lg:flex-row lg:items-end">
            <Reveal delay={0.2} mount>
              <Button href={HERO.cta.href} variant="outline" className="border-theme-bg text-theme-bg before:bg-mint hover:!text-black">
                {HERO.cta.label}
              </Button>
            </Reveal>
            <Reveal delay={0.3} className="max-w-320 text-body-10 opacity-70" mount>
              {HERO.note}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Recent hires marquee */}
      <div className="flex flex-col gap-16 overflow-hidden border-t border-theme-fg/15 py-20">
        <p className="px-12 font-mono text-caption-10 uppercase opacity-50 lg:px-20">
          {HERO.marqueeLabel}
        </p>
        <LogoMarquee items={HERO.marqueeLogos} />
      </div>
    </section>
  )
}
