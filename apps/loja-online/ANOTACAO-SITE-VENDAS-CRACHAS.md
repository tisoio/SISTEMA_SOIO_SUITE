# Site de vendas de crachás online — Anotação de requisitos

> Documento vivo para refinamento. Será usado como base do desenvolvimento.  
> **Contexto:** venda online (site) + venda via vendedor externo (Mercos), ambos integrados ao **GestãoClick** (ERP interno).

**Versão:** 0.4  
**Data:** 2026-05-29  
**Status:** canais definidos — Mercos + Site em paralelo

**Referência técnica:** [`gestaoclick.apib`](./gestaoclick.apib) — manual da API GestãoClick (formato API Blueprint).

**Escopo MVP:** [`ESCOPO-MVP-SITE-SOIO.md`](./ESCOPO-MVP-SITE-SOIO.md) — escopo fechado para desenvolvimento (go-live 30 dias).

---

## 1. Visão geral

O site atua como **canal de venda e captação**: catálogo, personalização, prévia, checkout (ou solicitação de pedido/orçamento) e área do cliente. A operação completa (produção, estoque fino, NF, expedição, atendimento detalhado) permanece no **GestãoClick**.

**Princípio:** o site gera pedidos **estruturados e completos** para o ERP; evita duplicar fluxos e duas “verdades” sobre o mesmo pedido.

### 1.1 Divisão de responsabilidades

| No site (público) | No GestãoClick (interno) |
|-------------------|--------------------------|
| Catálogo, personalização, prévia, checkout ou solicitação | Produção, estoque de insumos, fila, NF, expedição |
| Cadastro do cliente e histórico básico (espelho) | Cliente mestre, status detalhado, alterações, retrabalho |
| Pagamento online (quando aplicável) ou pedido para aprovação | Aprovação comercial, crédito, faturamento |
| Rastreamento simplificado para o cliente | Gestão de equipe, custos, negociação complexa |
| Artes, prévias, CSV, fluxo de aprovação de arte | Pedido/orçamento/OS, itens, valores, OS de produção |

### 1.2 Estratégia de canais — Mercos + Site em paralelo

**Decisão (2026-05-29):** manter **dois canais de venda distintos**, operando em paralelo e convergindo no GestãoClick. Não substituir um pelo outro.

| Canal | Solução | Público | Papel |
|-------|---------|---------|-------|
| **Vendedor externo** | **Mercos** | Representantes / vendedores de campo | Relacionamento, visita, negociação, pedido B2B |
| **Venda online** | **Site SOIO** | Cliente final (self-service) | Catálogo, personalização, prévia, checkout |

```
                    ┌─────────────────────────────────────┐
                    │           GestãoClick (ERP)          │
                    │  cliente · pedido · OS · NF · estoque │
                    └──────────────▲──────────▲────────────┘
                                   │          │
              integração ativa     │          │  integração planejada
                                   │          │
                    ┌──────────────┴──┐    ┌──┴───────────────┐
                    │     Mercos      │    │   Site público    │
                    │ vendedor externo│    │   venda online    │
                    └─────────────────┘    └───────────────────┘
```

#### O que cada canal faz (e o que não faz)

| | Mercos | Site |
|---|--------|------|
| **Foco** | Força de vendas externa | Autosserviço 24h |
| **Quem opera** | Vendedor externo | Cliente |
| **Personalização** | Via vendedor (arte enviada, briefing) | Configurador, prévia, upload, CSV |
| **Negociação** | Sim (desconto, prazo, crédito) | Preço tabela / regras fixas (MVP) |
| **Comissão vendedor** | Sim (`vendedor_id` no ERP) | Não aplicável |
| **Integração ERP** | Ativa | Planejada |
| **Canal no ERP** | `nome_canal_venda`: ex. `"Mercos"` | `nome_canal_venda`: ex. `"Site SOIO"` |

#### Princípios de operação em paralelo

1. **Um ERP, dois frontends** — GestãoClick é a fonte única de pedidos, estoque e financeiro.
2. **Canais não se substituem** — Mercos atende quem precisa de vendedor; site atende quem compra sozinho.
3. **Catálogo alinhado** — mesmos produtos/SKUs no ERP; cada canal expõe conforme sua UX.
4. **Origem sempre identificável** — `nome_canal_venda` e ID externo distintos por canal (Mercos vs site).
5. **Integrações independentes** — falha ou manutenção em um canal não derruba o outro.
6. **Site não replica o Mercos** — sem app de vendedor, comissão ou fluxo de representante no site.

**Implicação técnica:** o site reutiliza padrões da integração Mercos → GestãoClick (API, mapeamento de produtos, clientes), mas com origem, canal e dados de personalização próprios.

---

## 2. Decisão de arquitetura — GestãoClick

**Decisão (2026-05-29):** manter o **GestãoClick** como ERP de back-office e desenvolver **site público customizado**, com integração via API em fases. Não trocar de ERP neste momento.

### 2.1 Por que esta abordagem

- A SOIO **já opera** no GestãoClick (financeiro, NF, estoque, vendas).
- **Integração Mercos → GestãoClick já funciona em produção** — prova que a API atende criação de pedidos reais.
- O ERP cobre bem a **gestão interna**; o site cobre a **experiência de venda e personalização** (fora do escopo de ERP genérico).
- Trocar de ERP só pelo site aumenta custo, risco e tempo sem garantir melhor resultado.
- ERPs especializados em gráfica só serão reavaliados se gaps críticos aparecerem **além** do que Mercos já resolve.

### 2.2 Modelo em três camadas

```
[ Site público ]  →  [ Backend / camada de pedidos (recomendado) ]  →  [ GestãoClick ]
   UX, configurator,      artes, CSV, aprovações, ID externo,           cliente, pedido,
   prévia, checkout       logs, fila de integração                      OS, NF, estoque,
                                                                                  financeiro
```

- **Site público:** toda a experiência do cliente (configurador, prévia, carrinho, área logada).
- **Backend intermediário (recomendado):** armazena dados ricos de personalização e artes; envia ao GestãoClick apenas o necessário para operação e fiscal.
- **GestãoClick:** fonte de verdade para **cliente**, **pedido comercial**, **ordem de serviço/produção**, **estoque**, **NF** e **financeiro**.

### 2.3 O que NÃO fica no GestãoClick

- Configurador de crachá e prévia em tempo real.
- Upload e versionamento de artes durante aprovação.
- Importação CSV de nomes em lote.
- Biblioteca de templates e artes aprovadas do cliente (fase 2).

Esses dados vivem no site/backend; o ERP recebe **referência** (URL do pacote de produção, observações estruturadas, ID externo).

### 2.4 Integração em fases

| Fase | Escopo | Objetivo |
|------|--------|----------|
| **Piloto** | Validar gaps específicos do site (não a API em si) | Confirmar campos, canal, status |
| **MVP** | Criar pedido/orçamento + ID único compartilhado | Pedido entra no ERP sem digitação manual |
| **Fase 2** | Sincronização de status (ERP → site) | Cliente acompanha pedido na área logada |
| **Fase 3** | Automações (estoque, NF, webhooks se disponíveis) | Menos intervenção manual |

### 2.5 Pré-requisitos GestãoClick

- [x] Confirmar contratação do **complemento API** (Access Token + Secret Access Token) — *em uso pela integração Mercos*.
- [x] Documentação da API disponível — [`gestaoclick.apib`](./gestaoclick.apib).
- [ ] Definir ambiente de **homologação/testes** para pedidos originados do site (sem impactar produção Mercos).
- [ ] Mapear módulos em uso: vendas, orçamentos, ordem de serviço, controle de produção.
- [ ] Documentar **integração Mercos existente** (código, mapeamento de campos, `situacao_id`, `loja_id`, `vendedor_id`) — *pendente incluir no repositório*.

### 2.6 Integração Mercos — vendedor externo (referência)

Fluxo atual confirmado pela operação:

1. **Vendedor externo** cria pedido/orçamento no **Mercos**.
2. Integração SOIO consome evento/dados do Mercos.
3. Integração chama **API GestãoClick** (`POST /vendas` ou `POST /orcamentos`) e cria o registro no ERP.

O **site** segue o mesmo princípio de handoff para o ERP, com origem e experiência diferentes:

| Aspecto | Mercos (vendedor externo) | Site (venda online) |
|---------|---------------------------|---------------------|
| Origem do pedido | CRM / vendedor externo | Checkout / cliente |
| Cliente | Dados do Mercos → API `/clientes` | Cadastro site → API `/clientes` (buscar ou criar) |
| Itens | Produtos Mercos → `produto_id` + `variacao_id` | SKUs do site mapeados para IDs GestãoClick |
| Canal ERP | `nome_canal_venda`: `"Mercos"` | `nome_canal_venda`: `"Site SOIO"` |
| Vendedor | `vendedor_id` do representante | Sem vendedor — usuário e-commerce padrão |
| Negociação | Desconto/prazo via vendedor | Preço conforme regras do site |
| Observações | Texto do pedido Mercos | Resumo personalização + URL pacote de artes |
| ID externo | ID Mercos (verificar como gravado hoje) | ID pedido site → campo extra ou `observacoes_interna` |

**Pendente de definir:** como a integração Mercos grava o ID externo e quais `situacao_id` / `forma_pagamento_id` usa — replicar convenções no site.

### 2.7 Piloto de API — checklist (atualizado)

Com a integração Mercos ativa, vários itens deixam de ser incógnita. Foco do piloto: **gaps específicos do site**.

| Item | Status | Observação |
|------|--------|------------|
| Cliente: criar/consultar/atualizar | **Provável OK** | Mercos já faz; reutilizar lógica |
| Produto: `produto_id` + `variacao_id` | **Provável OK** | Mercos já mapeia produtos |
| Venda/orçamento: `POST /vendas` ou `/orcamentos` | **OK em produção** | Fluxo Mercos comprovado |
| ID externo do site | **Validar** | Campo extra (`/atributos_vendas`) ou `observacoes_interna` |
| Referência a artes (URL/pacote) | **Validar** | API não documenta upload de anexos em vendas; usar `observacoes` / `detalhes` do item / campo extra |
| Ordem de serviço | **Validar** | Se produção usa OS após venda — conferir fluxo interno atual |
| Status: `GET /vendas/{id}` + `situacao_id` | **Validar** | Mapear `situacoes_vendas` para exibição no site |
| Rate limit (3 req/s, 30k/dia) | **Documentado** | Ver seção 2.8; fila no backend do site |

**Critérios go (revisados):** criação de pedido já comprovada; site precisa apenas definir canal, campos extras e estratégia de artes.

### 2.8 Referência rápida — API GestãoClick

Extraído de [`gestaoclick.apib`](./gestaoclick.apib):

**Base:** `https://api.gestaoclick.com`

**Autenticação (headers em toda requisição):**
- `access-token`
- `secret-access-token`

**Limites:**
- 3 requisições/segundo por empresa
- 30.000 requisições/dia por empresa
- GET paginado: máximo 100 registros/página
- HTTP 429 se exceder limite

**Parâmetros comuns:**
- `loja_id` — obrigatório definir se multi-loja
- `usuario_id` — atribuição de usuário (default: master)

**Endpoints relevantes para o site:**

| Recurso | Endpoint | Uso no site |
|---------|----------|-------------|
| Clientes | `/clientes` | Buscar/criar cliente no checkout |
| Produtos | `/produtos` | Sincronizar catálogo; obter `variacao_id` |
| Orçamentos | `/orcamentos` | B2B / pedido aguardando aprovação |
| Vendas | `/vendas` | Pedido fechado pós-pagamento ou confirmação |
| Situações vendas | `/situacoes_vendas` | Mapear status para área do cliente |
| Ordens de serviço | `/ordens_servicos` | Produção (se fluxo exigir OS) |
| Campos extras vendas | `/atributos_vendas` | ID pedido site, link artes, metadados |
| Cidades | `/cidades` | Endereço do cliente |
| Formas pagamento | `/formas_pagamentos` | Checkout / parcelas |

**Campos úteis em `POST /vendas` e `POST /orcamentos`:**
- `cliente_id`, `data`, `situacao_id`, `produtos[]`, `servicos[]`
- `observacoes`, `observacoes_interna`
- `nome_canal_venda` — distinguir `"Site SOIO"` de `"Mercos"`
- `valor_frete`, `transportadora_id`, `previsao_entrega` / `prazo_entrega`
- `produto.detalhes` — resumo da personalização por linha
- `condicao_pagamento`, `pagamentos[]` ou geração automática de parcelas

**Artes/arquivos:** a API **não expõe endpoint de upload de anexos** em vendas. Estratégia: armazenar artes no backend do site e enviar **URL** em `observacoes_interna`, campo extra de venda ou `detalhes` do produto.

### 2.9 Mapeamento de status (rascunho)

| Status no site (cliente) | Origem provável no GestãoClick |
|--------------------------|--------------------------------|
| Pedido recebido | Venda/orçamento confirmado |
| Aguardando aprovação de arte | Site (pré-ERP ou flag manual) |
| Em produção | OS / controle de produção |
| Pronto / despachado | OS concluída / expedição |
| Entregue | Confirmação manual ou integração transportadora (fase 3) |

**Pendente de definir:** status exatos conforme configuração atual da SOIO no GestãoClick.

---

## 3. Catálogo e tipos de produto

- [ ] Variações claras de produto (ex.: PVC, metal, clip, cordão, magnético, etiqueta).
- [ ] Dimensões e acabamentos com impacto no preço (tamanho, frente/verso, laminação).
- [ ] Pedido mínimo e **faixas de quantidade** (preço unitário por faixa).
- [ ] Prazos estimados por tipo e quantidade (prazo final confirmado no GestãoClick).
- [ ] SKUs alinhados ao cadastro de produtos do GestãoClick (sincronização ou espelho).

**Pendente de definir:** lista completa de SKUs/variações SOIO; regras de precificação; espelhamento catálogo site ↔ ERP.

---

## 4. Personalização (diferencial do negócio)

- [ ] Modelos prontos por segmento (setores, eventos, hospitais, escolas, etc.).
- [ ] Upload de logo/foto com validação (formato, resolução/DPI, tamanho máximo).
- [ ] Campos dinâmicos: nome, cargo, matrícula, QR code, código de barras, etc.
- [ ] **Prévia em tempo real** (frente/verso) antes de confirmar o pedido.
- [ ] **Pedido em lote:** importação de lista de nomes (ex.: CSV/planilha) para pedidos corporativos.
- [ ] Fluxo de **aprovação de arte:** envio → revisão → aprovação (no site ou via link por e-mail).

**Riscos se ausente:** alto volume de retrabalho e suporte manual.

**Pendente de definir:** limites técnicos de arquivo; biblioteca de fontes/cores; templates oficiais.

---

## 5. Jornada de compra

- [ ] Carrinho com múltiplos itens/layouts no mesmo pedido.
- [ ] Cálculo de frete e/ou opção de retirada.
- [ ] Checkout adaptado ao perfil do cliente:
  - **B2C:** pagamento online (PIX, cartão).
  - **B2B:** faturamento, ordem de compra (PO), crédito — possivelmente apenas “solicitar orçamento” no site.
- [ ] **Orçamento vs. pedido fechado:** orçamento com validade; conversão em pedido no GestãoClick sem redigitação.
- [ ] Status simplificado visível ao cliente, espelhado do GestãoClick (ver seção 2.7).

**Pendente de definir:** quais formas de pagamento no MVP; política de orçamento (validade, conversão automática ou manual).

---

## 6. Conta do cliente

- [ ] Cadastro PF/PJ (CNPJ, endereços de entrega e faturamento).
- [ ] **Cliente mestre no GestãoClick** com espelho no site (criar/atualizar via API).
- [ ] Histórico de pedidos e orçamentos (site consulta ERP ou cache sincronizado).
- [ ] **Repetir pedido** (mesmo layout, nova lista de nomes).
- [ ] Biblioteca de artes aprovadas para reutilização (site/backend; referência no pedido ERP).
- [ ] Múltiplos usuários por empresa (papéis: comprador, aprovador de arte) — fase posterior se não estiver no MVP.

**Pendente de definir:** regras de sincronização cliente site ↔ GestãoClick; conflito de cadastro duplicado.

---

## 7. Integração site ↔ GestãoClick

Reutilizar padrões da **integração Mercos → GestãoClick** já em produção. Requisitos da ponte:

- [ ] **ID único de pedido** compartilhado (`id_site` ↔ `id_gestaoclick`).
- [ ] Payload mínimo na criação: cliente, itens (SKU ERP), quantidades, valores, endereço, observações, forma de pagamento.
- [ ] **Pacote de produção:** URL ou referência às artes aprovadas + CSV de nomes (backend do site).
- [ ] Sincronização de **status** (GestãoClick → site) — fase 2.
- [ ] Regras de negócio no ERP (desconto, prazo real, bloqueio por inadimplência): site reflete ou solicita; decisão no GestãoClick.
- [ ] **`nome_canal_venda`** distinto do Mercos (ex.: `"Site SOIO"`) para relatórios e filtros no ERP.
- [ ] Fila/retry para falhas de API; respeitar limite de **3 req/s**; logs de integração.
- [ ] Ambiente de homologação end-to-end.

**Evitar:** digitação manual de pedidos vindos do site. **Meta:** 100% dos pedidos fechados no site entram no ERP via API (MVP).

**Pendente de definir:** formato JSON do payload; endpoints exatos após piloto; frequência de sync de status.

---

## 8. Confiança, legal e operação

- [ ] Políticas claras: troca por erro de impressão vs. erro do cliente; prazos; cancelamento.
- [ ] **LGPD:** consentimento, política de privacidade, retenção de fotos/documentos.
- [ ] Coleta de dados fiscais necessários (emissão de NF no GestãoClick).
- [ ] SEO e páginas por segmento/localidade.
- [ ] Canal de contato (WhatsApp/chat) para dúvidas de arte — complementar ao fluxo digital.

**Pendente de definir:** textos legais; tempo de retenção de arquivos enviados.

---

## 9. Qualidade técnica

- [ ] Site responsivo e performático (uso relevante em mobile).
- [ ] Upload seguro e armazenamento com backup (artes no backend, não dependente do ERP).
- [ ] Ambiente de homologação para testes de integração com GestãoClick.
- [ ] Logs/auditoria de pedido (o que o cliente viu vs. o que foi enviado ao ERP).

**Pendente de definir:** stack tecnológica; hospedagem; CDN para arquivos estáticos.

---

## 10. O que permanece apenas no GestãoClick

Não precisa (e não deve duplicar) no site:

- Controle fino de estoque de insumos e fila de máquinas.
- Emissão de NF e conciliação bancária completa.
- Gestão de equipe de produção e custos.
- Negociação comercial complexa e contratos.

---

## 11. Roadmap sugerido

### Piloto (pré-desenvolvimento)

1. ~~Validar complemento API no contrato GestãoClick.~~ *(já em uso — Mercos)*
2. Executar checklist de gaps específicos do site (seção 2.7).
3. Documentar mapeamento da **integração Mercos** (campos, IDs, situações).
4. Definir `nome_canal_venda`, campos extras e estratégia de URL de artes.
5. Mapear status ERP → site (`/situacoes_vendas`).

### MVP

1. Catálogo com variações e preço por quantidade.
2. Personalização + prévia.
3. Backend de pedidos + integração mínima (criar pedido/orçamento no GestãoClick).
4. Área do cliente com histórico básico.
5. Upload e fluxo de aprovação de arte.

### Fase 2

- Sincronização de status GestãoClick → site.
- Orçamento online; importação CSV em lote; multi-usuário B2B.
- Repetir pedido; biblioteca de artes.
- Pagamentos B2B (boleto, faturamento).

### Fase 3

- Webhooks/automação completa; transportadora.
- Portal para revendedores/franquias (se aplicável).

---

## 12. Critérios de sucesso

- Pedidos chegam ao GestãoClick **completos e aprovados**, sem digitação manual.
- Cliente acompanha status sem depender só de telefone/e-mail.
- GestãoClick como **única fonte de verdade** para cliente, status operacional e dados fiscais.
- Artes e personalização acessíveis à produção via referência clara no pedido.
- Tempo de atendimento reduzido em dúvidas de “como ficará” (prévia) e “onde está meu pedido” (status).

---

## 13. Próximos passos de refinamento

- [x] **Escopo MVP** — ver [`ESCOPO-MVP-SITE-SOIO.md`](./ESCOPO-MVP-SITE-SOIO.md).
- [ ] **Documentar integração Mercos** (código ou spec: payload, IDs, situações) e incluir neste repositório.
- [ ] Validar gaps do site no piloto (seção 2.7): ID externo, URL artes, OS, status.
- [ ] Definir se site cria **orçamento** ou **venda** em cada cenário (B2B vs B2C, pré/pós-pagamento).
- [ ] Detalhar fluxo de telas (visitante → carrinho → aprovação → handoff ERP).
- [ ] Checklist de campos do payload site → GestãoClick (espelhando Mercos + campos novos).
- [ ] Personas: B2C vs B2B (% de receita esperada).
- [ ] Wireframes ou referências de concorrentes/sites de referência.
- [ ] Definir MVP fechado com escopo “não entra na v1”.
- [ ] Escolher stack tecnológica (site + backend de integração).

---

## Histórico de alterações

| Data       | Versão | Descrição |
|------------|--------|-----------|
| 2026-05-29 | 0.1    | Rascunho inicial a partir de levantamento de requisitos |
| 2026-05-29 | 0.2    | Decisão de arquitetura: GestãoClick + site customizado; piloto API; roadmap atualizado |
| 2026-05-29 | 0.3    | Manual API (`gestaoclick.apib`); integração Mercos existente; piloto revisado; referência de endpoints |
| 2026-05-29 | 0.4    | Decisão explícita: Mercos (vendedor externo) + Site (online) em paralelo |
| 2026-06-01 | 0.5    | Link para escopo MVP v1.0 (briefing fechado) |
