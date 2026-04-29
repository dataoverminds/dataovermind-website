import React from "react";
import Link from "next/link";
import { Globe, Link2, MessageCircle, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Services", href: "#services" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Pricing", href: "#pricing" },
  ],
  company: [
    { label: "About", href: "#about" },
    // { label: "Blog", href: "/blog" }, // TODO: Re-enable when Sanity blog is ready
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#cta" },
  ],
  resources: [
    { label: "Documentation", href: "#docs" },
    { label: "API Reference", href: "#api" },
    { label: "Status", href: "#status" },
    { label: "Support", href: "#support" },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
  { icon: Link2, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Globe, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@dataovermind.ai", label: "Email" },
];

export function Footer() {
  return (
    <footer style={{ background: 'rgba(5, 7, 10, 0.8)', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00C2FF, #00FFE5)' }}>
                <span className="font-bold text-sm" style={{ color: '#05070A' }}>D</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Data<span className="gradient-text-blue">OverMind</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#94A3B8' }}>
              Pioneering the future of artificial intelligence. We build
              intelligent systems that transform how businesses operate and
              compete.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.06]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#64748B' }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#64748B' }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: '#94A3B8' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: '#64748B' }}>
            © {new Date().getFullYear()} DataOverMind. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs transition-colors hover:text-white" style={{ color: '#64748B' }}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs transition-colors hover:text-white" style={{ color: '#64748B' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
