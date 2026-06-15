/** Canal de venda registrado no GestãoClick */
export const SITE_CHANNEL_NAME = "Site SOIO" as const;

export const SITE_URL = "https://loja.soio.com.br" as const;

/** Gateway de pagamento */
export const PAYMENT_PROVIDER = "safe2pay" as const;

/** Safe2Pay — códigos PaymentMethod (API) */
export const SAFE2PAY_PAYMENT_METHOD = {
  boleto: "1",
  creditCard: "2",
  pix: "6",
} as const;

/** Faixas de quantidade para precificação */
export const PRICE_QUANTITY_TIERS = [1, 10, 20, 50, 100, 200, 500] as const;

export type PriceQuantityTier = (typeof PRICE_QUANTITY_TIERS)[number];

/** Serviço criação de arte quando cliente não possui arquivo */
export const ART_CREATION_SERVICE = {
  name: "Criação de arte SOIO",
  priceCents: 17000,
  includedRevisions: 2,
} as const;

export const CONTACT = {
  whatsapp: "5511971406115",
  whatsappDisplay: "(11) 97140-6115",
  phone: "(11) 5464-3566",
  hours: "Segunda a sexta, 9h às 12h e 13h às 17h30",
} as const;

export function tierForQuantity(quantity: number): PriceQuantityTier {
  let selected: PriceQuantityTier = PRICE_QUANTITY_TIERS[0];
  for (const tier of PRICE_QUANTITY_TIERS) {
    if (quantity >= tier) selected = tier;
  }
  return selected;
}
