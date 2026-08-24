/** Section eyebrow: solid square + mono uppercase label. */
export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-12 ${className}`}>
      <span className="block size-8 shrink-0 bg-black" aria-hidden="true" />
      <p className="font-mono text-caption-10 uppercase">{children}</p>
    </div>
  )
}
