# Safe2Pay — gateway de pagamento (Site SOIO)

**Fornecedor definido:** [Safe2Pay](https://developers.safe2pay.com.br/)  
**Documentação:** https://developers.safe2pay.com.br/reference/autentica%C3%A7%C3%A3o  
**MVP:** Pix + cartão de crédito (+ antifraude/3DS quando aplicável)

---

## Credenciais (painel Safe2Pay)

No painel: **Administração → Configurações → Integração**

| Campo no painel | Variável `.env` (API) | Uso |
|-----------------|----------------------|-----|
| **Key** | `SAFE2PAY_API_KEY` | Header `X-API-KEY` em todas as requisições |
| **Token** | `SAFE2PAY_TOKEN` | Reservado / credencial complementar (webhooks ou fluxos específicos) |

> **Segurança:** nunca commitar valores reais. Usar apenas `apps/api/.env` (local) ou secrets do servidor.

### Ambientes

| Ambiente | Variável | URL base (padrão) |
|----------|----------|-------------------|
| Sandbox | `SAFE2PAY_SANDBOX=true` | `https://payment.safe2pay.com.br` |
| Produção | `SAFE2PAY_SANDBOX=false` | `https://payment.safe2pay.com.br` |

Chaves **Sandbox** e **Produção** são distintas — trocar ao mudar de ambiente.

---

## Autenticação HTTP

```http
Content-Type: application/json
X-API-KEY: {SAFE2PAY_API_KEY}
```

Exemplo:

```bash
curl -X GET "https://payment.safe2pay.com.br/v2/payment" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: sua_key_aqui"
```

Referência: [Autenticação Safe2Pay](https://developers.safe2pay.com.br/reference/autentica%C3%A7%C3%A3o)

---

## Métodos de pagamento (MVP)

| Código | Método | MVP |
|--------|--------|-----|
| `6` | Pix | Sim |
| `2` | Cartão de crédito | Sim |
| `1` | Boleto | Fase 2 |

Referência: [Overview cobrança](https://developers.safe2pay.com.br/docs/cobranca-overview)

---

## Fluxo no Site SOIO

```
[ Checkout web ]  →  [ API SOIO apps/api ]  →  [ Safe2Pay API ]
                              ↑
                    X-API-KEY só no backend
                              ↓
                    [ Webhook Safe2Pay ]  →  confirma pagamento  →  GestãoClick
```

1. Cliente finaliza checkout no site.
2. **Backend** cria cobrança na Safe2Pay (`PaymentMethod` 6 ou 2).
3. Pix: retorna QR/copia e cola; cartão: processa no servidor (tokenização quando possível).
4. **Webhook** confirma pagamento → API atualiza pedido → integração GestãoClick.

---

## Endpoints principais (referência)

| Ação | Referência |
|------|------------|
| Criar cobrança | [Criar cobrança](https://developers.safe2pay.com.br/reference/cobranca-criar) |
| Pix | PaymentMethod = `6` |
| Cartão | PaymentMethod = `2` |
| Webhooks | Configurar URL no painel → `POST /api/v1/webhooks/safe2pay` (a implementar) |

---

## Configuração local

1. Copie `apps/api/.env.example` → `apps/api/.env`
2. Preencha:

```env
SAFE2PAY_API_KEY=sua_key_do_painel
SAFE2PAY_TOKEN=seu_token_do_painel
SAFE2PAY_SANDBOX=true
```

3. Reinicie a API: `npm run dev:api`

4. Verifique (sem expor segredos):

```bash
curl http://localhost:4000/health
```

Campo `payments.safe2pay` deve indicar `configured: true`.

---

## Boas práticas

- Key e Token **somente** no backend (`apps/api`).
- Não usar credenciais no Next.js (`apps/web`).
- Sandbox para desenvolvimento; produção só no deploy.
- Em vazamento: revogar no painel Safe2Pay e gerar novas chaves.

---

## Pendências técnicas

- [ ] Implementar `POST /api/v1/checkout/pix`
- [ ] Implementar `POST /api/v1/checkout/card`
- [ ] Webhook de confirmação + idempotência
- [ ] Mapear `forma_pagamento_id` GestãoClick após pagamento confirmado
- [ ] Validar no sandbox qual campo (Token vs Key) vai em `X-API-KEY` se houver erro 401

---

## Histórico

| Data | Descrição |
|------|-----------|
| 2026-06-09 | Fornecedor Safe2Pay definido; Token + Key disponibilizados pela SOIO |
