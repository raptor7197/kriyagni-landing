import { useEffect, useRef } from 'react'

/**
 * Lightweight dot-shader field: a tight cluster of points that drift slowly and
 * react to the pointer. Renders with a 2D canvas (no WebGL dep) so it stays
 * cheap on the hero - the brand-mark row only.
 *
 * Color follows the active theme via CSS custom properties.
 */
export default function DotsField({ className = '', density = 70 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Read theme-aware color from a CSS var resolved against the page
    const readColor = () => {
      const fg = getComputedStyle(document.documentElement)
        .getPropertyValue('--theme-fg')
        .trim()
      // --theme-fg is "r g b" - fall back to fg token if absent
      const [r, g, b] = fg
        .split(/\s+/)
        .map((n) => Number(n))
        .filter((n) => Number.isFinite(n))
      return r !== undefined && g !== undefined && b !== undefined
        ? `rgba(${r}, ${g}, ${b}, 0.55)`
        : 'rgba(35, 35, 35, 0.55)'
    }
    let color = readColor()
    const observer = new MutationObserver(() => {
      color = readColor()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const dots = []
    let raf
    let width = 0
    let height = 0
    let pointer = { x: 0.5, y: 0.5, active: false, influence: 0 }

    const seed = () => {
      dots.length = 0
      const w = width
      const h = height
      const count = Math.round((w * h) / (10000 / density))
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.4,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left) / rect.width
      pointer.y = (e.clientY - rect.top) / rect.height
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }
    window.addEventListener('pointermove', onPointer)
    canvas.addEventListener('pointerleave', onLeave)

    const clock = { t: 0 }
    const render = () => {
      clock.t += 1 / 60
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        // Smooth, fluid drift — sinusoidal wander on top of base velocity.
        // No hard pointer magnet; cursor only nudges slightly when nearby.
        d.x += d.vx + Math.sin(clock.t * 0.6 + d.phase) * 0.18
        d.y += d.vy + Math.cos(clock.t * 0.5 + d.phase * 1.3) * 0.18
        if (d.x < -8) d.x = width + 8
        else if (d.x > width + 8) d.x = -8
        if (d.y < -8) d.y = height + 8
        else if (d.y > height + 8) d.y = -8

        // Soft cursor nudge — very loose, no snap, no attraction.
        // Influence fades in/out so entering/leaving the area doesn't pop.
        pointer.influence += ((pointer.active ? 1 : 0) - pointer.influence) * 0.04
        if (pointer.influence > 0.01) {
          const px = pointer.x * width
          const py = pointer.y * height
          const dx = px - d.x
          const dy = py - d.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 320 * 320) {
            const falloff = (1 - Math.sqrt(dist2) / 320) * pointer.influence
            d.x += dx * 0.0006 * falloff
            d.y += dy * 0.0006 * falloff
          }
        }

        const twinkle = 0.55 + Math.sin(clock.t * 1.6 + d.phase) * 0.35
        ctx.globalAlpha = twinkle
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      observer.disconnect()
      window.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
