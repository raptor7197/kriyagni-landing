/**
 * Infinite wordmark marquee. Text wordmarks act as logo placeholders
 * until real client marks ship from the CMS.
 */
export default function LogoMarquee({ items }) {
  const row = [...items, ...items]

  return (
    <div className="group relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-80 pr-80 group-hover:[animation-play-state:paused]">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap text-headline-20 uppercase leading-none text-theme-fg/60 transition-colors hover:text-theme-fg"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
