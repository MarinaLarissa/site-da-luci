# Shared Styled Components

Phase 4 - Centralized reusable styled components for site-da-luci.

## Overview

This directory contains shared styled-components that are reused across multiple features (SoloHuntAnalyzer, LootSplitCalculator, ImbuementCalculator).

**Goal**: Reduce code duplication, improve maintainability, and ensure consistent styling.

## Available Components

### Typography (`Typography.js`)

Text components with consistent styling across the app.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `SectionTitle` | Section headings (h2) | `$size`, `$color`, `$weight`, `$align`, `$marginBottom` |
| `SectionDescription` | Section descriptions/subtitles | `$size`, `$color`, `$marginBottom`, `$italic` |
| `PageTitle` | Page-level headings (h1) | `$color`, `$align`, `$marginBottom`, `$gradient` |
| `PageDescription` | Page-level descriptions | `$size`, `$color`, `$align`, `$marginBottom` |

**Usage:**
```jsx
import { SectionTitle, SectionDescription } from '../common/styled';

<SectionTitle $size="lg" $color="#c39bd3">My Section</SectionTitle>
<SectionDescription $italic>Optional description text</SectionDescription>
```

**Size Options:**
- `$size="sm"` - Small (16px title, 13px description)
- `$size="md"` - Medium (20px title, 14px description) - default
- `$size="lg"` - Large (24px title, 16px description)

---

### Textarea (`Textarea.js`)

Styled textarea for multi-line input.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Textarea` | Multi-line text input | `$monospace`, `$minHeight`, `$variant` |

**Usage:**
```jsx
import { Textarea } from '../common/styled';

<Textarea
  $monospace
  $minHeight="200px"
  placeholder="Paste your session data..."
/>
```

---

### Card (`Card.js`)

Card container with variants for consistent layouts.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Card` | Main container | `$variant`, `$padding`, `$radius`, `$marginBottom`, `$hover` |
| `CardHeader` | Header section | `$marginBottom`, `$justify` |
| `CardBody` | Main content area | `$padding` |
| `CardFooter` | Footer with actions | `$marginTop`, `$justify` |

**Variants:**
- `default` - Subtle border (default)
- `elevated` - Box shadow, no border
- `outlined` - Strong gold border, transparent background

**Usage:**
```jsx
import { Card, CardHeader, CardBody, CardFooter } from '../common/styled';

<Card $variant="elevated" $hover>
  <CardHeader>
    <SectionTitle>Card Title</SectionTitle>
  </CardHeader>
  <CardBody>
    Content goes here
  </CardBody>
  <CardFooter $justify="space-between">
    <Button>Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>
```

---

### ButtonGroup (`ButtonGroup.js`)

Container for multiple buttons with consistent spacing.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `ButtonGroup` | Button container | `$gap`, `$justify`, `$marginTop`, `$fullWidthMobile` |

**Usage:**
```jsx
import { ButtonGroup } from '../common/styled';

<ButtonGroup $justify="flex-end" $gap="16px">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</ButtonGroup>
```

**Note:** Buttons become full-width on mobile by default. Set `$fullWidthMobile={false}` to disable.

---

### Modal (`Modal.js`)

Modal dialog components with animations.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `ModalOverlay` | Backdrop with blur | `$zIndex` |
| `ModalContent` | Main container | `$width`, `$maxWidth`, `$padding` |
| `ModalHeader` | Header section | `$marginBottom` |
| `ModalTitle` | Modal title | - |
| `ModalBody` | Content area | `$padding` |
| `ModalFooter` | Footer actions | `$marginTop`, `$justify` |
| `ModalCloseButton` | Close button | - |

**Usage:**
```jsx
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton
} from '../common/styled';

{showModal && (
  <ModalOverlay onClick={handleClose}>
    <ModalContent $width="600px" onClick={e => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>Select Imbuements</ModalTitle>
        <ModalCloseButton onClick={handleClose}>&times;</ModalCloseButton>
      </ModalHeader>
      <ModalBody>
        {/* Modal content */}
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </ModalFooter>
    </ModalContent>
  </ModalOverlay>
)}
```

---

## Props Convention

All props use the `$` prefix (transient props) to prevent them from being passed to the DOM:
- `$size` instead of `size`
- `$color` instead of `color`
- etc.

This follows styled-components best practices and avoids React warnings about unknown DOM attributes.

---

## Migration Guide

When migrating existing components to use shared components:

### 1. Import from common/styled
```jsx
// Before
import { SectionTitle, InputActions } from './MyComponent.styles';

// After
import { SectionTitle, ButtonGroup } from '../common/styled';
```

### 2. Re-export with alias (backwards compatibility)
If renaming would break existing code, use re-export with alias:
```jsx
// In MyComponent.styles.js
export { ButtonGroup as InputActions } from '../common/styled';
```

### 3. Remove local definitions
Delete the local styled-component definitions that are now imported.

---

## Files Structure

```
common/styled/
├── index.js          # Barrel export (import from here)
├── Textarea.js       # Textarea component (ETAPA 32)
├── Typography.js     # SectionTitle, PageTitle, etc. (ETAPA 33)
├── Card.js           # Card, CardHeader, etc. (ETAPA 34)
├── ButtonGroup.js    # ButtonGroup (ETAPA 35)
├── Modal.js          # ModalOverlay, ModalContent, etc. (ETAPA 36)
└── README.md         # This documentation (ETAPA 39)
```

---

## Theme Integration

All components use theme tokens from `frontend/src/theme.js`. Ensure ThemeProvider wraps your app.

Common theme paths used:
- `theme.colors.bg.card` - Card backgrounds
- `theme.colors.text.primary` - Primary text
- `theme.colors.accent.gold` - Accent color (titles, highlights)
- `theme.colors.border.light` - Subtle borders
- `theme.spacing.md/lg/xl` - Consistent spacing
- `theme.radius.lg` - Border radius

---

## Contributing

When adding new shared components:

1. Create new file in `common/styled/`
2. Add export to `index.js`
3. Document props and usage in this README
4. Add JSDoc comments to component
5. Test in at least 2 different features

---

**Phase 4 Status**: ETAPAs 32-36 complete, ETAPA 39 (documentation) complete.
