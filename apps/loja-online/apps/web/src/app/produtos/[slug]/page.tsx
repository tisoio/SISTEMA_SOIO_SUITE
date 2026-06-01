import Link from "next/link";
import { notFound } from "next/navigation";

const products: Record<string, { title: string; description: string }> = {
  cracha: {
    title: "Crachá personalizado",
    description: "Configurador em desenvolvimento — upload, prévia, CSV e checkout.",
  },
  cordao: {
    title: "Cordão para crachá",
    description: "Configurador em desenvolvimento.",
  },
  credencial: {
    title: "Credencial",
    description: "Configurador em desenvolvimento.",
  },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12">
      <p className="text-sm text-soio-muted">
        <Link href="/" className="hover:text-soio-primary">
          Início
        </Link>{" "}
        / Produtos
      </p>
      <h1 className="mt-4 text-3xl font-bold text-soio-primary">{product.title}</h1>
      <p className="mt-4 text-soio-muted">{product.description}</p>
      <div className="mt-8 rounded-lg border border-dashed border-soio-line bg-soio-surface p-8 text-center text-sm text-soio-muted">
        Configurador de produto — Semana 2 do MVP
      </div>
    </main>
  );
}
