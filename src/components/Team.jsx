import { TEAM } from '../data/content'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { LineReveal, Reveal } from './ui/Reveal'

function TeamCard({ member }) {
  return (
    <article className="group flex w-[70vw] shrink-0 snap-start flex-col sm:w-[calc((100%-1px)/2)] lg:w-[calc((100%-3px)/4)]">
      {/* Portrait placeholder — CMS asset drops in here */}
      <div className="relative isolate aspect-[0.8] overflow-hidden bg-mint">
        <div className="absolute inset-0 flex items-center justify-center font-mono text-headline-30 uppercase text-black/40 transition-transform duration-800 ease-out-expo group-hover:scale-105">
          {member.first[0]}
          {member.last[0]}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-theme-fg/15" />
      </div>
      <button
        type="button"
        className="relative isolate overflow-hidden text-left transition-colors duration-600 ease-out-expo before:pointer-events-none before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-theme-fg before:transition-transform before:duration-600 before:ease-in-out-quart hover:text-theme-bg hover:before:scale-x-100"
      >
        <span className="relative z-1 flex flex-col gap-8 p-20">
          <span className="text-headline-10 leading-[0.95]">
            {member.first}
            <br />
            {member.last}
          </span>
          <span className="font-mono text-caption-10 uppercase opacity-50">{member.role}</span>
        </span>
      </button>
    </article>
  )
}

export default function Team() {
  return (
    <section id="team" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
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

      {/* Card rail */}
      <div className="flex snap-x snap-mandatory divide-x divide-theme-fg/15 overflow-x-auto border-t border-theme-fg/15">
        {TEAM.members.map((m) => (
          <TeamCard key={m.first + m.last} member={m} />
        ))}
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
