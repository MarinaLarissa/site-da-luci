# Site da Luci 🎮

> Modern fullstack web application providing tools for TIBIA players

[![Phase](https://img.shields.io/badge/Phase-1%20Complete-success)](https://github.com)
[![Tests](https://img.shields.io/badge/Tests-49%2F49%20Passing-brightgreen)](https://github.com)
[![Coverage](https://img.shields.io/badge/Coverage-98.12%25-brightgreen)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📋 Project Overview

**Site da Luci** is a comprehensive web application designed to help TIBIA game players with various tools and calculators. The first tool is a **Loot Split Calculator** that fairly distributes hunting session profits among team members.

### Key Features (Phase 1)

- ✅ **Loot Split Calculator**: Fair distribution algorithm using greedy two-pointer technique
- ✅ **Clean Architecture**: 4-layer architecture for scalability and maintainability
- ✅ **TDD Approach**: 98.12% test coverage with comprehensive test suite
- ✅ **TIBIA Format Support**: Parses native TIBIA client loot data
- 🔄 **React Frontend**: Coming in Phase 3
- 🔄 **REST API**: Coming in Phase 2

## 🏗️ Architecture

This project follows **Clean Architecture** (Hexagonal Architecture) with strict layer separation:

```mermaid
graph TD
    A[Presentation Layer<br/>Controllers, Routes, Validators] --> B[Application Layer<br/>Use Cases, Business Logic]
    B --> C[Domain Layer<br/>Entities, Value Objects]
    C --> D[Infrastructure Layer<br/>Database, Parsers, External Services]

    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#f0ffe1
    style D fill:#ffe1f5
```

### Layer Responsibilities

| Layer | Responsibility | Examples |
|-------|---------------|----------|
| **Presentation** | HTTP handling, request validation | Controllers, Routes, Middlewares |
| **Application** | Business logic orchestration | Use Cases, DTOs |
| **Domain** | Core business entities and rules | Player, LootSession, Transfer |
| **Infrastructure** | External concerns | TibiaLootParser, MongoDB, APIs |

## 🎯 Loot Split Algorithm

The calculator uses a **greedy two-pointer algorithm** to minimize the number of transfers:

```mermaid
flowchart LR
    A[Parse TIBIA Data] --> B[Calculate Fair Share]
    B --> C[Classify Players<br/>Creditors vs Debtors]
    C --> D[Sort by Difference]
    D --> E[Match Largest<br/>Creditor + Debtor]
    E --> F[Generate Transfer]
    F --> G{More Players?}
    G -->|Yes| E
    G -->|No| H[Return Transfers]

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#f1f8e9
    style D fill:#fce4ec
    style E fill:#e0f2f1
    style F fill:#fff9c4
    style H fill:#c8e6c9
```

### Example Calculation

**Input** (3 players, 11.89kk total balance):
- Lofi Shades: 11.94kk → **Creditor** (+7.98kk excess)
- Luciana Burks: -104k → **Debtor** (needs 4.07kk)
- Young Vex: 49k → **Debtor** (needs 3.91kk)

**Output** (2 transfers only):
```
Lofi Shades transfer 4066247 to Luciana Burks
Lofi Shades transfer 3912667 to Young Vex
```

## 📂 Project Structure

```
site-da-luci/
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── domain/            # ✅ Phase 1 Complete
│   │   │   └── entities/      # Player, LootSession, Transfer
│   │   ├── application/       # ✅ Phase 1 Complete
│   │   │   └── use-cases/     # CalculateLootSplit, ParseLootSession
│   │   ├── infrastructure/    # ✅ Phase 1 Complete
│   │   │   └── parsers/       # TibiaLootParser
│   │   └── presentation/      # 🔄 Phase 2 (pending)
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── validators/
│   └── tests/
│       └── unit/              # 49 tests, 98.12% coverage
│
├── frontend/                   # 🔄 Phase 3 (pending)
│   └── (React app with Create React App)
│
├── docs/
│   ├── architecture/
│   │   └── clean-architecture.md
│   └── decisions/
│       └── ADR-001-loot-split-algorithm.md
│
└── README.md                   # You are here
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/site-da-luci.git
cd site-da-luci

# Install backend dependencies
cd backend
npm install

# Run tests
npm test

# Watch mode (auto-rerun on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Running Tests

```bash
# Backend unit tests
cd backend
npm test

# Expected output:
# Test Suites: 6 passed, 6 total
# Tests:       49 passed, 49 total
# Coverage:    98.12%
```

## 🧪 Test Coverage

| Component | Coverage | Tests |
|-----------|----------|-------|
| Domain Entities | 100% | 18 tests |
| Use Cases | 98.5% | 22 tests |
| Parsers | 95% | 9 tests |
| **Total** | **98.12%** | **49 tests** |

## 📊 Development Progress

### ✅ Phase 1: Backend Foundation (COMPLETE)

- [x] Project setup with Clean Architecture
- [x] Domain entities (Player, LootSession, Transfer)
- [x] TibiaLootParser with regex validation
- [x] CalculateLootSplitUseCase (greedy algorithm)
- [x] ParseLootSessionUseCase (orchestration)
- [x] Comprehensive test suite (49 tests)
- [x] TDD compliance (tests first, code second)

### 🔄 Phase 2: Backend API (Next)

- [ ] Express server setup
- [ ] REST API endpoints (`POST /api/loot-split/calculate`)
- [ ] Request validation middleware
- [ ] Error handling middleware
- [ ] Integration tests with Supertest
- [ ] API documentation (Swagger/OpenAPI)

### 🔄 Phase 3: Frontend (Planned)

- [ ] React app with Create React App
- [ ] UI components (Sidebar, Calculator, TransferList)
- [ ] API service layer (Axios)
- [ ] Custom hooks (useLootSplit)
- [ ] Cypress E2E tests
- [ ] Responsive design with TailwindCSS

### 🔄 Phase 4: Deployment (Future)

- [ ] MongoDB Atlas integration
- [ ] Backend deployment to Render
- [ ] Frontend deployment to GitHub Pages
- [ ] CI/CD with GitHub Actions
- [ ] Environment configuration

## 🎮 How It Works

### 1. User Input (TIBIA Format)

User pastes loot data directly from TIBIA client:

```
Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 12,937,605
Supplies: 1,051,291
Balance: 11,886,314

Lofi Shades (Leader)
  Loot: 12,120,799
  Supplies: 179,781
  Balance: 11,941,018
  Damage: 17,660,082
  Healing: 785,634

Luciana Burks
  Loot: 277,020
  Supplies: 381,162
  Balance: -104,142
  Damage: 17,145,590
  Healing: 9,169,753

Young Vex
  Loot: 539,786
  Supplies: 490,348
  Balance: 49,438
  Damage: 18,737,566
  Healing: 2,666,860
```

### 2. Processing

- Parse session metadata (dates, duration, totals)
- Extract player data (name, loot, supplies, balance, stats)
- Filter active players (damage > 0 OR healing > 0)
- Calculate fair share (total balance / active players)
- Classify creditors (have excess) vs debtors (need money)
- Run greedy two-pointer algorithm to minimize transfers

### 3. Output

```
=== SESSION SUMMARY ===
Total Profit: 11.89kk (11,886,314 gp)
Fair Share: 3.96kk per player (3,962,105 gp)
Session Duration: 03:08h
Profit/Hour: 1.26kk per player (1,264,289 gp/h)

=== TRANSFERS REQUIRED ===
Lofi Shades must execute:

transfer 4066247 to Luciana Burks
transfer 3912667 to Young Vex

[📋 Copy to Clipboard]
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express
- **Language**: JavaScript (ES6+)
- **Testing**: Jest
- **Database**: MongoDB Atlas (future)

### Frontend (Phase 3)
- **Framework**: React 18+
- **Build Tool**: Create React App
- **Styling**: TailwindCSS
- **Testing**: Cypress (E2E), React Testing Library

### DevOps (Phase 4)
- **CI/CD**: GitHub Actions
- **Backend Hosting**: Render
- **Frontend Hosting**: GitHub Pages
- **Monitoring**: (TBD)

## 📖 Documentation

- [Business Rules (PDI)](docs/PDI.md) - Complete requirements and business logic
- [Clean Architecture Guide](docs/architecture/clean-architecture.md)
- [ADR-001: Loot Split Algorithm](docs/decisions/ADR-001-loot-split-algorithm.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md) (Phase 3)

## 🤝 Contributing

This is a **Personal Development Plan (PDI)** project. Contributions are welcome after Phase 3 is complete.

### Development Workflow

1. **TDD First**: Write tests BEFORE implementation
2. **Clean Architecture**: Respect layer boundaries
3. **Code Quality**: ESLint + Prettier configured
4. **Commit Messages**: Follow Conventional Commits

### Running Quality Checks

```bash
# Linting
npm run lint

# Format code
npm run format

# Run all tests
npm test

# Coverage report
npm run test:coverage
```

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**PDI Project** - Learning fullstack development with modern patterns

## 🙏 Acknowledgments

- TIBIA game by CipSoft
- Clean Architecture by Robert C. Martin
- TDD methodology

---

**Status**: 🟢 Phase 1 Complete | 🔄 Phase 2 In Progress

**Last Updated**: 2025-12-26