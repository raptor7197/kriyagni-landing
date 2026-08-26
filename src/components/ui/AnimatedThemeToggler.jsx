import { flushSync } from 'react-dom'
import { useCallback, useEffect, useRef } from 'react'

const DEFAULT_DURATION = 400

function collapsedPolygon(point, count) {
  return `polygon(${Array.from({ length: count }, () => point).join(', ')})`
}

function getClipPaths(variant, cx, cy, radius, width, height) {
  const x = (value) => `${(value / width) * 100}%`
  const y = (value) => `${(value / height) * 100}%`
  const point = (px, py) => `${x(px)} ${y(py)}`
  const circleRadius = `${(radius / (Math.hypot(width, height) / Math.SQRT2)) * 100}%`

  if (variant === 'circle') {
    return [`circle(0% at ${point(cx, cy)})`, `circle(${circleRadius} at ${point(cx, cy)})`]
  }

  if (variant === 'square' || variant === 'rectangle') {
    const halfWidth = Math.max(cx, width - cx)
    const halfHeight = Math.max(cy, height - cy)
    const side = variant === 'square' ? Math.max(halfWidth, halfHeight) * 1.05 : halfWidth
    const end = [
      point(cx - side, cy - (variant === 'square' ? side : halfHeight)),
      point(cx + side, cy - (variant === 'square' ? side : halfHeight)),
      point(cx + side, cy + (variant === 'square' ? side : halfHeight)),
      point(cx - side, cy + (variant === 'square' ? side : halfHeight)),
    ].join(', ')
    return [collapsedPolygon(point(cx, cy), 4), `polygon(${end})`]
  }

  if (variant === 'triangle') {
    const size = radius * 2.2
    const dx = (Math.sqrt(3) / 2) * size
    const end = [point(cx, cy - size), point(cx + dx, cy + size / 2), point(cx - dx, cy + size / 2)].join(', ')
    return [collapsedPolygon(point(cx, cy), 3), `polygon(${end})`]
  }

  const sides = variant === 'hexagon' ? 6 : 4
  const outerRadius = radius * Math.SQRT2
  const vertices = Array.from({ length: sides }, (_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / sides
    return point(cx + outerRadius * Math.cos(angle), cy + outerRadius * Math.sin(angle))
  }).join(', ')
  return [collapsedPolygon(point(cx, cy), sides), `polygon(${vertices})`]
}

function Icon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M20 15.3A8 8 0 0 1 8.7 4 8 8 0 1 0 20 15.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function AnimatedThemeToggler({
  className = '',
  duration = DEFAULT_DURATION,
  variant = 'circle',
  fromCenter = false,
  theme,
  onThemeChange,
  ...props
}) {
  const buttonRef = useRef(null)
  const animationRef = useRef(null)
  const transitioningRef = useRef(false)
  const isDark = theme === 'dark'

  const cancelAnimation = useCallback(() => {
    animationRef.current?.cancel()
    animationRef.current = null
  }, [])

  useEffect(() => () => cancelAnimation(), [cancelAnimation])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    const root = document.documentElement
    if (!button || transitioningRef.current || root.dataset.magicuiThemeVt === 'active') return

    const width = window.innerWidth
    const height = window.innerHeight
    const bounds = button.getBoundingClientRect()
    const cx = fromCenter ? width / 2 : bounds.left + bounds.width / 2
    const cy = fromCenter ? height / 2 : bounds.top + bounds.height / 2
    const radius = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy))
    const nextTheme = isDark ? 'light' : 'dark'

    const applyTheme = () => {
      document.documentElement.dataset.theme = nextTheme
      flushSync(() => onThemeChange?.(nextTheme))
    }

    if (typeof document.startViewTransition !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme()
      return
    }

    const [clipFrom, clipTo] = getClipPaths(variant, cx, cy, radius, width, height)
    root.dataset.magicuiThemeVt = 'active'
    root.style.setProperty('--magicui-theme-toggle-vt-duration', `${duration}ms`)
    root.style.setProperty('--magicui-theme-vt-clip-from', clipFrom)
    transitioningRef.current = true

    const cleanup = () => {
      transitioningRef.current = false
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty('--magicui-theme-toggle-vt-duration')
      root.style.removeProperty('--magicui-theme-vt-clip-from')
      cancelAnimation()
    }

    const transition = document.startViewTransition(applyTheme)
    transition.finished.finally(cleanup).catch(() => {})
    transition.ready.then(() => {
      animationRef.current = root.animate({ clipPath: [clipFrom, clipTo] }, {
        duration,
        easing: 'ease-in-out',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      })
    }).catch(cleanup)
  }, [cancelAnimation, duration, fromCenter, isDark, onThemeChange, variant])

  const nextTheme = isDark ? 'light' : 'dark'
  return (
    <button
      {...props}
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={`inline-flex size-60 items-center justify-center transition-colors hover:bg-theme-fg hover:text-theme-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-fg ${className}`}
    >
      <Icon dark={isDark} />
    </button>
  )
}
