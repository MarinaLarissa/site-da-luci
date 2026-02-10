# Site da Luci - Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend (React SPA - GitHub Pages)"
        UI[React UI Components]
        Hooks[Custom Hooks]
        Services[Services Layer]
        Storage[localStorage + Supabase]
    end

    subgraph "Backend (Render - Express)"
        subgraph "Presentation Layer"
            Routes[Express Routes]
            Controllers[Controllers]
            Validators[Request Validators]
            Middleware[Error Middleware]
        end

        subgraph "Application Layer"
            UC1[CalculateLootSplitUseCase]
            UC2[ParseLootSessionUseCase]
            DTOs[Data Transfer Objects]
        end

        subgraph "Domain Layer"
            Player[Player Entity]
            LootSession[LootSession Entity]
            Transfer[Transfer Value Object]
        end

        subgraph "Infrastructure Layer"
            Parser[TibiaLootParser]
            Config[Configuration]
        end
    end

    subgraph "External Services"
        Supabase[(Supabase - Auth + DB)]
        OCR[OCR.space API]
    end

    UI -->|HTTP Requests| Routes
    Hooks -->|State Management| UI
    Services -->|Axios| Routes
    Services -->|Auth + Sync| Supabase
    Services -->|Screenshot Parse| OCR
    Storage -->|Persist| Services

    Routes --> Controllers
    Controllers --> Validators
    Controllers --> UC1
    Controllers --> UC2

    UC1 --> Player
    UC1 --> Transfer
    UC2 --> Parser
    UC2 --> UC1
    UC2 --> LootSession

    style UI fill:#4fc3f7
    style Hooks fill:#81c784
    style Services fill:#ffb74d
    style Storage fill:#fff176
    style Routes fill:#e57373
    style Controllers fill:#ba68c8
    style UC1 fill:#ffd54f
    style UC2 fill:#ffd54f
    style Player fill:#a5d6a7
    style LootSession fill:#a5d6a7
    style Transfer fill:#a5d6a7
    style Parser fill:#ce93d8
    style Supabase fill:#90caf9
    style OCR fill:#ef9a9a
```

## Frontend Features (All Implemented)

```mermaid
graph TB
    App[App.js - HashRouter]

    App --> LS[Loot Split Calculator<br/>/loot-split]
    App --> SH[Solo Hunt Analyzer<br/>/solo-hunt]
    App --> IC[Imbuement Calculator<br/>/imbuement-calc]
    App --> BP[Bestiary Planner<br/>/bestiary-planner]

    LS --> LSCalc[Session Parser + Transfer Algorithm]
    LS --> LSHist[Hunt History - localStorage]

    SH --> SHCalc[Solo Profit Calculator]
    SH --> SHGT[Gold Token Price - shared state]

    IC --> ICCalc[Imbuement Cost Calculator]
    IC --> ICGT[Gold Token Price - shared state]

    BP --> BPData[900+ Creatures Database]
    BP --> BPOCR[OCR Screenshot Import]
    BP --> BPSync[Supabase Cloud Sync]
    BP --> BPFilter[Filters - Location, Difficulty, etc]

    SHGT -.->|shared| ICGT

    style App fill:#4fc3f7
    style LS fill:#81c784
    style SH fill:#ffb74d
    style IC fill:#ce93d8
    style BP fill:#ffd54f
```

## Layer Dependencies (Clean Architecture)

```mermaid
graph LR
    A[Presentation Layer] -->|depends on| B[Application Layer]
    B -->|depends on| C[Domain Layer]
    B -->|depends on| D[Infrastructure Layer]
    D -->|implements| C

    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#f0ffe1
    style D fill:#ffe1f5
```

**Key Principle**: Dependencies always point INWARD. Domain Layer has ZERO dependencies.

## Loot Split Calculator Flow

```mermaid
sequenceDiagram
    participant User
    participant Controller
    participant ParseUseCase
    participant Parser
    participant CalculateUseCase
    participant Domain

    User->>Controller: POST /api/loot-split/calculate<br/>{rawText}
    Controller->>ParseUseCase: execute(rawText)
    ParseUseCase->>Parser: parse(rawText)
    Parser->>Domain: create Player entities
    Parser-->>ParseUseCase: LootSession
    ParseUseCase->>CalculateUseCase: execute(lootSession)
    CalculateUseCase->>Domain: calculate fair share
    CalculateUseCase->>Domain: classify creditors/debtors
    CalculateUseCase->>Domain: greedy two-pointer algorithm
    CalculateUseCase->>Domain: create Transfer objects
    CalculateUseCase-->>ParseUseCase: transfers[]
    ParseUseCase-->>Controller: {session, transfers}
    Controller-->>User: 200 OK<br/>JSON response
```

## Domain Model

```mermaid
classDiagram
    class Player {
        +String name
        +Boolean isLeader
        +Number loot
        +Number supplies
        +Number balance
        +Number damage
        +Number healing
        +Number profit
        +Number waste
        +get netBalance()
        +get isActive()
    }

    class LootSession {
        +String id
        +Date startTime
        +Date endTime
        +String duration
        +String lootType
        +Number totalLoot
        +Number totalSupplies
        +Number totalBalance
        +Player[] players
    }

    class Transfer {
        <<Value Object>>
        +String from
        +String to
        +Number amount
    }

    class CalculateLootSplitUseCase {
        +execute(lootSession)
        -calculateFairShare()
        -classifyPlayers()
        -generateTransfers()
    }

    class ParseLootSessionUseCase {
        -parser
        -calculateUseCase
        +execute(rawText)
    }

    class TibiaLootParser {
        +parse(rawText)
        -parseSessionHeader()
        -parsePlayerData()
        -parseOptionalFields()
    }

    LootSession o-- Player
    CalculateLootSplitUseCase ..> Player
    CalculateLootSplitUseCase ..> Transfer
    CalculateLootSplitUseCase ..> LootSession
    ParseLootSessionUseCase ..> TibiaLootParser
    ParseLootSessionUseCase ..> CalculateLootSplitUseCase
    TibiaLootParser ..> Player
    TibiaLootParser ..> LootSession
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Client"
        Browser[Web Browser]
    end

    subgraph "GitHub Pages"
        StaticFiles[React Static Files<br/>HTML, CSS, JS]
    end

    subgraph "Render (Backend)"
        API[Express API<br/>Node.js]
        ENV[Environment Config]
    end

    subgraph "Supabase"
        Auth[Auth Service]
        DB[(PostgreSQL)]
    end

    Browser -->|HTTPS| StaticFiles
    Browser -->|API Calls| API
    Browser -->|Auth + Data| Auth
    API --> ENV
    Auth --> DB

    style Browser fill:#4fc3f7
    style StaticFiles fill:#81c784
    style API fill:#ba68c8
    style Auth fill:#ffb74d
    style DB fill:#90caf9
```

## Test Architecture

```mermaid
graph TB
    subgraph "Unit Tests (Jest + RTL)"
        UT1[BestiaryPlanner.test.js]
        UT2[useBestiaryPlanner.test.js]
        UT3[bestiaryStorage.test.js]
        UT4[AuthContext.test.js]
        UT5[DataPersistence.test.js]
        UT6[PageComponents.test.js]
        UT7[imageUtils.test.js]
    end

    subgraph "E2E Tests (Cypress)"
        E2E1[loot-split-calculator.cy.js<br/>11 tests]
        E2E2[bestiary-planner.cy.js]
        E2E3[navigation.cy.js]
    end

    UT1 --> Components[Components]
    UT2 --> HooksLayer[Hooks]
    UT3 --> ServicesLayer[Services]
    UT4 --> Contexts[Contexts]
    UT5 --> ServicesLayer
    UT6 --> Components

    E2E1 --> Frontend[Full App]
    E2E2 --> Frontend
    E2E3 --> Frontend

    style Components fill:#4fc3f7
    style HooksLayer fill:#81c784
    style ServicesLayer fill:#ffb74d
    style Contexts fill:#ce93d8
    style Frontend fill:#ffd54f
```

---

**Last Updated**: 2026-02-10
**Status**: Frontend complete (4 tools), Backend foundation complete, Supabase integrated
