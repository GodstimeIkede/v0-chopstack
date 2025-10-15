export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* "Chopst" text - tight spacing */}
      <span className="text-3xl font-bold text-foreground font-sans tracking-tight">Chopst</span>

      {/* Shopping cart with leaves bulging out - representing a full cart */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 48"
        className="h-9 w-9 -mx-1"
        role="img"
        aria-label="Shopping cart with fresh produce"
      >
        {/* Shopping cart body */}
        <path
          d="M 8 18 L 10 18 L 13 36 L 32 36 L 35 20 L 11 20"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cart wheels */}
        <circle cx="16" cy="42" r="2.5" fill="#10b981" />
        <circle cx="29" cy="42" r="2.5" fill="#10b981" />

        {/* Leaves bulging out of the cart - half inside, half outside */}
        {/* Left leaf */}
        <path d="M 16 20 Q 14 16 14 12 Q 14 8 16 6 Q 18 8 18 12 Q 18 16 16 20 Z" fill="#10b981" opacity="0.95" />
        <line x1="16" y1="6" x2="16" y2="20" stroke="#059669" strokeWidth="0.8" />

        {/* Center leaf - taller, sticking out more */}
        <path d="M 22 22 Q 20 17 20 11 Q 20 6 22 4 Q 24 6 24 11 Q 24 17 22 22 Z" fill="#10b981" />
        <line x1="22" y1="4" x2="22" y2="22" stroke="#059669" strokeWidth="0.8" />

        {/* Right leaf */}
        <path d="M 28 20 Q 26 16 26 12 Q 26 8 28 6 Q 30 8 30 12 Q 30 16 28 20 Z" fill="#10b981" opacity="0.95" />
        <line x1="28" y1="6" x2="28" y2="20" stroke="#059669" strokeWidth="0.8" />
      </svg>

      {/* "ck" text - tight spacing */}
      <span className="text-3xl font-bold text-foreground font-sans tracking-tight">ck</span>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 48"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Chopstack icon"
    >
      {/* Shopping cart */}
      <path
        d="M 8 18 L 10 18 L 13 36 L 32 36 L 35 20 L 11 20"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="42" r="2.5" fill="#10b981" />
      <circle cx="29" cy="42" r="2.5" fill="#10b981" />

      {/* Leaves bulging out */}
      <path d="M 16 20 Q 14 16 14 12 Q 14 8 16 6 Q 18 8 18 12 Q 18 16 16 20 Z" fill="#10b981" opacity="0.95" />
      <line x1="16" y1="6" x2="16" y2="20" stroke="#059669" strokeWidth="0.8" />

      <path d="M 22 22 Q 20 17 20 11 Q 20 6 22 4 Q 24 6 24 11 Q 24 17 22 22 Z" fill="#10b981" />
      <line x1="22" y1="4" x2="22" y2="22" stroke="#059669" strokeWidth="0.8" />

      <path d="M 28 20 Q 26 16 26 12 Q 26 8 28 6 Q 30 8 30 12 Q 30 16 28 20 Z" fill="#10b981" opacity="0.95" />
      <line x1="28" y1="6" x2="28" y2="20" stroke="#059669" strokeWidth="0.8" />
    </svg>
  )
}
