import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";

const nav = [
  { href: "/produtos/cracha", label: "Crachás" },
  { href: "/produtos/cordao", label: "Cordões" },
  { href: "/produtos/credencial", label: "Credenciais" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-soio-line/80 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:min-h-[82px] md:py-4">
        <BrandLogo variant="header" />
        <nav className="hidden items-center gap-6 text-sm font-bold text-soio-muted md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-soio-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/conta"
            className="hidden text-sm text-soio-muted hover:text-soio-primary sm:inline"
          >
            Minha conta
          </Link>
          <Link
            href="/carrinho"
            className="rounded-full bg-soio-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-soio-primary-hover"
          >
            Carrinho
          </Link>
        </div>
      </div>
    </header>
  );
}
