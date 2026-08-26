import { m } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const SOFT_EASE = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, className = '', y = 24, mount = false, duration = 0.9, ease = EASE }) {
  const animateProps = mount
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-5% 0px' } }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      {...animateProps}
      transition={{ duration, delay, ease }}
    >
      {children}
    </m.div>
  )
}

export function LineReveal({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.08,
  mount = false,
  duration = 1,
  ease = EASE,
}) {
  return (
    <span className={`flex flex-col ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <m.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%' }}
            {...(mount
              ? { animate: { y: '0%' } }
              : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-5% 0px' } })}
            transition={{ duration, delay: delay + i * stagger, ease }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  )
}

export { EASE, SOFT_EASE }