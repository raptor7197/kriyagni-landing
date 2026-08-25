import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { HERO, NAV_LINKS } from '../data/content'
import { EASE } from './ui/Reveal'

function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out-expo hover:text-theme-bg"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-[calc(100%+1px)] bg-theme-fg transition-transform duration-600 ease-in-out-quart group-hover:translate-y-0"
      />
      <span className="relative">{children}</span>
    </a>
  )
}

export default function Header() {
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 grid h-[--header-h] grid-cols-[auto_1fr_auto] border-b border-theme-fg/15 bg-theme-bg">
        <a
          href="#top"
          aria-label="KriyagniAI home"
          className="flex h-full w-[--header-h] items-center justify-center border-r border-theme-fg/15 bg-theme-fg text-theme-bg"
        >
          <img src="/logo.png" alt="KriyagniAI" className="logo-invert-header h-30 w-30" />
        </a>

        <nav className="hidden items-center px-12 lg:flex">
          <ul className="flex flex-wrap gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-stretch divide-x divide-theme-fg/15 border-l border-theme-fg/15">
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden px-16 font-mono text-caption-20 uppercase transition-colors hover:bg-theme-fg hover:text-theme-bg sm:block"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <a
            href={HERO.cta.href}
            className="hidden items-center bg-theme-fg px-20 font-mono text-caption-20 uppercase text-theme-bg transition-colors hover:bg-mint hover:text-black lg:flex"
          >
            {HERO.cta.label}
          </a>
          <a
            href={HERO.cta.href}
            aria-label={HERO.cta.label}
            className="flex items-center bg-theme-fg px-12 font-mono text-caption-10 uppercase text-theme-bg transition-colors hover:bg-mint hover:text-black lg:hidden"
          >
            Try it
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="px-16 font-mono text-caption-20 uppercase transition-colors hover:bg-theme-fg hover:text-theme-bg lg:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col bg-theme-fg pt-[--header-h] text-theme-bg lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="flex flex-1 flex-col justify-center gap-8 p-20">
              {NAV_LINKS.map((l, i) => (
                <span key={l.href} className="block overflow-hidden">
                  <m.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="text-headline-30 uppercase"
                    >
                      {l.label}
                    </a>
                  </m.span>
                </span>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-theme-bg/20 p-20">
              <a
                href="/auth/sign-in"
                className="font-mono text-caption-20 uppercase underline"
              >
                Login
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                className="font-mono text-caption-20 uppercase"
              >
                Theme: {theme}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
