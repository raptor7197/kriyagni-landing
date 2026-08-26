import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Ambient particle field + slowly rotating wireframe sphere.
 * Vanilla three.js (no R3F) to stay on React 18 without peer-dep friction.
 * Colors follow the active theme via CSS custom properties.
 */
export default function ThreeCanvas({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 6

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 767px)').matches
    const renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5))
    mount.appendChild(renderer.domElement)

    // Wireframe icosphere
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.1, 2),
      new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.35 }),
    )
    scene.add(sphere)

    // Particle shell
    const COUNT = compact ? 420 : 900
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 2.6 + Math.random() * 0.9
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const points = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ size: 0.02, transparent: true, opacity: 0.8 }),
    )
    scene.add(points)

    // Theme-aware colors
    const applyTheme = () => {
      const dark = document.documentElement.dataset.theme === 'dark'
      const color = new THREE.Color(dark ? '#ffffff' : '#232323')
      sphere.material.color = color
      points.material.color = color
    }
    applyTheme()
    const observer = new MutationObserver(applyTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Pointer parallax
    let targetX = 0
    let targetY = 0
    const onPointer = (e) => {
      const { innerWidth, innerHeight } = window
      targetX = (e.clientX / innerWidth - 0.5) * 0.6
      targetY = (e.clientY / innerHeight - 0.5) * 0.6
    }
    window.addEventListener('pointermove', onPointer)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const clock = new THREE.Clock()
    let raf
    const animate = () => {
      const t = clock.getElapsedTime()
      sphere.rotation.y = reducedMotion ? 0 : t * 0.12
      sphere.rotation.x = reducedMotion ? 0 : t * 0.05 + targetY * 0.4
      points.rotation.y = reducedMotion ? 0 : -t * 0.05
      camera.position.x += (targetX - camera.position.x) * 0.04
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      if (!reducedMotion) raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      observer.disconnect()
      window.removeEventListener('pointermove', onPointer)
      sphere.geometry.dispose()
      sphere.material.dispose()
      particleGeo.dispose()
      points.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
