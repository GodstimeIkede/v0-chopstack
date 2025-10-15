export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      {/* "Chopst" text */}
      <span className="text-3xl font-bold text-foreground font-sans">Chopst</span>

      {/* Shopping cart with leaf icon (replaces "a") */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-8 w-8 -mx-0.5"
        role="img"
        aria-label="Shopping cart with leaf"
      >
        {/* Shopping cart */}
        <g stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Cart basket */}
          <path d="M 12 12 L 16 28 L 36 28 L 40 12 Z" />
          {/* Cart handle */}
          <path d="M 8 8 L 12 12" />
        </g>

        {/* Cart wheels */}
        <circle cx="18" cy="34" r="2.5" fill="#10b981" />
        <circle cx="34" cy="34" r="2.5" fill="#10b981" />

        {/* Leaf inside cart */}
        <g fill="#10b981">
          <path d="M 24 16 Q 28 18 28 22 Q 28 24 26 24 Q 24 24 24 22 Z" />
          <path d="M 24 16 Q 20 18 20 22 Q 20 24 22 24 Q 24 24 24 22 Z" />
          <line x1="24" y1="16" x2="24" y2="24" stroke="#10b981" strokeWidth="1" />
        </g>
      </svg>

      {/* "ck" text */}
      <span className="text-3xl font-bold text-foreground font-sans">ck</span>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Chopstack icon"
    >
      {/* Shopping cart */}
      <g stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Cart basket */}
        <path d="M 12 12 L 16 28 L 36 28 L 40 12 Z" />
        {/* Cart handle */}
        <path d="M 8 8 L 12 12" />
      </g>

      {/* Cart wheels */}
      <circle cx="18" cy="34" r="2.5" fill="#10b981" />
      <circle cx="34" cy="34" r="2.5" fill="#10b981" />

      {/* Leaf inside cart */}
      <g fill="#10b981">
        <path d="M 24 16 Q 28 18 28 22 Q 28 24 26 24 Q 24 24 24 22 Z" />
        <path d="M 24 16 Q 20 18 20 22 Q 20 24 22 24 Q 24 24 24 22 Z" />
        <line x1="24" y1="16" x2="24" y2="24" stroke="#10b981" strokeWidth="1" />
      </g>
    </svg>
  )
}
