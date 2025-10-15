export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-3xl font-bold text-foreground font-sans tracking-tight">Chopst</span>

      {/* Simple shopping cart with ONE leaf sticking out */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-8 w-8 -mx-0.5"
        role="img"
        aria-label="Shopping cart"
      >
        {/* Cart basket - simple clean lines */}
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

        <path d="M 20 12 Q 22 8 24 4 Q 26 8 24 12 Z" fill="#2ECC71" />
        <line x1="24" y1="4" x2="24" y2="12" stroke="#1a9954" strokeWidth="1" />
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

      <path d="M 20 12 Q 22 8 24 4 Q 26 8 24 12 Z" fill="#2ECC71" />
      <line x1="24" y1="4" x2="24" y2="12" stroke="#1a9954" strokeWidth="1" />
    </svg>
  )
}
