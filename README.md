# SOIO Suite

Monorepo Java para sistemas desktop e ferramentas internas da **SOIO**.

Repositorio: https://github.com/tisoio/SISTEMA_SOIO_SUITE

## Estrutura

```
SISTEMA_SOIO_SUITE/
├── LEIA-ME.txt             # Guia rapido (portugues)
├── pom.xml                 # POM pai (Maven multi-modulo)
├── modules/                # Bibliotecas compartilhadas
│   └── soio-suite-core/    # Utilitarios comuns
├── apps/                   # Aplicacoes (um modulo Maven por sistema)
│   └── exemplo-desktop/    # Modelo pronto para copiar
├── config/templates/       # Modelos de configuracao
└── scripts/                # Build e empacotamento
```

## Requisitos

- JDK 17+
- Maven 3.9+

## Primeiros passos

```powershell
cd C:\GITHUB\SISTEMA_SOIO_SUITE
.\scripts\build.ps1
```

Ou:

```powershell
mvn clean package
```

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
