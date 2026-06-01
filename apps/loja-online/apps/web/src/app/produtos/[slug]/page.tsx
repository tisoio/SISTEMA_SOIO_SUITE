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
      <p className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-[#003366]">
          Início
        </Link>{" "}
        / Produtos
      </p>
      <h1 className="mt-4 text-3xl font-bold text-[#003366]">{product.title}</h1>
      <p className="mt-4 text-zinc-600">{product.description}</p>
      <div className="mt-8 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-sm text-zinc-500">
        Configurador de produto — Semana 2 do MVP
      </div>
    </main>
  );
}
