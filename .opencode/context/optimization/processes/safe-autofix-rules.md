# Safe Auto-Fix Rules

**Category**: optimization/processes  
**Purpose**: Explicit rules for what can be auto-fixed vs what needs approval  
**Used by**: All subagents, orchestrator

---

## Overview

This document defines which code changes are safe to apply automatically and which require explicit human approval. The goal is to maximize efficiency while preserving code safety and user control.

## Safe Auto-Fixes (No Approval Needed)

These changes can be applied immediately without user review:

### 1. Import Optimization

**Safe**: Always safe to fix
```typescript
// ✅ Remove unused imports
// Before
import { Button, Card, Modal } from '@/components';
import { useState, useEffect } from 'react';

// After
import { Button } from '@/components';
import { useState } from 'react';

// ✅ Organize/sort imports
// Before
import z from 'axios';
import React from 'react';
import fetch from '@/utils/api';

// After
import React from 'react';
import z from 'axios';
import fetch from '@/utils/api';

// ✅ Fix duplicate imports
// Before
import { Button } from '@/components';
import { Button } from '@/components';

// After
import { Button } from '@/components';
```

### 2. Unused Variable/Export Removal

**Safe**: Always safe to remove
```typescript
// ✅ Remove unused variables
let tempVar = 'never used';  // ❌ Removed
let counter = 0;             // ❌ Removed if truly unused

// ✅ Remove unused function
const neverCalled = () => {}; // ❌ Removed

// ✅ Remove unused exports
export const unusedFunction = () => {}; // ❌ Removed

// ⚠️ CAUTION: Only remove if truly unused
// Check package.json "exports" - some exports are used externally
```

### 3. Type Annotation Additions

**Safe**: Only obvious types
```typescript
// ✅ Add obvious type from context
function process(value: string) {
  let result = value.toUpperCase();
  return result;
  // result type added: string ✓
}

// ✅ Add obvious built-in types
let count = 0;        // Add type: number
let isActive = true;  // Add type: boolean
let items = [];       // Add type: never[] (then user specifies)

// ❌ NOT safe - requires user decision
let data = fetchData(); // Type unknown, needs user review
let config = getConfig(); // Complex type, needs user review
```

### 4. Formatting via Prettier

**Safe**: Always safe - consistent formatting
```typescript
// ✅ Prettier formatting applied
// - Fix indentation
// - Fix spacing
// - Fix quote consistency
// - Fix line length breaks
// - Fix trailing commas

// Prettier config: .prettierrc or prettier.config.js
// Run: npx prettier --write .
```

### 5. Fix Obvious Type Mismatches

**Safe**: Only obvious, clear fixes
```typescript
// ✅ Type mismatch - obvious fix
function getUserAge(): number {
  return "25"; // ❌ Should be: return 25;
}

// ✅ Wrong type in useState
const [count, setCount] = useState("0");
// Should be: useState(0) or useState<number>(0)

// ❌ NOT safe - complex type issues
function process(data: any) { // Needs user decision on proper type
  return data.value;
}
```

### 6. Convert Simple Any Types

**Safe**: Only when safe inference possible
```typescript
// ✅ Safe: any from JSON.parse with clear type
const user: any = JSON.parse('{"name": "John"}');
// Can infer: const user: { name: string } = ...

// ✅ Safe: Function parameter with obvious type
function greet(name: any) {
  return `Hello, ${name}`;
}
// Can infer: name: string (used with template literal)

// ❌ NOT safe: Unknown source
function processUnknown(data: any) { // Requires user decision
  return data.something;
}
```

### 7. Add Missing React/Next.js Imports

**Safe**: JSX-related imports only
```typescript
// ✅ Add missing React import
// If using JSX but no React import
function Component() {
  return <div>Content</div>;
}
// Add: import React from 'react';

// ✅ Add missing FC type
export const Button = (props) => <button {...props} />;
// Add: import { FC } from 'react';
// And: export const Button: FC = (props) => ...

// ✅ Add missing hook imports
function Component() {
  useState(); // ❌ Missing import
}
// Add: import { useState } from 'react';
```

### 8. Remove Debug/Development Code

**Safe**: Always safe to remove
```typescript
// ✅ Remove console statements
console.log('debug info');      // ❌ Removed
console.warn('warning');        // ❌ Removed
console.error('error info');    // ❌ Removed (might want to keep error logs)

// ✅ Remove debugger
debugger;                        // ❌ Removed

// ✅ Remove development-only code
if (process.env.NODE_ENV === 'development') {
  // Remove entire block in production builds
}

// ⚠️ Be careful with intentional logging
// Keep: Logger.error() for production logging
// Keep: Error boundaries and proper error handling
```

### 9. Fix ESLint Warnings (Non-Breaking)

**Safe**: Non-breaking ESLint rules only
```typescript
// ✅ Fix unused variables (ESLint)
const unused = 5; // ❌ Remove

// ✅ Fix unused parameters (ESLint)
function handler(event: Event, unused: string) {
  // Remove unused parameter
}

// ✅ Fix missing dependencies (ESLint)
useEffect(() => {
  fetchUser(userId);
}, []); // ❌ Add userId to dependencies

// ❌ NOT safe - might indicate actual issues
// - Complexity warnings (might indicate logic error)
// - Long function warnings (might need refactoring)
// - Prop drilling warnings (might indicate design issue)
```

### 10. Organize Export Statements

**Safe**: Only reordering/organizing
```typescript
// ✅ Organize exports
export const Button = () => {};
export const Link = () => {};
export const Card = () => {};
// Reorganize: Alphabetical or by type

// ✅ Create barrel export
export { Button } from './Button';
export { Card } from './Card';
// Reorder for consistency

// ❌ NOT safe: Removing exports
// Never remove exports without analyzing usage
```

## Changes Requiring Approval

These changes need explicit user review and approval:

### 1. Component Refactoring

**Requires approval**: Logic or behavior changes
```typescript
// ❌ Splitting components
// User must approve new component structure

// ❌ Extracting custom hooks
// Logic change, user must review

// ❌ Merging components
// Behavior change, user must review
```

### 2. Architectural Reorganization

**Requires approval**: Structure changes
```typescript
// ❌ Moving files/folders
// User must confirm new structure works

// ❌ Restructuring state management
// User must review state flow changes

// ❌ Changing module boundaries
// User must verify dependencies
```

### 3. Breaking API Changes

**Requires approval**: Always
```typescript
// ❌ Changing function signatures
// function fetchUser(id: string) => function fetchUser(id: string, options: {})

// ❌ Changing component props
// <Button onClick={onClick} /> => <Button on Click={handleClick} />

// ❌ Changing module exports
// export const method => renamed to exportedMethod
```

### 4. Type Safety Decisions

**Requires approval**: Complex type conversions
```typescript
// ❌ Converting any to specific type (complex)
function process(data: any) {
  // User must decide what type 'data' should be
  // Might be User | Post | something else
}

// ❌ Changing type constraints
// type Status = string => type Status = 'active' | 'inactive' | 'pending'
// User must verify all usages

// ❌ Making types stricter
// Optional property => Required property
// User must handle all usages
```

### 5. Performance Optimizations (Complex)

**Requires approval**: If behavior might change
```typescript
// ❌ Adding React.memo with custom comparison
const Component = memo(ComponentImpl, (prev, next) => {
  // User must verify comparison logic
});

// ❌ Changing rendering strategy
// State lifting, Context introduction, etc.

// ❌ Removing dependency from useEffect
useEffect(() => {
  // User must verify implications
}, []);
```

### 6. Utility/Service Extraction

**Requires approval**: When extracting logic
```typescript
// ❌ Extract duplicated validation
// User must verify extracted function works for all cases

// ❌ Extract shared logic to custom hook
// User must review hook implementation

// ❌ Extract to shared service
// User must verify service contract
```

### 7. Dependency Changes

**Requires approval**: Any version or package changes
```typescript
// ❌ Update dependency version
// Might have breaking changes

// ❌ Replace dependency
// Different API, different behavior

// ❌ Add new dependency
// Increases bundle size, needs user approval
```

### 8. Test Implementation

**Requires approval**: Actual test code
```typescript
// ✅ Generate test templates (no approval needed)
// ❌ Implement actual tests (requires approval)
// Tests are code that needs human judgment
```

## Approval Workflow

### How to Request Approval

When change requires approval:

```markdown
## Approval Needed

### Change: [Title]
- **Type**: [Type of change]
- **Severity**: [Critical/Important/Minor]
- **Files**: [List of files]
- **Lines**: [Approximate lines changed]

### Rationale
[Explanation of why this change is needed]

### Impact Assessment
- Breaking changes: [Yes/No]
- Dependencies affected: [List]
- Tests affected: [List]

### Proposed Change
[Show before/after code]

### Alternatives Considered
[Other approaches]

**Ready for approval: Yes/No**
[Wait for user response]
```

### User Approval Response

```
✅ APPROVED - Apply this change
⏸️ HOLD - Wait, need to discuss
❌ REJECTED - Don't apply this change
🔄 MODIFY - Apply with these modifications
```

## Safety Guidelines

### The 3-Question Test

Before auto-fixing, ask:

1. **Is it obvious?** - Would any developer agree this is the fix?
2. **Is it safe?** - Could it break anything?
3. **Is it reversible?** - Can the user easily undo it?

If all 3 are YES → Auto-fix is safe  
If any is NO → Requires approval

### Conservative Approach

When in doubt:
- Request approval rather than auto-fix
- Better to ask than break something
- User time is more valuable than automation
- Trust is critical

### Atomic Changes

Each auto-fix should be:
- **Single-purpose**: One thing at a time
- **Testable**: Can verify it works
- **Reviewable**: User can understand the change
- **Reversible**: Can be undone if needed

## Approval Checklist

Before declaring something auto-fixable:

- [ ] Change is obviously correct
- [ ] No ambiguity in intended fix
- [ ] Won't break other code
- [ ] Easy to understand what changed
- [ ] Easy to revert if needed
- [ ] Aligns with project standards
- [ ] No side effects possible
- [ ] User would expect this fix

## Examples by Category

### Safe Auto-Fixes ✅

```typescript
// Import cleanup - Safe
import { unused1, unused2, Button } from '@/components';
// → import { Button } from '@/components';

// Unused export - Safe
export const deadFunction = () => {};
// → Removed

// Console cleanup - Safe
console.log('debug');
// → Removed

// Prettier formatting - Safe
const x=5;y=10;
// → const x = 5; y = 10;

// Fix obvious type - Safe
const count: string = 5;
// → const count: number = 5;
```

### Requires Approval ⏸️

```typescript
// Component split - Requires approval
function UserForm() { /* 200 lines */ }
// → Split into UserFormContainer + UserFormPresentation

// Hook extraction - Requires approval
useEffect(() => { fetchUser(); }, []);
// → Extract to useUser custom hook

// Type conversion - Requires approval
function process(data: any) { }
// → function process(data: UserData) { }

// State lifting - Requires approval
// Move state from child to parent component

// API change - Requires approval
fetchUser(id) → fetchUser(id, { includeProfile: true })
```

## Implementation Notes

- Auto-fixes are applied immediately and shown to user
- Approval-needed changes are presented for review
- Each change is logged for audit trail
- User can review all auto-fixes applied
- User can revert any auto-fix
- Approval decisions are documented
