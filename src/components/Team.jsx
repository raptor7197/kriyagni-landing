import { TEAM } from '../data/content'
import BuildPipeline from './BuildPipeline'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { LineReveal, Reveal } from './ui/Reveal'

export default function Team() {
  return (
    <section id="about" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
      {/* Heading rows */}
      <div className="grid grid-cols-1 divide-y divide-theme-fg/15 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="p-20">
          <h2 className="text-headline-50 lg:sticky lg:top-[--header-h]">
            <LineReveal lines={[TEAM.headline]} />
          </h2>
        </div>
        <div className="grid grid-rows-2 divide-y divide-theme-fg/15">
          <div className="flex items-end p-20">
            <p className="text-headline-10">{TEAM.subline}</p>
          </div>
          <div className="flex flex-col gap-24 p-20">
            <Reveal>
              <Eyebrow>{TEAM.introEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-520 text-body-10">{TEAM.intro}</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Interactive Research Pipeline Graphic */}
      <div className="border-t border-theme-fg/15 p-20 lg:p-40">
        <Reveal>
          <BuildPipeline />
        </Reveal>
      </div>

      {/* CTA row */}
      <div className="grid grid-cols-1 divide-y divide-theme-fg/15 border-t border-theme-fg/15 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="p-20">
          <p className="whitespace-pre-line text-headline-10">
            {'Raise your\ntrajectory'}
          </p>
        </div>
        <div className="flex items-end justify-end p-20">
          <Button href={TEAM.cta.href} variant="solid">
            {TEAM.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
