import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE_URL } from "@soio/shared";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SOIO — Crachás, cordões e credenciais",
    template: "%s | SOIO Loja",
  },
  description:
    "Loja online SOIO: crachás personalizados, cordões e credenciais com prévia, pedido em lote e pagamento Pix ou cartão.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
