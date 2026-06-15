export type Safe2PayConfig = {
  apiKey: string;
  token: string | undefined;
  sandbox: boolean;
  baseUrl: string;
};

export function loadSafe2PayConfig(): Safe2PayConfig | null {
  const apiKey = process.env.SAFE2PAY_API_KEY?.trim();
  if (!apiKey) return null;

  return {
    apiKey,
    token: process.env.SAFE2PAY_TOKEN?.trim() || undefined,
    sandbox: process.env.SAFE2PAY_SANDBOX !== "false",
    baseUrl:
      process.env.SAFE2PAY_API_URL?.trim() ||
      "https://payment.safe2pay.com.br",
  };
}

export function isSafe2PayConfigured(): boolean {
  return loadSafe2PayConfig() !== null;
}
