# PDI - Personal Development Plan
## Site da Luci - Business Rules & Requirements

---

## PROJECT INFORMATION

**Project Name:** site-da-luci
**Project Type:** Fullstack Web Application
**Primary Purpose:** Tools for TIBIA game players
**Location:** `C:\Users\NEXLAB\Documents\Projetos\site-da-luci`

---

## GENERAL BUSINESS RULES

### 1. Technology Stack (Mandatory)
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js
- **Database:** Supabase (PostgreSQL) + localStorage fallback
- **Architecture:** Layered architecture + design patterns
- **Code Structure:** Multiple files and layers (NO monolithic files)
- **Testing:** TDD with Cypress (E2E) + Jest (Unit/Integration)
- **Comments:** All code comments MUST be in English
- **Language Choice:** JavaScript (NOT TypeScript)
- **Frontend Tool:** Create React App
- **Backend Hosting:** Render (free tier)
- **Frontend Hosting:** GitHub Pages

### 2. Architecture Requirements
- Follow Clean Architecture (Hexagonal Architecture)
- Separate concerns into 4 layers:
  1. **Presentation Layer** (Controllers, HTTP Handlers)
  2. **Application Layer** (Use Cases, Business Logic)
  3. **Domain Layer** (Entities, Domain Models)
  4. **Infrastructure Layer** (Database, External Services, Parsers)

### 3. Quality Standards
- **TDD Required:** Write tests BEFORE implementation
- **Test Coverage:** 80% unit, 15% integration, 5% E2E
- **Design Patterns:** Repository, Use Case, Factory, Dependency Injection, Strategy, DTO, Value Object
- **Scalability:** Prepared for future expansion to other games
- **Code Quality:** ESLint + Prettier configured

---

## LOOT SPLIT CALCULATOR - BUSINESS RULES

### Feature Overview
First tool in the application. Calculates fair distribution of loot among TIBIA players after a hunting session.

### Input Format
User pastes CTRL+V text from TIBIA client in the following format:

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

### Player Data Rules

**Required Fields:**
- Name
- Loot (gold received)
- Supplies (gold spent)
- Balance (loot - supplies)
- Damage (damage dealt)
- Healing (healing done)

**Optional Fields:**
- Profit (additional gold to add to balance)
- Waste (additional gold to subtract from balance)
- Leader flag (indicated by "(Leader)" in name)

**Active Player Definition:**
A player is considered ACTIVE if:
- `damage > 0` OR `healing > 0`

**Inactive players MUST be excluded from calculations.**

### Calculation Rules

#### 1. Net Balance Calculation
```
netBalance = balance + profit - waste
```

#### 2. Fair Share Calculation
```
totalBalance = sum of all active players' netBalance
numberOfActivePlayers = count of active players
fairShare = totalBalance / numberOfActivePlayers
```

#### 3. Player Classification
For each active player:
```
difference = netBalance - fairShare

IF difference > 0:
  Player is a CREDITOR (has excess money, will SEND transfers)

IF difference < 0:
  Player is a DEBTOR (needs money, will RECEIVE transfers)

IF difference == 0:
  Player is balanced (no transfer needed)
```

#### 4. Transfer Generation Algorithm (Greedy Two-Pointer)

**Goal:** Minimize the number of transfers required to balance all players.

**Steps:**
1. Sort debtors by difference ascending (most negative first)
2. Sort creditors by difference descending (most positive first)
3. Use two-pointer technique to match largest debtor with largest creditor
4. Continue until all players are balanced

**Direction:** CREDITOR → DEBTOR (creditor SENDS money to debtor)

**Pseudocode:**
```
debtors = activePlayers.filter(p => p.difference < 0).sortBy(difference ASC)
creditors = activePlayers.filter(p => p.difference > 0).sortBy(difference DESC)
transfers = []

debtorIndex = 0
creditorIndex = 0

WHILE debtorIndex < debtors.length AND creditorIndex < creditors.length:
  debtor = debtors[debtorIndex]
  creditor = creditors[creditorIndex]

  amountToTransfer = MIN(abs(debtor.difference), creditor.difference)

  transfers.push({
    from: creditor.name,   // WHO sends
    to: debtor.name,       // WHO receives
    amount: ROUND(amountToTransfer)  // rounded to integer
  })

  debtor.difference += amountToTransfer
  creditor.difference -= amountToTransfer

  IF debtor.difference == 0:
    debtorIndex++

  IF creditor.difference == 0:
    creditorIndex++

RETURN transfers sorted by amount DESC, grouped by sender
```

#### 5. Profit Per Hour Calculation
```
durationMinutes = parse session duration from "HH:MMh" format
profitPerPlayerPerHour = (fairShare / durationMinutes) * 60
```

### Output Format Requirements

#### Session Summary Display
```
=== LOOT SPLIT CALCULATOR ===

Session Summary:
  Total Profit: 11.89kk (11,886,314 gp)
  Fair Share: 3.96kk per player (3,962,105 gp)
  Duration: 03:08h
  Profit/Hour: 1.26kk per player (1,264,289 gp/h)

Active Players: 3
  ✓ Lofi Shades (Leader) - Balance: 11.94kk
  ✓ Luciana Burks - Balance: -104k
  ✓ Young Vex - Balance: 49k

─────────────────────────────────

LOFI SHADES must execute:

  transfer 4066247 to Luciana Burks
  transfer 3912667 to Young Vex

[📋 Copy Commands]
─────────────────────────────────
```

#### Number Formatting (TIBIA Convention)
Brazilian "kk" notation:
- 1,000 = 1k
- 1,000,000 = 1kk
- 12,937,605 = 12.94kk

**JavaScript Implementation:**
```javascript
function formatGold(amount) {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + 'kk';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2) + 'k';
  }
  return amount.toString();
}
```

#### Copyable Transfer Commands Format
```
transfer [exact_amount] to [Player Name]
```

**Rules:**
- Amount MUST be exact integer (no decimals, no formatting)
- Player name MUST match exactly as in input
- One command per line
- Commands grouped by WHO must execute them
- Include "Copy to Clipboard" button for each group

#### Multiple Creditors Scenario
If more than one player needs to send transfers, group by sender:

```
PLAYER A must execute:
  transfer 100000 to Player C
  [📋 Copy Commands]

PLAYER B must execute:
  transfer 50000 to Player C
  transfer 75000 to Player D
  [📋 Copy Commands]
```

### Validation Rules

#### Input Validation
- Session data header MUST be present
- At least ONE active player required
- Player names MUST NOT be empty
- Numeric fields MUST be valid numbers
- Balance MUST equal (Loot - Supplies)

#### Error Messages
- **Invalid format:** "Invalid loot data format. Please paste the session data from TIBIA."
- **No active players:** "No active players found. All players have 0 damage and 0 healing."
- **Empty input:** "Please paste loot data to calculate split."
- **Calculation error:** "Error calculating transfers. Please check the data and try again."

### Edge Cases to Handle

1. **Single Active Player**
   - Display: "No transfers needed. Only one active player."
   - No transfer list shown

2. **All Players Balanced**
   - Display: "All players already have fair share. No transfers needed."
   - Show summary but no transfers

3. **Negative Total Balance**
   - Allow calculation (hunting session with loss)
   - Show negative values correctly
   - Example: "Total Profit: -2.5kk (waste session)"

4. **Inactive Players in List**
   - Parse all players
   - Filter out inactive (damage = 0 AND healing = 0)
   - Display count: "Active Players: X of Y total"

5. **Profit/Waste Adjustments**
   - Include in netBalance calculation
   - Display separately in player details
   - Example: "Balance: 100k | Profit: +50k | Waste: -20k | Net: 130k"

6. **Rounding Precision**
   - Fair share: calculated with decimals internally
   - Transfer amounts: ALWAYS round to integer
   - Display values: use formatGold() function
   - Verification: sum of transfers should equal creditor's excess (±1 due to rounding)

---

## FUTURE FEATURES (For Planning)

### User Authentication (Implemented)
- Save session history per user
- Login with email/password via Supabase Auth
- Supabase tables include `user_id` field

### Session History
- List past hunting sessions
- Filter by date, player, profit range
- Export to CSV/Excel

### Additional Tools (Implemented)
- Solo Hunt Analyzer (route: `/solo-hunt`)
- Imbuement Calculator (route: `/imbuement-calc`)
- Bestiary Planner with OCR import (route: `/bestiary-planner`)

### Multi-Game Support
- Abstract parser interface: `IGameLootParser`
- Factory pattern to select parser by game
- Shared calculation logic
- Plugin architecture for new games

---

## DEPLOYMENT REQUIREMENTS

### Frontend (GitHub Pages)
- Static build from Create React App
- Deploy to `https://[username].github.io/site-da-luci`
- CORS configuration for backend API

### Backend (Render)
- Free tier web service
- Auto-deploy from Git push
- Environment variables for Supabase connection
- Health check endpoint: `/api/health`

### Database (Supabase)
- Free tier
- Auth: Supabase Auth (email/password)
- Storage: Supabase PostgreSQL + localStorage fallback
- Frontend connects via `@supabase/supabase-js`

### CI/CD (GitHub Actions)
- Run tests on pull request
- Run linting checks
- Deploy frontend on merge to main
- Deploy backend on merge to main

---

## DEVELOPMENT WORKFLOW

### TDD Cycle (MANDATORY)
1. **RED:** Write failing test first
2. **GREEN:** Write minimal code to pass test
3. **REFACTOR:** Improve code quality
4. Repeat for each feature/fix

### Test Types
- **Unit Tests (Jest):** Domain entities, use cases, parsers
- **Integration Tests (Jest + Supertest):** API endpoints, database operations
- **E2E Tests (Cypress):** Full user workflows

### Git Workflow
- Feature branches: `feature/loot-split-calculator`
- Commit messages in English
- Pull requests required for main branch
- Review checklist:
  - All tests passing
  - ESLint passing
  - No console.log/debugger statements
  - Business rules documented

---

## NOTES & CONSTRAINTS

- This is a PDI (Personal Development Plan) project
- NOT related to nex-web-test project
- Must follow modern Node.js market standards
- Priority on learning and best practices over speed
- Code quality and architecture are MORE important than quick delivery

---

**Last Updated:** 2026-02-10
**Version:** 2.0