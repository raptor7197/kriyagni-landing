import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { FAQ } from '../data/content'
import Eyebrow from './ui/Eyebrow'
import { SOFT_EASE } from './ui/Reveal'

const pad = (n) => String(n).padStart(2, '0')

const transition = { duration: 0.7, ease: SOFT_EASE }

function Arrow({ direction }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === 'prev' ? 'M15 8H1M1 8l6-6M1 8l6 6' : 'M1 8h14M15 8L9 2M15 8l-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function FAQCarousel() {
  const items = FAQ.items
  const total = items.length
  const [[index, direction], setIndex] = useState([0, 0])
  const current = items[index]

  const go = (dir) => setIndex(([i]) => [(i + dir + total) % total, dir])

  const slide = {
    enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir >= 0 ? -48 : 48 }),
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
      {/* Rail: eyebrow, counter, controls */}
      <div className="flex flex-row items-center justify-between gap-20 border-b border-theme-fg/15 p-20 lg:flex-col lg:items-start lg:border-b-0">
        <Eyebrow>{FAQ.eyebrow}</Eyebrow>
        <p className="font-mono text-caption-10 tabular-nums opacity-50 lg:order-2">
          {pad(index + 1)}-{pad(total)}
        </p>
        <div className="flex gap-8 lg:order-3 lg:mt-auto">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous question"
            className="flex size-40 items-center justify-center border border-theme-fg transition-colors hover:bg-theme-fg hover:text-theme-bg"
          >
            <Arrow direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next question"
            className="flex size-40 items-center justify-center border border-theme-fg transition-colors hover:bg-theme-fg hover:text-theme-bg"
          >
            <Arrow direction="next" />
          </button>
        </div>
      </div>

      {/* Answer */}
      <div className="relative flex flex-col gap-[1em] overflow-hidden border-t border-theme-fg/15 p-20 text-headline-10 lg:min-h-0 lg:border-l lg:border-t-0 lg:p-40">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex flex-col gap-[1em]"
          >
            {current.quote.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Question card */}
      <div className="flex flex-col justify-between gap-24 border-t border-theme-fg/15 p-20 lg:border-l lg:border-t-0">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex flex-col gap-24"
          >
            <div className="flex aspect-square w-100 items-center justify-center bg-mint font-mono text-headline-20 uppercase text-black">
              ?
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-body-10">{current.name}</p>
              <p className="font-mono text-caption-10 uppercase opacity-50">{current.role}</p>
            </div>
            <dl className="mt-auto flex flex-col gap-12 border-t border-theme-fg/15 pt-16">
              <div className="flex flex-col gap-4">
                <dt className="font-mono text-caption-10 uppercase opacity-50">{current.position}</dt>
                <dd className="text-body-10">{current.company}</dd>
              </div>
            </dl>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
