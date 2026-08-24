/**
 * Mono uppercase button with a directional slide-fill hover,
 * matching the reference site's interaction language.
 */
export default function Button({ href, children, variant = 'outline', className = '', ...props }) {
  const base =
    'group relative inline-flex w-fit items-center justify-center overflow-hidden px-20 py-12 font-mono text-caption-20 uppercase transition-colors duration-600 ease-out-expo'
  const variants = {
    // bordered, fills with fg on hover
    outline:
      'border border-theme-fg text-theme-fg before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-theme-fg before:transition-transform before:duration-600 before:ease-in-out-quart hover:text-theme-bg hover:before:scale-x-100',
    // pre-filled, inverts to transparent on hover
    solid:
      'bg-theme-fg text-theme-bg before:absolute before:inset-0 before:origin-right before:scale-x-0 before:bg-mint before:transition-transform before:duration-600 before:ease-in-out-quart hover:text-black hover:before:scale-x-100',
  }

  const Tag = href ? 'a' : 'button'

  return (
    <Tag href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-1">{children}</span>
    </Tag>
  )
}
