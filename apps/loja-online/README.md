# SOIO — Loja online

Módulo **`apps/loja-online`** do monorepo [SISTEMA_SOIO_SUITE](https://github.com/tisoio/SISTEMA_SOIO_SUITE).

Canal de venda online da SOIO em **https://loja.soio.com.br**, integrado ao **GestãoClick**, em paralelo ao **Mercos** (vendedor externo).

**Pasta local padrão:** `C:\GITHUB\SISTEMA_SOIO_SUITE\apps\loja-online`

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [ESTRUTURA-PROJETO.md](./ESTRUTURA-PROJETO.md) | Organização de pastas e apps |
| [ESCOPO-MVP-SITE-SOIO.md](./ESCOPO-MVP-SITE-SOIO.md) | Escopo do MVP (30 dias) |
| [ANOTACAO-SITE-VENDAS-CRACHAS.md](./ANOTACAO-SITE-VENDAS-CRACHAS.md) | Requisitos e arquitetura |
| [gestaoclick.apib](./gestaoclick.apib) | Manual API GestãoClick |

## Apps (monorepo)

| Pasta | URL / uso |
|-------|-----------|
| `apps/web` | Loja pública — `loja.soio.com.br` |
| `apps/admin` | Painel interno SOIO |
| `apps/api` | API backend (pedidos, pagamento, ERP) |

## Início rápido

> Ambientes e comandos serão definidos na Semana 1 (stack Node + Next.js conforme escopo).

```bash
npm install
npm run dev          # loja http://localhost:3000
npm run dev:api      # API http://localhost:4000
npm run dev:all      # ambos
```

## Marca

Arquivos oficiais: `C:\SISTEMAS\SOIO\Sites corporativos\MARCA\soio`  
Cópias de trabalho / export web: `assets/marca/`
