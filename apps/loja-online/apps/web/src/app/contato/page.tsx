import { CONTACT } from "@soio/shared";

export default function ContatoPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-bold text-[#003366]">Contato</h1>
      <ul className="mt-6 space-y-3 text-zinc-700">
        <li>
          WhatsApp:{" "}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            className="font-medium text-[#003366] hover:underline"
          >
            {CONTACT.whatsappDisplay}
          </a>
        </li>
        <li>Telefone: {CONTACT.phone}</li>
        <li>Horário: {CONTACT.hours}</li>
      </ul>
    </main>
  );
}
