# Estrutura de pastas — Loja SOIO

**Repositório:** [SISTEMA_SOIO_SUITE](https://github.com/tisoio/SISTEMA_SOIO_SUITE) → `apps/loja-online/`  
**Subdomínio confirmado:** `loja.soio.com.br`  
**Modelo:** monorepo Node (loja + admin + API + pacotes compartilhados) dentro do Suite Maven

---

## Visão geral

```
Sites de vendas online/
│
├── apps/                          # Aplicações executáveis
│   ├── web/                       # Loja pública (Next.js)
│   ├── admin/                     # Painel interno (Next.js ou React)
│   └── api/                       # Backend REST + webhooks
│
├── packages/                      # Código compartilhado entre apps
│   ├── shared/                    # Types, constantes, validadores
│   └── gestaoclick/               # Cliente HTTP API GestãoClick
│
├── assets/                        # Arquivos estáticos do projeto
│   ├── marca/                     # Logo, favicon, guia (cópias de MARCA/soio)
│   └── templates/                 # Planilha CSV padrão, gabaritos
│
├── docs/                          # Documentação técnica complementar
│   ├── api/                       # Contratos, exemplos payload ERP
│   └── integracoes/               # Mercos, gateway, frete
│
├── infra/                         # Deploy, Docker, scripts ops
│   ├── docker/
│   └── scripts/
│
├── Documentos na raiz (legado)    # Mantidos na migração inicial
│   ├── ANOTACAO-SITE-VENDAS-CRACHAS.md
│   ├── ESCOPO-MVP-SITE-SOIO.md
│   ├── gestaoclick.apib
│   └── Planilha Padrao.csv
│
├── README.md
├── ESTRUTURA-PROJETO.md           # Este arquivo
├── package.json                   # Workspace root (npm workspaces)
└── package-lock.json
```

---

## `apps/web` — Loja (`loja.soio.com.br`)

Frontend público: catálogo, configurador, carrinho, checkout, área do cliente.

```
apps/web/
├── public/                        # favicon, imagens estáticas
├── src/
│   ├── app/                       # App Router (Next.js)
│   │   ├── (loja)/              # Layout loja
│   │   │   ├── page.tsx           # Home
│   │   │   ├── produtos/
│   │   │   ├── carrinho/
│   │   │   ├── checkout/
│   │   │   └── conta/
│   │   └── (institucional)/       # quem-somos, faq, privacidade, contato
│   ├── components/
│   │   ├── layout/                # Header, footer, WhatsApp
│   │   ├── catalog/               # Cards, listagem, filtros
│   │   ├── product-configurator/  # Upload, QR, prévia, CSV
│   │   ├── cart/
│   │   └── checkout/
│   ├── lib/                       # API client, hooks, utils
│   └── styles/                    # Tokens SOIO, globals
├── .env.local.example
├── next.config.ts
├── package.json
└── README.md
```

**Responsabilidades:** UX, SEO, chamadas à `apps/api`, nunca chamar GestãoClick direto do browser (tokens secretos ficam no backend).

---

## `apps/admin` — Painel interno

Gestão de pedidos, status, artes (provas/revisões), catálogo MVP, reprocessar integração ERP.

```
apps/admin/
├── src/
│   ├── app/
│   │   ├── login/
│   │   ├── pedidos/
│   │   ├── artes/                 # Aprovação, contador 2 revisões
│   │   ├── produtos/              # CRUD faixas preço, prazo, peso
│   │   └── configuracoes/
│   ├── components/
│   └── lib/
├── .env.local.example
├── package.json
└── README.md
```

**Acesso:** rede interna ou auth restrita (não expor publicamente sem proteção).

---

## `apps/api` — Backend

API única para web, admin, webhooks de pagamento e fila GestãoClick.

```
apps/api/
├── src/
│   ├── main.ts                    # Bootstrap servidor
│   ├── config/                    # Env, validação
│   ├── modules/
│   │   ├── auth/                  # Conta cliente, sessão
│   │   ├── catalog/               # Produtos, preços por faixa
│   │   ├── cart/                  # Carrinho (sessão ou usuário)
│   │   ├── orders/                # Pedidos, status
│   │   ├── customization/         # Upload arte, CSV, ZIP fotos
│   │   ├── shipping/              # Cálculo frete peso/volume
│   │   ├── payments/              # Gateway Pix/cartão, webhooks
│   │   └── integrations/
│   │       └── gestaoclick/       # Cliente + fila + mapper Mercos-like
│   ├── jobs/                      # Workers: sync ERP, e-mails
│   └── database/
│       ├── migrations/
│       └── seeds/
├── test/
├── .env.example
├── package.json
└── README.md
```

**Variáveis críticas:** `GESTAOCLICK_ACCESS_TOKEN`, `GESTAOCLICK_SECRET_TOKEN`, credenciais gateway, storage S3, `DATABASE_URL`, `REDIS_URL`.

---

## `packages/shared`

Tipos e regras usados em web, admin e api.

```
packages/shared/
├── src/
│   ├── types/                     # Order, Product, Cart, Customer
│   ├── constants/                 # Faixas 1|10|20|50|100|200|500, canal "Site SOIO"
│   ├── validators/                # CPF/CNPJ, CSV schema
│   └── pricing/                 # Cálculo faixa quantidade
├── package.json
└── tsconfig.json
```

---

## `packages/gestaoclick`

Cliente tipado da API (gerado ou manual a partir de `gestaoclick.apib`).

```
packages/gestaoclick/
├── src/
│   ├── client.ts                  # HTTP + auth headers
│   ├── resources/
│   │   ├── clientes.ts
│   │   ├── produtos.ts
│   │   ├── vendas.ts
│   │   └── orcamentos.ts
│   └── mappers/
│       └── order-to-venda.ts      # Pedido site → payload ERP
├── package.json
└── README.md
```

---

## `assets/`

```
assets/
├── marca/
│   └── README.md                  # Aponta para MARCA/soio; logos exportados aqui
├── templates/
│   └── planilha-padrao.csv        # Cópia de referência do modelo lote
└── product-mockups/               # Gabaritos prévia (fase design)
```

**Origem da marca:** `C:\SISTEMAS\SOIO\Sites corporativos\MARCA\soio`

---

## `docs/`

Documentação que não é código.

```
docs/
├── api/
│   ├── gestaoclick-payload-pedido.md   # A preencher (pós piloto)
│   └── openapi.yaml                    # API SOIO (futuro)
└── integracoes/
    ├── mercos-referencia.md            # Mapeamento integração existente
    ├── gateway-pagamento.md
    └── frete.md
```

Os documentos principais de negócio permanecem na **raiz** até migração opcional para `docs/requisitos/`.

---

## `infra/`

```
infra/
├── docker/
│   ├── docker-compose.yml         # postgres, redis, api (dev)
│   └── Dockerfile.api
└── scripts/
    ├── deploy.sh
    └── backup-db.sh
```

**Produção:** `loja.soio.com.br` → `apps/web`; API em subdomínio interno ou path `/api` (definir na Semana 1).

---

## Fluxo de dados (resumo)

```
Browser (loja.soio.com.br)
    → apps/web
    → apps/api
        → PostgreSQL (pedidos, catálogo)
        → Storage (artes, CSV)
        → Gateway (Pix/cartão)
        → GestãoClick API (cliente + venda)
```

---

## Convenções

| Tema | Convenção |
|------|-----------|
| Idioma código | Inglês (pastas, variáveis) |
| Idioma UI | Português (BR) |
| Canal ERP | Constante `SITE_SOIO_CHANNEL = "Site SOIO"` em `packages/shared` |
| ID pedido site | `pedido_site_{uuid}` no ERP |
| Branch git | `main`, `develop`, `feature/*` (quando repo criado) |

---

## Próximos passos técnicos

1. ~~Inicializar workspace na raiz.~~ ✅
2. ~~Scaffold `apps/web` (Next.js), `apps/api` (Fastify), `packages/shared`.~~ ✅
3. Copiar logos para `assets/marca/`.
4. `.env.example` em `apps/api` e `apps/web`.
5. `docker-compose` em `infra/docker` para dev local.

---

## Histórico

| Data | Descrição |
|------|-----------|
| 2026-06-01 | Estrutura inicial proposta; subdomínio `loja.soio.com.br` confirmado |
