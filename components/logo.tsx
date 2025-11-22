export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-3xl font-bold text-foreground font-sans tracking-tight">Chopst</span>

      {/* Shopping cart with prominent leaf sticking out above */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-8 w-8 -mx-0.5"
        role="img"
        aria-label="Shopping cart with leaf"
      >
        {/* Cart basket */}
        <path
          d="M 6 10 L 8 10 L 10 22 L 26 22 L 28 12 L 9 12"
          stroke="#2ECC71"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cart handle */}
        <path d="M 8 10 L 10 6" stroke="#2ECC71" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Cart wheels */}
        <circle cx="13" cy="26" r="1.5" fill="#2ECC71" />
        <circle cx="23" cy="26" r="1.5" fill="#2ECC71" />

        {/* Large leaf shape that clearly extends above the cart */}
        <path d="M 20 1 Q 18 8 20 16 Q 22 8 20 1 Z" fill="#2ECC71" stroke="#1a9954" strokeWidth="0.8" />
        {/* Thick center vein for leaf definition */}
        <line x1="20" y1="1" x2="20" y2="16" stroke="#1a9954" strokeWidth="2" />
        {/* Side veins for more detail and leaf recognition */}
        <line x1="20" y1="4" x2="18" y2="7" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
        <line x1="20" y1="4" x2="22" y2="7" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
        <line x1="20" y1="10" x2="18" y2="12" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
        <line x1="20" y1="10" x2="22" y2="12" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
      </svg>

      <span className="text-3xl font-bold text-foreground font-sans tracking-tight">ck</span>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Chopstack icon"
    >
      {/* Cart basket */}
      <path
        d="M 6 10 L 8 10 L 10 22 L 26 22 L 28 12 L 9 12"
        stroke="#2ECC71"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cart handle */}
      <path d="M 8 10 L 10 6" stroke="#2ECC71" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Wheels */}
      <circle cx="13" cy="26" r="1.5" fill="#2ECC71" />
      <circle cx="23" cy="26" r="1.5" fill="#2ECC71" />

      <path d="M 20 1 Q 18 8 20 16 Q 22 8 20 1 Z" fill="#2ECC71" stroke="#1a9954" strokeWidth="0.8" />
      <line x1="20" y1="1" x2="20" y2="16" stroke="#1a9954" strokeWidth="2" />
      <line x1="20" y1="4" x2="18" y2="7" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
      <line x1="20" y1="4" x2="22" y2="7" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
      <line x1="20" y1="10" x2="18" y2="12" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
      <line x1="20" y1="10" x2="22" y2="12" stroke="#1a9954" strokeWidth="1" opacity="0.8" />
    </svg>
  )
}
