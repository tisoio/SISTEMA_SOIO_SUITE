# SOIO Suite

Monorepo da **SOIO**: sistemas Java (desktop), **loja online** (Node.js) e ferramentas internas.

Repositorio: https://github.com/tisoio/SISTEMA_SOIO_SUITE

## Estrutura

```
SISTEMA_SOIO_SUITE/
├── LEIA-ME.txt             # Guia rapido (portugues)
├── pom.xml                 # POM pai (Maven multi-modulo)
├── modules/                # Bibliotecas compartilhadas Java
│   └── soio-suite-core/
├── apps/
│   ├── exemplo-desktop/    # Modelo Java desktop
│   └── loja-online/        # Loja https://loja.soio.com.br (Next.js + API)
├── config/templates/       # Modelos de configuracao
└── scripts/                # Build e empacotamento
```

## Requisitos

**Java (desktop):**

- JDK 17+
- Maven 3.9+

**Loja online (`apps/loja-online`):**

- Node.js 20+
- npm 10+

## Primeiros passos

**Java (Suite):**

```powershell
cd C:\GITHUB\SISTEMA_SOIO_SUITE
.\scripts\build.ps1
```

Ou: `mvn clean package`

**Loja online:**

```powershell
cd C:\GITHUB\SISTEMA_SOIO_SUITE
.\scripts\dev-loja.ps1
```

Ou em `apps\loja-online`: `npm install` e `npm run dev:all` — ver [apps/loja-online/README.md](apps/loja-online/README.md).

## Criar um novo sistema (app)

1. Crie a pasta `apps/meu-sistema/` com um `pom.xml` filho do pai.
2. Adicione o modulo em `pom.xml` (raiz), bloco `<modules>`:

```xml
<module>apps/meu-sistema</module>
```

3. Estrutura minima do app:

```
apps/meu-sistema/
├── pom.xml
└── src/main/java/com/soio/meu/sistema/App.java
```

4. Dependencia opcional do core:

```xml
<dependency>
    <groupId>com.soio</groupId>
    <artifactId>soio-suite-core</artifactId>
</dependency>
```

## Git

```powershell
git status
git add .
git commit -m "feat: descreva a alteracao"
git push
```

## Convencoes

| Item | Padrao |
|------|--------|
| `groupId` | `com.soio` |
| Pacotes | `com.soio.<nome-do-sistema>` |
| Config local | `config/*.properties` (nao versionar senhas) |
| Executavel Windows | Gerar fora do Git em `dist/` ou pasta de deploy |
