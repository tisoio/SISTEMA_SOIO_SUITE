import Link from "next/link";
import { CONTACT, SITE_URL } from "@soio/shared";

export function SiteFooter() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}`;

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-[#003366]">SOIO</p>
          <p className="mt-2 text-sm text-zinc-600">
            Identificação profissional: crachás, cordões e credenciais.
          </p>
          <p className="mt-2 text-xs text-zinc-500">{SITE_URL}</p>
        </div>
        <div>
          <p className="font-semibold text-zinc-800">Institucional</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600">
            <li>
              <Link href="/quem-somos" className="hover:text-[#003366]">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#003366]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-[#003366]">
                Privacidade
              </Link>
            </li>
            <li>
              <Link href="/trocas" className="hover:text-[#003366]">
                Trocas e devoluções
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-zinc-800">Atendimento</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600">
            <li>
              <a href={whatsappUrl} className="hover:text-[#003366]">
                WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>{CONTACT.phone}</li>
            <li>{CONTACT.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} SOIO. Todos os direitos reservados.
      </div>
    </footer>
  );
}
