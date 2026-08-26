import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { FOOTER, NAV_LINKS } from '../data/content'
import { LineReveal, Reveal } from './ui/Reveal'

const ThreeCanvas = lazy(() => import('./ThreeCanvas'))

export default function Footer() {
  const canvasHostRef = useRef(null)
  const [showCanvas, setShowCanvas] = useState(false)

  useEffect(() => {
    const host = canvasHostRef.current
    if (!host || !('IntersectionObserver' in window)) {
      setShowCanvas(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowCanvas(true)
        observer.disconnect()
      }
    }, { rootMargin: '300px' })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="relative isolate border-t border-theme-fg/15">
      <div className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden py-80">
        <div ref={canvasHostRef} className="absolute inset-0 -z-10" aria-hidden="true">
          {showCanvas && (
            <Suspense fallback={null}>
              <ThreeCanvas className="absolute inset-0" />
            </Suspense>
          )}
        </div>
        <div className="relative z-1 flex flex-col items-center gap-32 px-20 text-center">
          <h2 className="uppercase">
            <LineReveal lines={FOOTER.stacked} lineClassName="text-headline-50 leading-[0.82] whitespace-nowrap" mount />
          </h2>
          <Reveal delay={0.15} mount>
            <p className="font-mono text-caption-20 uppercase opacity-60">{FOOTER.subline}</p>
          </Reveal>
          <Reveal delay={0.2} mount>
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

      {/* Link grid - 3 columns, alternating green/white */}
      <div className="grid grid-cols-2 border-t border-theme-fg/15 sm:grid-cols-3 sm:divide-x sm:divide-theme-fg/15">
        {/* Col 1 - Logo + nav links (green tint) */}
        <div className="bg-accent/10 p-24 text-center sm:text-left">
          <img src="/logo.png" alt="KriyagniAI" className="mx-auto mb-16 h-20 w-20 sm:mx-0" />
          <ul className="flex flex-col gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-mono text-caption-10 uppercase underline-offset-4 hover:underline hover:opacity-80">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2 - Site link + legal links (white) */}
        <div className="flex flex-col justify-center gap-12 p-24 text-center sm:text-left">
          <a
            href={FOOTER.site.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-caption-20 underline-offset-4 hover:underline"
          >
            {FOOTER.site.label}
          </a>
          <ul className="flex flex-col gap-8">
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

        {/* Col 3 - Copyright (green tint) */}
        <div className="col-span-2 flex items-center justify-center bg-accent/10 p-24 text-center font-mono text-caption-10 opacity-60 sm:col-span-1 sm:items-end sm:justify-start sm:text-left">
          <p>{FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
