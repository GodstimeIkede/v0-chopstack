import Link from "next/link"
import { Logo } from "./logo"
import { Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  const footerLinks = {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/contact", label: "Contact & Support" },
    ],
    resources: [
      { href: "/buyer/dashboard", label: "Buyer Dashboard" },
      { href: "/vendor/dashboard", label: "Vendor Dashboard" },
    ],
  }

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              The smart way to stock up your kitchen and farm needs. Connecting buyers with verified vendors and farmers
              across Africa.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:chopstackbystokit@gmail.com" className="hover:text-primary transition-colors">
                chopstackbystokit@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chopstack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
