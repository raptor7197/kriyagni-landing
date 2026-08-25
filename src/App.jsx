import { useEffect } from 'react'
import Lenis from 'lenis'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Mandana from './components/Mandana'
import Personas from './components/Personas'
import Team from './components/Team'
import Services from './components/Services'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      anchors: true, // smooth-scrolls in-page #anchors
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <Header />
        <div className="min-h-[--header-h]" aria-hidden="true" />
        <main>
          <Hero />
          <Stats />
          <Mandana />
          <Personas />
          <Team />
          <Services />
        </main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  )
}