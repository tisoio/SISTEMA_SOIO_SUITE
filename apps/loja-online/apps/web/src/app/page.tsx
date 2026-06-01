import Link from "next/link";
import { ART_CREATION_SERVICE } from "@soio/shared";

const categories = [
  {
    slug: "cracha",
    title: "Crachá personalizado",
    description: "PVC, dados variáveis, QR Code e importação em lote.",
  },
  {
    slug: "cordao",
    title: "Cordão para crachá",
    description: "Poliéster acetinado, impressão personalizada.",
  },
  {
    slug: "credencial",
    title: "Credencial",
    description: "Papel couchê ou PVC para eventos e corporativo.",
  },
];

export default function HomePage() {
  return (
    <div className="flex-1">
      <section className="bg-gradient-to-b from-[#003366] to-[#004488] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-200">
            Loja oficial SOIO
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Crachás, cordões e credenciais com compra online
          </h1>
          <p className="mt-4 max-w-xl text-lg text-blue-100">
            Configure seu pedido, veja a prévia, pague com Pix ou cartão e
            acompanhe o status — sem pedido mínimo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/produtos/cracha"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#003366] hover:bg-blue-50"
            >
              Ver produtos
            </Link>
            <Link
              href="/contato"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Falar com a SOIO
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-zinc-900">Categorias</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/produtos/${cat.slug}`}
              className="rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#003366]">{cat.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{cat.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-[#003366]">
                Configurar →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold">Sem arte pronta?</h2>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Contrate a criação de arte pela SOIO por{" "}
            <strong>
              R$ {(ART_CREATION_SERVICE.priceCents / 100).toFixed(2).replace(".", ",")}
            </strong>
            , com até {ART_CREATION_SERVICE.includedRevisions} alterações inclusas.
          </p>
        </div>
      </section>
    </div>
  );
}
