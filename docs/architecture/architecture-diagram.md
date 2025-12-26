# Site da Luci - Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend (Phase 3 - Pending)"
        UI[React UI Components]
        Hooks[Custom Hooks]
        Services[API Services]
    end

    subgraph "Backend (Phase 1 Complete / Phase 2 Pending)"
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
            MongoDB[(MongoDB Atlas)]
            Config[Configuration]
        end
    end

    UI -->|HTTP Requests| Routes
    Hooks -->|State Management| UI
    Services -->|Axios| Routes

    Routes --> Controllers
    Controllers --> Validators
    Controllers --> UC1
    Controllers --> UC2

    UC1 --> Player
    UC1 --> Transfer
    UC2 --> Parser
    UC2 --> UC1
    UC2 --> LootSession

    Parser -.->|Future| MongoDB
    Config -.->|Future| MongoDB

    style UI fill:#4fc3f7
    style Hooks fill:#81c784
    style Services fill:#ffb74d
    style Routes fill:#e57373
    style Controllers fill:#ba68c8
    style UC1 fill:#ffd54f
    style UC2 fill:#ffd54f
    style Player fill:#a5d6a7
    style LootSession fill:#a5d6a7
    style Transfer fill:#a5d6a7
    style Parser fill:#ce93d8
    style MongoDB fill:#90caf9
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

## Loot Split Calculator Flow (Phase 1)

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

## Data Flow Architecture

```mermaid
flowchart TD
    A[TIBIA Client Data] -->|Paste| B[Frontend Input]
    B -->|HTTP POST| C[Express Route]
    C --> D[Validator Middleware]
    D -->|Valid| E[Controller]
    D -->|Invalid| F[Error Response]

    E --> G[ParseLootSessionUseCase]
    G --> H[TibiaLootParser]
    H --> I{Valid Format?}
    I -->|Yes| J[Create Domain Entities]
    I -->|No| K[Parse Error]

    J --> L[CalculateLootSplitUseCase]
    L --> M[Calculate Fair Share]
    M --> N[Classify Players]
    N --> O[Greedy Algorithm]
    O --> P[Generate Transfers]

    P --> Q[Format Response]
    Q --> R[JSON to Frontend]
    R --> S[Display Results]

    K --> F
    F --> S

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style J fill:#f1f8e9
    style L fill:#fce4ec
    style O fill:#e0f2f1
    style S fill:#c8e6c9
    style F fill:#ffcdd2
```

## Domain Model (Phase 1 Complete)

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

## Algorithm Visualization (Greedy Two-Pointer)

```mermaid
flowchart TD
    Start([Start: LootSession]) --> Filter[Filter Active Players]
    Filter --> CalcShare[Calculate Fair Share<br/>totalBalance / activePlayers]
    CalcShare --> CalcDiff[Calculate Differences<br/>netBalance - fairShare]

    CalcDiff --> Split{Split Players}
    Split -->|difference > 0| Creditors[Creditors Array<br/>Sort DESC]
    Split -->|difference < 0| Debtors[Debtors Array<br/>Sort ASC]

    Creditors --> TwoPointer[Two-Pointer Algorithm]
    Debtors --> TwoPointer

    TwoPointer --> Match[Match Largest<br/>Creditor + Debtor]
    Match --> CalcAmount[amountToTransfer =<br/>min(abs(debtor), creditor)]
    CalcAmount --> CreateTransfer[Create Transfer Object<br/>from: creditor<br/>to: debtor<br/>amount: rounded]

    CreateTransfer --> UpdateDiff[Update Differences<br/>debtor += amount<br/>creditor -= amount]
    UpdateDiff --> CheckZero{Difference = 0?}

    CheckZero -->|Debtor = 0| IncDebtor[debtorIndex++]
    CheckZero -->|Creditor = 0| IncCreditor[creditorIndex++]
    CheckZero -->|Both = 0| IncBoth[Both indexes++]

    IncDebtor --> MorePlayers{More Players?}
    IncCreditor --> MorePlayers
    IncBoth --> MorePlayers

    MorePlayers -->|Yes| Match
    MorePlayers -->|No| Sort[Sort Transfers<br/>by amount DESC]
    Sort --> Group[Group by Sender]
    Group --> End([Return Transfers])

    style Start fill:#4caf50
    style Filter fill:#81c784
    style CalcShare fill:#aed581
    style Split fill:#ffeb3b
    style Creditors fill:#ff9800
    style Debtors fill:#f44336
    style TwoPointer fill:#9c27b0
    style CreateTransfer fill:#2196f3
    style End fill:#4caf50
```

## Test Architecture (TDD - Phase 1)

```mermaid
graph TB
    subgraph "Unit Tests (80%)"
        UT1[Player.test.js<br/>18 tests]
        UT2[LootSession.test.js<br/>8 tests]
        UT3[Transfer.test.js<br/>5 tests]
        UT4[TibiaLootParser.test.js<br/>9 tests]
        UT5[CalculateLootSplitUseCase.test.js<br/>15 tests]
        UT6[ParseLootSessionUseCase.test.js<br/>7 tests]
    end

    subgraph "Integration Tests (15% - Phase 2)"
        IT1[API Endpoints<br/>Supertest]
        IT2[Database Integration<br/>MongoDB Memory Server]
    end

    subgraph "E2E Tests (5% - Phase 3)"
        E2E1[Full User Flow<br/>Cypress]
    end

    UT1 --> Domain[Domain Layer]
    UT2 --> Domain
    UT3 --> Domain
    UT4 --> Infra[Infrastructure Layer]
    UT5 --> App[Application Layer]
    UT6 --> App

    IT1 -.->|Phase 2| Pres[Presentation Layer]
    IT2 -.->|Phase 2| Infra

    E2E1 -.->|Phase 3| Frontend[React Frontend]

    style Domain fill:#a5d6a7
    style Infra fill:#ce93d8
    style App fill:#ffd54f
    style Pres fill:#ba68c8
    style Frontend fill:#4fc3f7
```

## Deployment Architecture (Phase 4 - Future)

```mermaid
graph TB
    subgraph "Client"
        Browser[Web Browser]
    end

    subgraph "CDN / GitHub Pages"
        StaticFiles[React Static Files<br/>HTML, CSS, JS]
    end

    subgraph "Render (Backend)"
        API[Express API<br/>Node.js 20+]
        ENV[Environment Config]
    end

    subgraph "MongoDB Atlas"
        DB[(MongoDB Database)]
        Collections[Sessions Collection<br/>Users Collection]
    end

    subgraph "CI/CD - GitHub Actions"
        Tests[Run Tests]
        Build[Build Frontend]
        Deploy[Deploy to Render + GH Pages]
    end

    Browser -->|HTTPS| StaticFiles
    Browser -->|API Calls| API
    API --> ENV
    API --> DB
    DB --> Collections

    Tests --> Build
    Build --> Deploy

    style Browser fill:#4fc3f7
    style StaticFiles fill:#81c784
    style API fill:#ba68c8
    style DB fill:#90caf9
    style Tests fill:#ffb74d
```

## Future Scalability (Multi-Game Support)

```mermaid
graph TB
    subgraph "Game-Agnostic Core"
        Parser[IGameLootParser<br/>Interface]
        Factory[ParserFactory]
        SharedCalc[Shared Calculation Logic]
    end

    subgraph "Game-Specific Implementations"
        TibiaParser[TibiaLootParser]
        WoWParser[WoWLootParser]
        FFXIVParser[FFXIVLootParser]
    end

    Factory -->|creates| TibiaParser
    Factory -->|creates| WoWParser
    Factory -->|creates| FFXIVParser

    TibiaParser -->|implements| Parser
    WoWParser -->|implements| Parser
    FFXIVParser -->|implements| Parser

    Parser --> SharedCalc

    style Parser fill:#ffd54f
    style Factory fill:#ba68c8
    style SharedCalc fill:#a5d6a7
    style TibiaParser fill:#81c784
```

---

**Generated**: 2025-12-26
**Phase**: 1 Complete (Backend Foundation)
**Next**: Phase 2 (Backend API)