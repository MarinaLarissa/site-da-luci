# Pre-Deployment Checklist - site-da-luci

## Purpose
Prevent production deployment failures by enforcing systematic pre-flight validation. This checklist catches 4 recurring failure patterns identified in Meta-Improver analysis (2026-01-12).

## MANDATORY Pre-Flight Checks (BEFORE npm run deploy)

### 1. Build Validation ✅
- [ ] **Build succeeds**: `npm run build` completes with 0 errors, 0 warnings
- [ ] **Bundle size check**: Main chunk < 500KB (check build output)
- [ ] **No hardcoded URLs**: Search for `localhost`, `127.0.0.1` in build output
- [ ] **Environment variables**: All production URLs use `process.env` or config file

**Command**:
```bash
npm run build
# Check output for "Compiled successfully" and bundle sizes
```

---

### 2. Code Quality ✅
- [ ] **ESLint passes**: `npm run lint` - 0 errors, 0 warnings
- [ ] **Frontend tests pass**: `npm test` - 100% success rate
- [ ] **Backend tests pass**: `cd backend && npm test` - 100% success rate
- [ ] **No console.log in production code**: Search and remove/replace with proper logging

**Commands**:
```bash
npm run lint
npm test
cd backend && npm test
```

---

### 3. Environment Configuration ✅
- [ ] **Production env file exists**: `.env.production` with all required variables
- [ ] **API endpoints correct**: Backend URL points to production (not localhost)
- [ ] **Service fee constants**: Match official Tibia values (7500, 60000, 250000)
- [ ] **CORS configured**: Production domain whitelisted in backend

**Check**:
```bash
# Verify .env.production exists
ls -la .env.production

# Verify backend URL is production
grep -r "localhost" frontend/src/
# Should return 0 matches in API config files
```

---

### 4. Backend Clean Architecture Validation ✅
- [ ] **Use-cases**: Follow single responsibility principle (one action per use-case)
- [ ] **Domain entities**: No external dependencies (no imports from infrastructure/presentation)
- [ ] **Infrastructure layer**: Properly abstracts I/O (parsers, repositories)
- [ ] **Presentation layer**: Controllers are thin (delegate to use-cases)

**Validation**:
```bash
# Check domain entities have no infrastructure imports
grep -r "from.*infrastructure" backend/src/domain/
# Should return 0 matches

# Check use-cases are focused (< 100 lines typically)
find backend/src/application/use-cases -name "*.js" -exec wc -l {} \;
```

---

### 5. Production-Specific Checks ✅
- [ ] **Console statements removed**: Replace `console.log` with proper logger
- [ ] **Service worker**: Registered correctly in `index.html` or app entry
- [ ] **Favicon present**: `/public/favicon.ico` exists
- [ ] **Meta tags**: Title, description, OG tags present
- [ ] **Error boundaries**: React error boundaries wrap main components

**Commands**:
```bash
# Search for console.log in src (should be minimal)
grep -r "console.log" frontend/src/ backend/src/

# Verify favicon exists
ls -la frontend/public/favicon.ico

# Check service worker registration
grep -r "serviceWorker" frontend/public/index.html
```

---

### 6. Database/State Checks ✅ (if applicable)
- [ ] **Database migrations**: All migrations applied to production DB
- [ ] **Seed data**: Production seed data (not test/dev data)
- [ ] **Connection strings**: Production DB connection configured

---

## Deployment Command

**ONLY execute after ALL checks pass**:

```bash
# Frontend deployment
npm run deploy

# Backend deployment (if separate)
cd backend && npm run deploy
```

---

## Rollback Plan

If deployment fails:

1. **Immediate**: Revert to last known good commit
   ```bash
   git log --oneline  # Find last good commit
   git revert <commit-hash>
   git push
   ```

2. **Re-validate**: Re-run this checklist completely

3. **Fix issues**: Address failing checks

4. **Re-deploy**: Only after all checks pass

---

## Failure Patterns (Meta-Improver Evidence)

### Pattern 1: ESLint Errors (2 occurrences)
- **Symptom**: Build succeeds locally, fails in production CI
- **Root Cause**: ESLint not run before deploy
- **Prevention**: Step 2 (Code Quality) catches this

### Pattern 2: Environment Variable Missing (1 occurrence)
- **Symptom**: Production app fails to load, blank screen
- **Root Cause**: `.env.production` missing or incomplete
- **Prevention**: Step 3 (Environment Configuration) catches this

### Pattern 3: Service Worker Cache Issues (1 occurrence)
- **Symptom**: Old version served after deploy, users see stale UI
- **Root Cause**: Service worker not updated correctly
- **Prevention**: Step 5 (Production-Specific) catches this

### Pattern 4: Backend Use-Case Errors (1 occurrence)
- **Symptom**: API returns 500, clean architecture violated
- **Root Cause**: Domain entities importing from infrastructure
- **Prevention**: Step 4 (Backend Clean Architecture) catches this

---

## Success Criteria

✅ **All checks pass**: 0 warnings, 0 errors
✅ **Deployment succeeds**: No rollback needed
✅ **Production works**: Manual smoke test passes (open app, test main features)

---

## Notes

- **Run checklist EVERY deployment** (no exceptions)
- **Automate where possible**: Add checks to CI/CD pipeline
- **Update checklist**: Add new checks as new failure patterns emerge
- **Estimated time**: 10-15 min (vs 45+ min to debug failed deployment)

---

**Last Updated**: 2026-01-12 (Meta-Improver Analysis)
**Failure Rate Before**: 4 failures / 13 sessions (30.7%)
**Target Failure Rate**: 0% with checklist compliance
