/** Stylized "A" monogram with a coin-flip idle animation. */
export default function LogoMark({ className = 'w-40' }) {
  return (
    <span className="block [perspective:1000px]">
      <span className="block origin-center animate-coin-flip">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 44"
          fill="none"
          className={`h-auto ${className}`}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M20 0l4.6 11.4L29 23.5l3.2 8.9L36 44h-6.8l-2.6-7.4H13.4L10.8 44H4l3.8-11.6L11 23.5 15.4 11.4 20 0zm0 19.2l-4.2 11h8.4l-4.2-11z"
          />
        </svg>
      </span>
    </span>
  )
}
