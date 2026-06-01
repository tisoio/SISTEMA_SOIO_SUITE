import { PRICE_QUANTITY_TIERS, type PriceQuantityTier } from "./index.js";

export type ProductSlug = "cracha" | "cordao" | "credencial";

export type PriceByTier = Record<PriceQuantityTier, number>;

export interface Product {
  slug: ProductSlug;
  name: string;
  shortDescription: string;
  /** Preço unitário em centavos por faixa */
  unitPriceCentsByTier: PriceByTier;
  /** Peso em gramas por unidade (frete) */
  weightGrams: number;
  /** Prazo em dias úteis por faixa (estimativa) */
  leadTimeDaysByTier: Partial<Record<PriceQuantityTier, number>>;
  supportsCsvBatch: boolean;
  supportsQrCode: boolean;
}

/** Catálogo MVP — substituir por admin/ERP quando disponível */
export const CATALOG: Product[] = [
  {
    slug: "cracha",
    name: "Crachá personalizado",
    shortDescription:
      "PVC com impressão personalizada, dados variáveis e opção de QR Code.",
    unitPriceCentsByTier: {
      1: 2890,
      10: 1890,
      20: 1590,
      50: 1290,
      100: 990,
      200: 890,
      500: 790,
    },
    weightGrams: 12,
    leadTimeDaysByTier: { 1: 5, 10: 7, 50: 10, 100: 12, 500: 15 },
    supportsCsvBatch: true,
    supportsQrCode: true,
  },
  {
    slug: "cordao",
    name: "Cordão para crachá",
    shortDescription: "Poliéster acetinado com impressão personalizada.",
    unitPriceCentsByTier: {
      1: 1590,
      10: 990,
      20: 890,
      50: 790,
      100: 690,
      200: 590,
      500: 490,
    },
    weightGrams: 8,
    leadTimeDaysByTier: { 1: 5, 10: 7, 50: 9, 100: 10 },
    supportsCsvBatch: false,
    supportsQrCode: false,
  },
  {
    slug: "credencial",
    name: "Credencial",
    shortDescription: "Credencial em PVC ou papel couché para eventos e acesso.",
    unitPriceCentsByTier: {
      1: 2490,
      10: 1490,
      20: 1290,
      50: 1090,
      100: 890,
      200: 790,
      500: 690,
    },
    weightGrams: 10,
    leadTimeDaysByTier: { 1: 5, 10: 7, 50: 10, 100: 12 },
    supportsCsvBatch: true,
    supportsQrCode: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export function unitPriceCents(product: Product, quantity: number): number {
  const tier = tierForQuantity(quantity);
  return product.unitPriceCentsByTier[tier];
}

export function lineTotalCents(product: Product, quantity: number): number {
  return unitPriceCents(product, quantity) * quantity;
}

export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function tierForQuantity(quantity: number): PriceQuantityTier {
  let selected: PriceQuantityTier = PRICE_QUANTITY_TIERS[0];
  for (const tier of PRICE_QUANTITY_TIERS) {
    if (quantity >= tier) selected = tier;
  }
  return selected;
}

export function estimatedLeadTimeDays(
  product: Product,
  quantity: number,
): number {
  const tier = tierForQuantity(quantity);
  return (
    product.leadTimeDaysByTier[tier] ??
    product.leadTimeDaysByTier[PRICE_QUANTITY_TIERS[0]] ??
    10
  );
}
