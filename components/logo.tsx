export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      {/* "Chopst" text */}
      <span className="text-3xl font-bold text-foreground font-sans">Chopst</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        className="h-7 w-7 mx-0.5"
        role="img"
        aria-label="Shopping cart with leaf"
      >
        {/* Shopping cart body */}
        <path
          d="M 8 8 L 10 8 L 14 24 L 32 24 L 35 12 L 12 12"
          stroke="#10b981"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cart wheels */}
        <circle cx="16" cy="30" r="2" fill="#10b981" />
        <circle cx="28" cy="30" r="2" fill="#10b981" />

        {/* Leaf - simple and clean */}
        <path d="M 22 14 Q 25 15 25 18 Q 25 19 23.5 19 Q 22 19 22 17.5 L 22 14 Z" fill="#10b981" />
        <path d="M 22 14 Q 19 15 19 18 Q 19 19 20.5 19 Q 22 19 22 17.5 L 22 14 Z" fill="#10b981" />
        <line x1="22" y1="14" x2="22" y2="19" stroke="#10b981" strokeWidth="1.2" />
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
      viewBox="0 0 40 40"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Chopstack icon"
    >
      <path
        d="M 8 8 L 10 8 L 14 24 L 32 24 L 35 12 L 12 12"
        stroke="#10b981"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="16" cy="30" r="2" fill="#10b981" />
      <circle cx="28" cy="30" r="2" fill="#10b981" />

      <path d="M 22 14 Q 25 15 25 18 Q 25 19 23.5 19 Q 22 19 22 17.5 L 22 14 Z" fill="#10b981" />
      <path d="M 22 14 Q 19 15 19 18 Q 19 19 20.5 19 Q 22 19 22 17.5 L 22 14 Z" fill="#10b981" />
      <line x1="22" y1="14" x2="22" y2="19" stroke="#10b981" strokeWidth="1.2" />
    </svg>
  )
}
