import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { ABOUT } from '../data/content'
import Eyebrow from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'

const ROLL_MS = 1400

/** Slot-machine digit roller: each digit column spins to its value. */
function RollingDigit({ target, active, index }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline">
      <span
        className="absolute left-0 top-0 flex flex-col transition-transform ease-in-out-quart"
        style={{
          transform: active ? `translateY(-${target}em)` : 'translateY(0)',
          transitionDuration: `${ROLL_MS + index * 120}ms`,
        }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="flex h-[1em] items-center leading-none">
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

function RollingValue({ value, active }) {
  let digitIndex = 0
  return (
    <span className="inline-flex items-baseline" aria-label={value}>
      {value.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <RollingDigit key={i} target={Number(ch)} active={active} index={digitIndex++} />
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  )
}

const TONES = {
  black: 'bg-black text-white',
  grey: 'bg-mint text-black',
  white: 'bg-theme-bg text-theme-fg',
}

function StatCell({ value, label, tone }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setActive(true), 150)
      return () => clearTimeout(t)
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className={`flex min-h-200 flex-col justify-between gap-32 p-20 ${TONES[tone]}`}
    >
      <p className="font-mono text-caption-10 uppercase opacity-70">{label}</p>
      <p className="text-digit-20 w-fit">
        <RollingValue value={value} active={active} />
      </p>
    </div>
  )
}

export default function Stats() {
  return (
    <section id="why" className="scroll-mt-[--header-h] border-t border-theme-fg/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-theme-fg/15">
        <div className="px-12 py-20 lg:px-20">
          <Reveal>
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          </Reveal>
        </div>
        <div className="flex flex-col gap-[1em] px-12 pb-60 pt-20 text-body-30 lg:px-20 lg:pt-120">
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-theme-fg/15 border-t border-theme-fg/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        {ABOUT.stats.map((s) => (
          <StatCell key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
