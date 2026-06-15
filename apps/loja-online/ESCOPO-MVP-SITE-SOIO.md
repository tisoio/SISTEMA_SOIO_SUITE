# Escopo MVP — Site de vendas SOIO

> Documento de escopo para início do desenvolvimento.  
> Complementa [`ANOTACAO-SITE-VENDAS-CRACHAS.md`](./ANOTACAO-SITE-VENDAS-CRACHAS.md).

**Versão:** 1.0  
**Data:** 2026-06-01  
**Meta de go-live:** 30 dias  
**Referência de mercado (estrutura):** [Animacolor](https://animacolor.com.br/) — adaptado à identidade SOIO, com **preço, carrinho e pagamento no site**.

---

## 1. Objetivo do MVP

Lançar o canal **Site SOIO** (subdomínio de [www.soio.com.br](https://www.soio.com.br)) para venda online de **crachás, cordões e credenciais**, com personalização, checkout (Pix + cartão), frete por peso/volume e integração mínima com **GestãoClick** (cliente + pedido), operando em **paralelo** ao **Mercos** (vendedor externo).

### 1.1 Metas de negócio

- Permitir compra self-service 24h (B2C e B2B).
- Reduzir digitação manual de pedidos no ERP.
- Manter rastreabilidade por canal (`nome_canal_venda`: **Site SOIO**).
- Oferecer experiência de personalização comparável ao mercado, com diferencial SOIO (prévia, lote CSV, criação de arte).

### 1.2 Fora do escopo do MVP (fase 2+)

- Sincronização automática de status ERP → área do cliente (exibir status sim, mas atualização manual ou polling simples se não couber no prazo).
- Geração automática de OS no GestãoClick.
- Boleto bancário.
- Portal multi-usuário B2B (comprador vs aprovador).
- Biblioteca de artes reutilizáveis.
- App mobile nativo.
- Marketplace / revendedores.

---

## 2. Decisões fechadas (briefing)

| Tema | Decisão |
|------|---------|
| Modelo | Híbrido B2B + B2C |
| Fluxo de pedido | Misto: pagamento direto **ou** aprovação/orçamento conforme regra |
| Pagamento MVP | **Pix + cartão** via **Safe2Pay** (credenciais disponíveis) |
| Antifraude | **Sim no MVP** (3DS / antifraude Safe2Pay quando aplicável) |
| Faixas de preço | **1, 10, 20, 50, 100, 200, 500** unidades |
| Pedido mínimo | **Não** |
| Frete | **Peso/volume**; retirada + entrega |
| Prazo produção | Regra por **produto + quantidade** (cadastro admin) |
| Arte sem arquivo do cliente | Serviço **R$ 170,00** com **2 alterações** inclusas |
| Planilha lote | [`Planilha Padrao.csv`](./Planilha%20Padrao.csv) |
| Status ao cliente | **Sim** — apresentação de etapas no site |
| Canal ERP | `nome_canal_venda` = **"Site SOIO"** |
| Identidade visual | `C:\SISTEMAS\SOIO\Sites corporativos\MARCA\soio` |
| Páginas institucionais | Quem Somos, Privacidade (LGPD), Trocas, FAQ, Contato |
| URL | **https://loja.soio.com.br** (subdomínio confirmado) |
| Atendimento | WhatsApp **(11) 97140-6115** · Fixo **(11) 5464-3566** · **9h–12h** e **13h–17h30** |
| Integração GestãoClick MVP | Criar **cliente** + criar **pedido/venda** |
| Mercos | **Paralelo**; regras e canal separados no ERP |

---

## 3. Público e jornadas

### 3.1 Personas

| Persona | Necessidade | Canal |
|---------|-------------|-------|
| Empresa (B2B) | Pedido em lote, NF, prazo, credencial corporativa | Site |
| Consumidor/evento (B2C) | Poucas unidades, pagamento rápido | Site |
| Vendedor externo | Negociação, comissão, relacionamento | Mercos (fora deste escopo) |

### 3.2 Jornadas principais

**Jornada A — Compra direta (arte pronta)**  
Catálogo → configurar produto → upload arte → prévia → carrinho → checkout → pagamento → confirmação → pedido no GestãoClick → status no site.

**Jornada B — Com arte SOIO (R$ 170)**  
Cliente indica “não tenho arte” → adiciona serviço criação de arte → briefing/upload referência → pagamento do pedido (total inclui R$ 170) → status “Aguardando arte” → equipe envia prova → até **2 alterações** → aprovação → produção.

**Jornada B2 — Pedido em lote (CSV)**  
Produto compatível → download modelo → upload [`Planilha Padrao.csv`](./Planilha%20Padrao.csv) → validação → prévia amostra → carrinho/checkout.

**Jornada C — Aprovação comercial (fluxo misto)**  
Casos configurados (ex.: B2B acima de valor X, CNPJ sem crédito, pedido corporativo especial) → não cobra no ato → gera **orçamento** no GestãoClick → cliente recebe confirmação “em análise” → equipe aprova → link de pagamento ou contato (MVP: notificação + status manual).

> **Pendente operacional:** listar exatamente quais condições disparam Jornada C (valor, perfil, produto).

---

## 4. Catálogo MVP

### 4.1 Famílias de produto

| Família | Exemplos / observações |
|---------|------------------------|
| **Crachá** | PVC, dimensões, frente/verso, chip/QR, dados variáveis |
| **Cordão** | Para crachá; larguras; impressão |
| **Credencial** | Papel couchê, PVC, pulseira vinculada se aplicável |

Cada produto no admin deve ter: SKU interno, mapeamento `produto_id` / `variacao_id` GestãoClick, peso unitário, dimensões para frete, faixas de preço, prazos por faixa.

### 4.2 Precificação

- Tabela por faixa: **1 | 10 | 20 | 50 | 100 | 200 | 500** unidades.
- Preço exibido conforme quantidade no carrinho (recálculo automático).
- Sem pedido mínimo obrigatório.
- Adicional fixo: **Criação de arte — R$ 170,00** (linha de serviço ou produto “serviço” no ERP).

### 4.3 Prazo de entrega (estimativa no site)

- Cadastro por produto + faixa de quantidade (dias úteis).
- Texto legal: prazo confirmado após aprovação de arte (quando aplicável).
- Exibição no produto e no checkout.

---

## 5. Personalização

### 5.1 Recursos no MVP

| Recurso | Descrição |
|---------|-----------|
| Upload de logo/arte | Formatos e tamanho máximo (definir na implantação: ex. PDF, AI, PNG, JPG; máx. 20 MB) |
| Dados variáveis | Nome, cargo, matrícula, etc. conforme produto |
| QR Code / código de barras | Campo e validação de conteúdo |
| Prévia visual | Frente/verso simplificado antes do checkout |
| Importação CSV | Colunas do [`Planilha Padrao.csv`](./Planilha%20Padrao.csv): `Nome completo`, `Nome reduzido`, `Código Func`, `RG`, `CPF`, `Nome da foto`, `Data Admissão` |

### 5.2 Validação do CSV

- Encoding UTF-8; separador `;`
- Linhas com erro destacadas; não permitir checkout até corrigir ou excluir linhas inválidas
- `Nome da foto` deve existir no pacote de imagens enviado (ZIP opcional no MVP — **definir se ZIP entra no MVP ou só CSV + upload individual**)

### 5.3 Criação de arte SOIO (R$ 170)

- Opção no configurador: “Não tenho arte — quero que a SOIO crie”
- Formulário de briefing (texto + referências visuais)
- Contador de revisões: **0/2** → **1/2** → **2/2** (após isso, alterações cobradas à parte — política na página Trocas)
- Status específico: **Aguardando criação de arte** → **Arte para aprovação** → **Arte aprovada**

---

## 6. Carrinho e checkout

### 6.1 Carrinho

- Múltiplos itens e configurações no mesmo pedido
- Resumo: produtos, personalização, serviço de arte, frete, total
- Cupom de desconto: **fora do MVP** (opcional fase 2)

### 6.2 Checkout

| Etapa | Campos / regras |
|-------|-----------------|
| Identificação | E-mail; login opcional MVP (guest checkout + conta simples recomendado) |
| Cadastro | PF: nome, CPF, telefone; PJ: razão social, CNPJ, IE opcional |
| Endereço | Entrega e faturamento; CEP com busca |
| Entrega | **Retirada** (endereço SOIO) ou **Entrega** (frete calculado) |
| Pagamento | Pix + cartão via gateway contratado; antifraude/3DS ativo |
| Revisão | Aceite termos + política de privacidade |

### 6.3 Frete (peso/volume)

- Peso e dimensões por SKU no cadastro
- Integração com tabela/API de frete (**definir provedor**: Correios, Melhor Envio, Frenet, tabela própria)
- Exibir prazo e valor antes do pagamento
- Retirada: valor R$ 0 e instruções de horário (9h–12h / 13h–17h30)

### 6.4 Pagamento

| Item | MVP |
|------|-----|
| Gateway | **Safe2Pay** — [documentação](https://developers.safe2pay.com.br/) · ver [`docs/integracoes/safe2pay-pagamento.md`](./docs/integracoes/safe2pay-pagamento.md) |
| Pix | PaymentMethod `6`; QR/copia e cola |
| Cartão | PaymentMethod `2`; tokenização / 3DS conforme Safe2Pay |
| Estorno | Processo manual conforme política de trocas |
| NF | Emitida no GestãoClick (pós-pedido) |

**Dependência:** credenciais Safe2Pay (Key + Token) configuradas em `apps/api/.env` — **disponibilizadas pela SOIO**.

---

## 7. Área do cliente e status

### 7.1 Conta (MVP enxuto)

- Cadastro/login por e-mail
- Histórico de pedidos
- Download de comprovante / resumo do pedido
- Reenvio de arquivos (se permitido antes da produção)

### 7.2 Status exibidos ao cliente

| Status no site | Significado |
|----------------|-------------|
| Pedido recebido | Pagamento confirmado ou pedido registrado |
| Aguardando arte | Cliente contratou criação SOIO |
| Arte para aprovação | Prova disponível para cliente |
| Em produção | Arte aprovada; fabricação |
| Pronto para retirada | Retirada na SOIO |
| Enviado | Postagem / transportadora |
| Entregue | Conclusão |
| Em análise comercial | Fluxo misto / orçamento |
| Cancelado | Pedido cancelado |

> **MVP:** status atualizados por integração futura ou painel admin SOIO (atualização manual aceitável no go-live se prazo 30 dias apertar automação).

---

## 8. Integração GestãoClick

### 8.1 Escopo MVP

| Ação | Momento | Endpoint (ref. [`gestaoclick.apib`](./gestaoclick.apib)) |
|------|---------|----------------------------------------------------------|
| Buscar/criar cliente | Checkout confirmado | `GET/POST /clientes` |
| Criar venda ou orçamento | Pagamento OK ou pedido em análise | `POST /vendas` ou `POST /orcamentos` |
| Canal | Sempre | `nome_canal_venda`: **"Site SOIO"** |
| ID externo | Sempre | Campo extra venda ou `observacoes_interna`: `pedido_site_{uuid}` |
| Itens | Sempre | `produto_id`, `variacao_id`, `quantidade`, `valor_venda`, `detalhes` |
| Arte | Sempre | URL do pacote no backend + resumo em `observacoes` / `detalhes` |
| Serviço arte R$ 170 | Quando aplicável | SKU serviço mapeado no ERP |

### 8.2 Regras de negócio na integração

- **Pagamento confirmado** → `POST /vendas` com situação inicial definida (ex.: Confirmado / Aguardando produção).
- **Em análise comercial** → `POST /orcamentos`.
- Fila com retry (limite API: **3 req/s**, **30k/dia**).
- Log de sucesso/erro por pedido.

### 8.3 O que reutilizar da integração Mercos

- Autenticação (`access-token`, `secret-access-token`)
- Padrão de mapeamento produto/cliente
- Tratamento de erros e `loja_id` / `situacao_id`

---

## 9. Conteúdo, marca e páginas

### 9.1 Identidade visual

- Base: arquivos em `C:\SISTEMAS\SOIO\Sites corporativos\MARCA\soio`
- Site institucional: [www.soio.com.br](https://www.soio.com.br) (referência de tom e navegação)
- Layout: inspirado na estrutura de catálogo da [Animacolor](https://animacolor.com.br/), com identidade SOIO (cores, tipografia, logo)

### 9.2 Mapa de páginas MVP

| Página | Conteúdo |
|--------|----------|
| Home | Destaques, categorias, CTA, confiança |
| Categoria / listagem | Crachá, cordão, credencial |
| Produto | Configurador, preço por faixa, prazo, CTA |
| Carrinho | Itens e totais |
| Checkout | Fluxo completo |
| Confirmação | Nº pedido, próximos passos |
| Minha conta | Pedidos e status |
| Quem somos | Texto SOIO |
| FAQ | Dúvidas frequentes |
| Política de privacidade | LGPD |
| Trocas e devoluções | Inclui política de arte/revisões |
| Contato | WhatsApp, telefone, horário, formulário opcional |
| 404 / manutenção | Erros básicos |

### 9.3 Rodapé / contato (fixo)

- WhatsApp: [(11) 97140-6115](https://wa.me/5511971406115)
- Telefone: (11) 5464-3566
- Horário: Segunda a sexta, 9h às 12h e 13h às 17h30

---

## 10. Arquitetura técnica (proposta)

```
[ Frontend — loja.soio.com.br ]
        │
        ▼
[ API Backend SOIO ]
  · catálogo, preços, carrinho, pedidos
  · upload artes / CSV (storage)
  · cálculo frete
  · webhook pagamento
  · fila integração GestãoClick
        │
        ├──► [ Gateway pagamento ]
        ├──► [ API frete ]
        └──► [ API GestãoClick ]
```

### 10.1 Stack sugerida (a validar)

| Camada | Sugestão | Motivo |
|--------|----------|--------|
| Frontend | Next.js ou Nuxt | SEO, performance, SSR catálogo |
| Backend | Node.js (Nest/Fastify) ou .NET | API única, filas, integrações |
| Banco | PostgreSQL | Pedidos, catálogo, usuários |
| Storage | S3-compatible / Azure Blob | Artes e CSV |
| Fila | Redis / Bull | Integração ERP e webhooks |

> Decisão de stack na kickoff técnica (Dia 1).

### 10.2 Admin MVP (painel interno mínimo)

- CRUD produtos, faixas de preço, peso/dimensões
- Prazos por produto/quantidade
- Pedidos: listar, ver arquivos, atualizar status, reprocessar integração ERP
- Gestão de artes (upload prova, contador revisões)

---

## 11. Cronograma — 30 dias (4 semanas)

### Semana 1 — Fundação

- Kickoff; definir stack e subdomínio DNS/SSL
- Contratar/configurar **gateway** (Pix + cartão + antifraude)
- Design system SOIO (logo, cores, componentes)
- Modelo de dados; ambiente dev/homolog
- Cadastro inicial de produtos (crachá, cordão, credencial) e faixas de preço
- Mapear SKUs → GestãoClick

### Semana 2 — Catálogo e personalização

- Listagem e página de produto
- Configurador: upload, variáveis, QR, prévia
- Upload e validação **Planilha Padrao.csv**
- Opção arte SOIO (R$ 170) + briefing
- Carrinho e cálculo de preço por faixa

### Semana 3 — Checkout e integrações

- Checkout completo (PF/PJ, endereço, retirada/entrega)
- Cálculo de frete (peso/volume)
- Pagamento Pix + cartão (webhooks)
- Integração GestãoClick (cliente + venda/orçamento)
- Área do cliente e status (visualização)
- Páginas institucionais

### Semana 4 — QA, conteúdo e go-live

- Painel admin pedidos/status
- Testes ponta a ponta (incl. pedido real em homolog ERP)
- Ajustes LGPD, FAQ, Trocas
- Performance e mobile
- Deploy produção subdomínio
- Treinamento equipe interna (1 sessão)

### Riscos ao prazo de 30 dias

| Risco | Mitigação |
|-------|-----------|
| Gateway não configurado no `.env` | Preencher `SAFE2PAY_API_KEY` e testar sandbox |
| Frete complexo | MVP: tabela própria por região se API atrasar |
| Prévia visual complexa | MVP: prévia 2D simplificada; evoluir depois |
| Integração ERP | Reutilizar código Mercos; fila + retry |
| Escopo personalização alto | Travar “nice to have” pós go-live |

---

## 12. Critérios de aceite do MVP

- [ ] Cliente consegue comprar crachá, cordão ou credencial com quantidade em qualquer faixa (1 a 500+).
- [ ] Preço altera automaticamente ao mudar quantidade.
- [ ] Upload de arte + prévia antes do pagamento.
- [ ] Importação CSV conforme planilha padrão com validação.
- [ ] Opção “criação de arte SOIO” adiciona R$ 170 ao pedido.
- [ ] Checkout com retirada e entrega; frete calculado por peso/volume.
- [ ] Pagamento Pix e cartão com confirmação automática.
- [ ] Pedido pago gera registro no GestãoClick com canal **Site SOIO**.
- [ ] Cliente vê pedido e status na área logada.
- [ ] Páginas institucionais e contatos corretos publicados.
- [ ] Site responsivo e com identidade SOIO.
- [ ] Mercos continua operando sem alteração.

---

## 13. Pendências para kickoff (bloqueantes)

| # | Item | Responsável |
|---|------|-------------|
| 1 | ~~Gateway~~ **Safe2Pay** — configurar Key + Token em `apps/api/.env` | SOIO / TI |
| 2 | ~~Subdomínio~~ **loja.soio.com.br** — configurar DNS/SSL | SOIO / TI |
| 3 | Tabela de **preços** por produto nas 7 faixas | Comercial |
| 4 | Tabela de **prazos** por produto/quantidade | Produção |
| 5 | Mapeamento **produto_id / variacao_id** GestãoClick por SKU | Operação/ERP |
| 6 | **situacao_id** iniciais para venda e orçamento | Operação/ERP |
| 7 | Provedor de **frete** (API ou tabela) | Operação |
| 8 | Regras exatas do fluxo **“em análise comercial”** | Comercial |
| 9 | Endereço e instruções de **retirada** | Operação |
| 10 | Textos finais: Quem somos, FAQ, Trocas, Privacidade | Marketing |
| 11 | Validar pasta **MARCA/soio** (logos vetoriais, paleta HEX) | Marketing |
| 12 | Compartilhar código/spec integração **Mercos** (reuso) | TI |

---

## 14. Referências de arquivos do projeto

| Arquivo | Uso |
|---------|-----|
| [`ANOTACAO-SITE-VENDAS-CRACHAS.md`](./ANOTACAO-SITE-VENDAS-CRACHAS.md) | Requisitos e arquitetura geral |
| [`gestaoclick.apib`](./gestaoclick.apib) | Manual API ERP |
| [`Planilha Padrao.csv`](./Planilha%20Padrao.csv) | Modelo importação lote |

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 2026-06-01 | 1.0 | Escopo MVP consolidado a partir do briefing |
| 2026-06-09 | 1.1 | Gateway Safe2Pay definido; Token + Key; doc integração |
