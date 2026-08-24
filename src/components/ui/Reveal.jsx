import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Fade + rise into view. If mount=true, animates on load without waiting for scroll intersection. */
export function Reveal({ children, delay = 0, className = '', y = 24, mount = false }) {
  if (mount) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Masked line-slide reveal. If mount=true, animates on initial mount immediately. */
export function LineReveal({ lines, className = '', lineClassName = '', delay = 0, stagger = 0.08, mount = false }) {
  return (
    <span className={`flex flex-col ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%' }}
            {...(mount
              ? { animate: { y: '0%' } }
              : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-5% 0px' } })}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export { EASE }
