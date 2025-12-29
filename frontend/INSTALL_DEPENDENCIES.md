# Installation Instructions

## Required Dependency

The Hunt History feature requires the `uuid` package to generate unique IDs for each hunt.

### Install Command

```bash
cd frontend
npm install uuid
```

### Verification

After installation, verify the package was added to `package.json`:

```json
"dependencies": {
  ...
  "uuid": "^9.0.0"
}
```

### Start Development Server

```bash
npm start
```

The application should now run with all features enabled:
- ✅ Inverted layout (summary-grid → TransferList → PlayerList)
- ✅ Damage & Healing statistics section
- ✅ Hunt History with localStorage (62-hunt limit)
- ✅ Export JSON (all, last N, or date range)

## Features Implemented

### 1. Layout Inversion
- Summary cards now appear first
- TransferList second
- PlayerList last
- DamageHealingSection added at the bottom

### 2. Damage & Healing Section
- Shows percentage contribution for each player
- Tooltip displays actual values on hover
- Color-coded stats (red for damage, green for healing)

### 3. Hunt History System
- **Storage**: localStorage (62-hunt limit, FIFO)
- **Auto-save**: Every calculation is saved automatically
- **Drawer UI**: Right-side drawer with floating button (📜)
- **Export Options**:
  - Export all hunts
  - Export last N hunts (user-selectable)
  - Export by date range (start/end date)
- **Management**:
  - Delete individual hunts
  - Clear all history (with confirmation)
- **Data Structure**: Includes damage%, healing%, timestamps, and all calculation results

## Troubleshooting

If you encounter issues:

1. **UUID import error**: Make sure `uuid` is installed (`npm install uuid`)
2. **Translation missing**: Check if i18n files were updated correctly
3. **Drawer not opening**: Check browser console for errors
4. **localStorage quota exceeded**: Clear browser data or reduce hunt limit in `huntHistory.js`
