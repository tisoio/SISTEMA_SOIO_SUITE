import Link from "next/link";
import { CONTACT, SITE_URL } from "@soio/shared";
import { BrandLogo } from "@/components/layout/brand-logo";

export function SiteFooter() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}`;

  return (
    <footer className="mt-auto border-t border-soio-line bg-soio-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-[14px] bg-white px-2.5 py-2">
            <BrandLogo variant="footer" />
          </div>
          <p className="mt-3 text-sm text-soio-muted">
            Identificação profissional: crachás, cordões e credenciais.
          </p>
          <p className="mt-2 text-xs text-soio-muted/80">{SITE_URL}</p>
        </div>
        <div>
          <p className="font-semibold text-soio-text">Institucional</p>
          <ul className="mt-2 space-y-1 text-sm text-soio-muted">
            <li>
              <Link href="/quem-somos" className="hover:text-soio-primary">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-soio-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-soio-primary">
                Privacidade
              </Link>
            </li>
            <li>
              <Link href="/trocas" className="hover:text-soio-primary">
                Trocas e devoluções
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-soio-text">Atendimento</p>
          <ul className="mt-2 space-y-1 text-sm text-soio-muted">
            <li>
              <a href={whatsappUrl} className="hover:text-soio-primary">
                WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>{CONTACT.phone}</li>
            <li>{CONTACT.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-soio-line py-4 text-center text-xs text-soio-muted">
        © {new Date().getFullYear()} SOIO. Todos os direitos reservados.
      </div>
    </footer>
  );
}
