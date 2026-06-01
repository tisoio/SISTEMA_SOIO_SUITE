import Link from "next/link";

const nav = [
  { href: "/produtos/cracha", label: "Crachás" },
  { href: "/produtos/cordao", label: "Cordões" },
  { href: "/produtos/credencial", label: "Credenciais" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#003366]">
          SOIO
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[#003366]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/conta"
            className="text-sm text-zinc-600 hover:text-[#003366]"
          >
            Minha conta
          </Link>
          <Link
            href="/carrinho"
            className="rounded-full bg-[#003366] px-4 py-2 text-sm font-medium text-white hover:bg-[#002244]"
          >
            Carrinho
          </Link>
        </div>
      </div>
    </header>
  );
}
