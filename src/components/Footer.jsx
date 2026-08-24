import { useEffect, useState } from 'react'
import { FOOTER, NAV_LINKS } from '../data/content'
import ThreeCanvas from './ThreeCanvas'
import { LineReveal, Reveal } from './ui/Reveal'

function CityClock({ label, timeZone }) {
  const [now, setNow] = useState('--:-- --')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone,
    })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000 * 15)
    return () => clearInterval(id)
  }, [timeZone])

  return (
    <div className="flex items-baseline gap-8 font-mono text-caption-20 tabular-nums">
      <span className="opacity-50">{label}</span>
      <span>—</span>
      <span>{now}</span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-theme-fg/15">
      {/* Giant CTA over the WebGL canvas */}
      <div className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center overflow-clip py-60">
        <ThreeCanvas className="absolute inset-0" />
        <div className="relative z-1 flex flex-col items-center gap-32 px-20 text-center">
          <h2 className="uppercase">
            <LineReveal lines={FOOTER.stacked} lineClassName="text-headline-50 leading-[0.82] whitespace-nowrap" />
          </h2>
          <Reveal delay={0.15}>
            <p className="font-mono text-caption-20 uppercase opacity-60">{FOOTER.subline}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={FOOTER.explore.href}
              aria-label={FOOTER.explore.label}
              className="group flex size-80 items-center justify-center rounded-full border border-theme-fg transition-colors duration-600 ease-out-expo hover:bg-theme-fg hover:text-theme-bg lg:size-100"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-600 ease-out-expo group-hover:rotate-45">
                <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Link grid */}
      <div className="grid grid-cols-1 divide-y divide-theme-fg/15 border-t border-theme-fg/15 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        <div className="flex items-center gap-16 p-20">
          <img src="/logo.png" alt="KriyagniAI" className="logo-invert-footer h-30 w-30 shrink-0" />
          <ul className="flex flex-wrap gap-x-16 gap-y-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-mono text-caption-10 uppercase underline-offset-4 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-8 p-20">
          <CityClock label="NYC time" timeZone="America/New_York" />
          <CityClock label="LA time" timeZone="America/Los_Angeles" />
        </div>

        <div className="flex flex-col justify-center gap-8 p-20">
          <a
            href={FOOTER.site.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-caption-20 underline-offset-4 hover:underline"
          >
            {FOOTER.site.label}
          </a>
          <ul className="flex gap-16">
            {FOOTER.links.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="font-mono text-caption-10 uppercase opacity-60 underline-offset-4 hover:underline hover:opacity-100"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-12 p-20 font-mono text-caption-10 opacity-60 lg:flex-col lg:items-start lg:justify-center lg:gap-8">
          <p>{FOOTER.copyright}</p>
          <a href={FOOTER.links[0].href} className="underline-offset-4 hover:underline">
            {FOOTER.links[0].label}
          </a>
        </div>
      </div>
    </footer>
  )
}
