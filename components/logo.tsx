export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-3xl font-bold text-foreground font-sans tracking-tight">Chopst</span>

      {/* Simple shopping cart with ONE prominent leaf sticking out */}
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

        <path d="M 18 12 Q 20 6 22 2 Q 24 6 22 12 Z" fill="#2ECC71" stroke="#1a9954" strokeWidth="0.5" />
        {/* Leaf vein - thicker and more visible */}
        <line x1="22" y1="2" x2="22" y2="12" stroke="#1a9954" strokeWidth="1.5" />
        {/* Side veins for more leaf detail */}
        <line x1="22" y1="5" x2="20" y2="7" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
        <line x1="22" y1="5" x2="24" y2="7" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
        <line x1="22" y1="8" x2="20" y2="10" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
        <line x1="22" y1="8" x2="24" y2="10" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
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

      <path d="M 18 12 Q 20 6 22 2 Q 24 6 22 12 Z" fill="#2ECC71" stroke="#1a9954" strokeWidth="0.5" />
      <line x1="22" y1="2" x2="22" y2="12" stroke="#1a9954" strokeWidth="1.5" />
      <line x1="22" y1="5" x2="20" y2="7" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
      <line x1="22" y1="5" x2="24" y2="7" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
      <line x1="22" y1="8" x2="20" y2="10" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
      <line x1="22" y1="8" x2="24" y2="10" stroke="#1a9954" strokeWidth="0.8" opacity="0.7" />
    </svg>
  )
}
