# Site da Luci - Backend

Backend API for Site da Luci TIBIA player tools, built with Clean Architecture and TDD.

## Architecture

4-layer Clean Architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│              (Controllers / HTTP Handlers)               │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                   APPLICATION LAYER                      │
│              (Use Cases / Business Logic)                │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                     DOMAIN LAYER                         │
│              (Entities / Domain Models)                  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                     │
│         (Database / External Services / Parsers)         │
└─────────────────────────────────────────────────────────┘
```

## Phase 1: Backend Foundation (Complete)

### Domain Layer
- ✅ Player.js - Player entity with netBalance and isActive logic
- ✅ LootSession.js - Session entity with duration parsing
- ✅ Transfer.js - Immutable value object for transfers

### Infrastructure Layer
- ✅ TibiaLootParser.js - Parses TIBIA client loot data

### Application Layer
- ✅ CalculateLootSplitUseCase.js - Greedy two-pointer algorithm
- ✅ ParseLootSessionUseCase.js - Orchestrates parsing + calculation

### Tests
- ✅ All entities have comprehensive unit tests
- ✅ Parser has format validation tests
- ✅ Use cases have business logic tests
- ✅ TDD approach: tests written FIRST

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

## Project Structure

```
backend/
├── src/
│   ├── domain/
│   │   └── entities/
│   │       ├── Player.js
│   │       ├── LootSession.js
│   │       └── Transfer.js
│   │
│   ├── application/
│   │   └── use-cases/
│   │       └── loot-split/
│   │           ├── CalculateLootSplitUseCase.js
│   │           └── ParseLootSessionUseCase.js
│   │
│   └── infrastructure/
│       └── parsers/
│           └── TibiaLootParser.js
│
├── tests/
│   └── unit/
│       ├── domain/entities/
│       ├── application/use-cases/
│       └── infrastructure/parsers/
│
└── package.json
```

## Next Steps (Phase 2)

- [ ] Implement Presentation Layer (Express controllers)
- [ ] Add API routes and validators
- [ ] Integration tests with Supertest
- [ ] Error handling middleware
- [ ] MongoDB integration (session history)

## Documentation

See `/docs/PDI.md` for complete business rules and requirements.
