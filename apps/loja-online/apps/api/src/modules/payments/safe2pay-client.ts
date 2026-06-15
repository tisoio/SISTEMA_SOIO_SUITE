import { loadSafe2PayConfig } from "../../config/safe2pay.js";

export class Safe2PayNotConfiguredError extends Error {
  constructor() {
    super("Safe2Pay não configurado: defina SAFE2PAY_API_KEY em apps/api/.env");
    this.name = "Safe2PayNotConfiguredError";
  }
}

/** Cliente HTTP mínimo — credenciais nunca saem do backend */
export async function safe2PayRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const config = loadSafe2PayConfig();
  if (!config) throw new Safe2PayNotConfiguredError();

  const url = `${config.baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": config.apiKey,
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Safe2Pay ${response.status}: ${body.slice(0, 500)}`);
  }

  return response.json() as Promise<T>;
}
