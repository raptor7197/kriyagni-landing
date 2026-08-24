import { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Clients from './components/Clients'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
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
    <>
      <Header />
      <div className="min-h-[--header-h]" aria-hidden="true" />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Clients />
        <Testimonials />
        <Team />
      </main>
      <Footer />
    </>
  )
}
