import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { FAQ } from '../data/content'
import Eyebrow from './ui/Eyebrow'
import { SOFT_EASE } from './ui/Reveal'

const pad = (n) => String(n).padStart(2, '0')

const transition = { duration: 0.7, ease: SOFT_EASE }

export default function FAQCarousel() {
  const items = FAQ.items
  const total = items.length
  const [[index, direction], setIndex] = useState([0, 0])
  const current = items[index]

  const go = (nextIndex) => setIndex(([i]) => [nextIndex, nextIndex >= i ? 1 : -1])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex(([i]) => [(i + 1) % total, 1])
    }, 5000)

    return () => window.clearInterval(timer)
  }, [total])

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
        <div className="flex gap-8 lg:order-3 lg:mt-auto" role="tablist" aria-label="FAQ questions">
          {items.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Show question ${itemIndex + 1}: ${item.name}`}
              onClick={() => go(itemIndex)}
              className={`size-8 rounded-full border border-theme-fg transition-colors duration-300 ${
                itemIndex === index ? 'bg-theme-fg' : 'bg-transparent hover:bg-theme-fg/30'
              }`}
            />
          ))}
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
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: SOFT_EASE }}
              className="flex aspect-square w-100 items-center justify-center bg-mint font-mono text-headline-20 uppercase text-black"
            >
              ?
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: SOFT_EASE }}
              className="flex flex-col gap-8"
            >
              <p className="text-body-10">{current.name}</p>
              <p className="font-mono text-caption-10 uppercase opacity-50">{current.role}</p>
            </m.div>
            <m.dl
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.36, ease: SOFT_EASE }}
              className="mt-auto flex flex-col gap-12 border-t border-theme-fg/15 pt-16"
            >
              <div className="flex flex-col gap-4">
                <dt className="font-mono text-caption-10 uppercase opacity-50">{current.position}</dt>
                <dd className="text-body-10">{current.company}</dd>
              </div>
            </m.dl>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
