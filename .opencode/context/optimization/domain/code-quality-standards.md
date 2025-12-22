# Code Quality Standards

**Category**: optimization/domain  
**Purpose**: Naming conventions, code organization, readability standards specific to the project  
**Used by**: quality-assurance-agent, orchestrator

---

## Overview

This guide covers code quality standards, naming conventions, and readability guidelines for the lys-lf-react-19 project.

## Naming Conventions

### Component & File Naming

```typescript
// Components: PascalCase
// Examples:
- Button.tsx
- UserProfile.tsx
- ServiceCard.tsx
- ContactForm.tsx
- TeamMember.tsx

// Rule: File name must match component name
✅ Button.tsx exports Button component
❌ button.tsx exports Button component (confusing)

// Test files: [ComponentName].test.tsx
- Button.test.tsx
- UserProfile.test.tsx
```

### Variable & Function Naming

```typescript
// Functions: camelCase, descriptive, action-verb based
const fetchUser = async (id: string) => {};
const formatDate = (date: Date) => {};
const validateEmail = (email: string) => {};
const calculateTotal = (items: Item[]) => {};

// Variables: camelCase, descriptive
const userData = { name: 'John' };
const isLoading = false;
const apiResponse = await fetch(url);

// Boolean variables: is*, has*, can*, should*
const isValid = true;
const hasPermission = false;
const canSubmit = true;
const shouldRender = true;

// ❌ Avoid: Single letters, ambiguous names
let x = 5;           // ❌ Bad
let temp = 'value';  // ❌ Unclear purpose
let data = {};       // ❌ Too generic

// ✅ Good: Clear, descriptive names
let retryCount = 5;
let formErrors = [];
let userProfileData = {};
```

### Constants Naming

```typescript
// Constants: UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';
export const MAX_RETRIES = 3;
export const DEFAULT_TIMEOUT = 5000;
export const PAGE_SIZE = 20;
export const MODAL_Z_INDEX = 1000;

// Only use UPPER_SNAKE_CASE for constants
// Regular variables use camelCase even if they appear constant-like in one scope
```

### Type & Interface Naming

```typescript
// Types & Interfaces: PascalCase
interface User {
  id: string;
  name: string;
  email: string;
}

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';
type ApiResponse<T> = { data: T; status: number };

// Props interfaces: ComponentName + Props
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

// State types: ComponentName + State (if needed)
interface FormState {
  values: FormValues;
  errors: FormErrors;
  isSubmitting: boolean;
}
```

### Custom Hook Naming

```typescript
// Hooks: use* pattern
function useUser(userId: string) {
  // Custom hook logic
}

function useFetch<T>(url: string) {
  // Custom hook logic
}

function useForm<T extends Record<string, any>>(initialValues: T) {
  // Custom hook logic
}

function useLocalStorage(key: string) {
  // Custom hook logic
}

// Never create hooks without use* prefix
// ❌ function getUser() {} - Looks like regular function, confuses React Rules of Hooks
// ✅ function useUser() {} - Clear that it's a hook
```

### Folder Naming

```typescript
// Folders: kebab-case or camelCase, consistent throughout project
// Recommend: kebab-case for consistency with Next.js conventions

src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── features/
│   │   ├── user-profile/
│   │   ├── service-card/
│   │   ├── contact-form/
│   │   └── team-member/
├── hooks/
├── services/
└── utils/

// ❌ Inconsistent naming (DON'T MIX)
components/UserProfile/  // PascalCase
components/service-card/ // kebab-case
components/contactForm/  // camelCase

// ✅ Consistent naming
components/user-profile/
components/service-card/
components/contact-form/
components/team-member/
```

## Code Organization Standards

### File Organization Within Component

```typescript
// 1. Imports
import React, { useState, useCallback } from 'react';
import { useUser } from '@/hooks/useUser';
import { formatDate } from '@/utils/formatting';
import styles from './UserCard.module.scss';

// 2. Types/Interfaces
interface UserCardProps {
  userId: string;
  onSelect?: (userId: string) => void;
}

// 3. Component
export const UserCard: React.FC<UserCardProps> = ({ userId, onSelect }) => {
  const user = useUser(userId);
  
  return (
    <div className={styles.card}>
      {/* JSX */}
    </div>
  );
};

// 4. Default export
export default UserCard;
```

### Import Organization

```typescript
// 1. React/Next.js imports first
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party library imports
import axios from 'axios';

// 3. Internal imports (absolute paths)
import { User } from '@/types';
import { useUser } from '@/hooks';
import { formatDate } from '@/utils';

// 4. Styles last
import styles from './Component.module.scss';

// Clean up unused imports
// ✅ Only keep imports you actually use
// ❌ Don't import things you might need later
```

### Module Exports

```typescript
// Prefer named exports for components
export const Button: React.FC<ButtonProps> = () => {};
export const Card: React.FC<CardProps> = () => {};

// Barrel export in index.ts for convenience
// components/index.ts
export { Button } from './Button';
export { Card } from './Card';
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';

// Usage
import { Button, Card, type ButtonProps } from '@/components';

// Default exports: Use for single main component per file
export default UserProfile; // If it's the main export
```

## Code Readability Standards

### Function Complexity

```typescript
// Recommended: Functions under 30 lines
// Avoid: Functions over 50 lines - break them down

// ❌ Too complex
function processUserData(user, settings, filters) {
  if (user && user.active) {
    if (settings.emailNotifications) {
      const filtered = user.data.filter(item => {
        return filters.every(filter => 
          filter.condition(item)
        );
      });
      // ... 30 more lines
    }
  }
}

// ✅ Simplified with helper functions
function isUserActive(user: User): boolean {
  return user && user.active;
}

function filterUserData(data: any[], filters: Filter[]): any[] {
  return data.filter(item => filters.every(filter => filter.condition(item)));
}

function processUserData(user: User, settings: Settings, filters: Filter[]) {
  if (!isUserActive(user)) return;
  if (!settings.emailNotifications) return;
  
  return filterUserData(user.data, filters);
}
```

### Conditional Nesting

```typescript
// Recommended: Maximum 3 levels of nesting
// Avoid: Nesting beyond 3 levels (called "callback hell" or "pyramid of doom")

// ❌ Too nested
if (user) {
  if (user.isAdmin) {
    if (user.isActive) {
      if (permissions.canDelete) {
        // Delete user
      }
    }
  }
}

// ✅ Early return / guard clauses
function canDeleteUser(user: User, permissions: Permissions): boolean {
  if (!user) return false;
  if (!user.isAdmin) return false;
  if (!user.isActive) return false;
  return permissions.canDelete;
}

if (canDeleteUser(user, permissions)) {
  // Delete user
}
```

### Line Length

```typescript
// Recommended: 80-100 characters per line
// Avoid: Lines longer than 120 characters

// ❌ Too long (hard to read)
const user = fetchUserData(userId, options.includeSettings, options.includeNotifications, options.includePreferences);

// ✅ Better formatted
const user = fetchUserData(userId, {
  includeSettings: options.includeSettings,
  includeNotifications: options.includeNotifications,
  includePreferences: options.includePreferences,
});

// ✅ Or use defaults if available
const user = await fetchUserData(userId, { includeAll: true });
```

### Magic Numbers & Strings

```typescript
// ❌ Magic numbers without context
if (user.age > 18) { /* ... */ }
const timeout = 5000;
const discount = 0.15;

// ✅ Named constants with context
const ADULT_AGE_THRESHOLD = 18;
const API_TIMEOUT_MS = 5000;
const SEASONAL_DISCOUNT_RATE = 0.15;

if (user.age > ADULT_AGE_THRESHOLD) { /* ... */ }
```

## Comment Standards

### When to Write Comments

```typescript
// ✅ Good comments - explain WHY, not WHAT

// User must be fetched before calculating permissions
// because permission rules depend on user role
const user = await fetchUser(userId);

// Using Map instead of Object for O(1) lookup performance
// when checking 10k+ items frequently
const userCache = new Map();

// Retry on timeout because API sometimes returns 504
// but succeeds on retry within 3 seconds
const MAX_RETRIES = 3;

// ❌ Bad comments - obvious from code

// Set x to 5
const x = 5;

// Check if user is active
if (user.active) { }

// Loop through items
for (const item of items) { }
```

### Comment Placement

```typescript
// ✅ Comments above the code they explain
// Calculate total price with tax
const totalWithTax = subtotal * (1 + TAX_RATE);

// ✅ Inline comments for quick clarifications
const value = importantData.find(i => i.id === target); // O(n) lookup, consider index

// ❌ Comments too far from code
const x = calculateValue();
// This is important because...
// ...lots of explanation...
const y = processValue(x);

// ❌ Block comments in middle of logic (breaks readability)
function process(data) {
  const step1 = data.map(x => x * 2);
  
  /* This is a very long explanation
     of what the next 10 lines do... */
  
  const step2 = step1.filter(x => x > 0);
  // Better: Extract to separate function
}
```

### JSDoc for Public APIs

```typescript
// ✅ Document public functions and exports
/**
 * Fetches user data from the API
 * @param userId - The ID of the user to fetch
 * @param options - Optional fetch configuration
 * @returns Promise resolving to user data
 * @throws {ApiError} If the API request fails
 * @example
 * const user = await fetchUser('123');
 * const user = await fetchUser('123', { includeProfile: true });
 */
export async function fetchUser(userId: string, options?: FetchOptions): Promise<User> {
  // ...
}

// ✅ Document complex types
/**
 * Represents the state of an async operation
 * @template T - The type of data returned on success
 */
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// ❌ Don't over-comment simple code
/**
 * Sets the user
 * @param user The user to set
 */
const setUser = (user: User) => {
  setUserState(user);
};
```

## Code Formatting Standards

### Consistency Through Prettier

```typescript
// Project should use Prettier for consistent formatting
// Run: npx prettier --write .

// Key formatting rules
- Quotes: Single quotes for strings
- Semicolons: Always
- Trailing commas: ES5
- Print width: 100
- Tab width: 2 spaces
- Arrow functions: Always parentheses around parameters
```

### Spacing Standards

```typescript
// ✅ Spacing around operators
const total = subtotal + tax;
const isActive = user.status === 'active';

// ✅ Spacing in object/array literals
const user = { name: 'John', age: 30 };
const items = ['apple', 'banana', 'orange'];

// ✅ Spacing in function parameters
function calculate(a: number, b: number): number {
  return a + b;
}

// ✅ Spacing around curly braces
if (condition) {
  // code
} else {
  // code
}

// ❌ No spacing in identifiers
const isUserActive = true;       // ✅ Good
const is_user_active = true;     // ❌ Bad (snake_case in JS)
const IsUserActive = true;       // ❌ Bad (PascalCase for variables)
```

## Code Quality Metrics

### Complexity Limits

| Metric | Threshold | Action |
|--------|-----------|--------|
| Cyclomatic Complexity | > 10 | Refactor function |
| Cognitive Complexity | > 15 | Simplify logic |
| Function Length | > 30 lines | Extract into smaller functions |
| File Size | > 300 lines | Split into modules |
| Parameter Count | > 4 | Use object parameter |
| Nesting Depth | > 4 levels | Flatten with guard clauses |

### Coverage Targets

- Components: 80%+ coverage
- Hooks: 90%+ coverage
- Utils: 100% coverage
- Pages: 60%+ coverage

## Quality Standards Checklist

- [ ] All names follow conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)
- [ ] File names match component/export names
- [ ] Imports organized and sorted
- [ ] No unused imports or variables
- [ ] Functions under 30 lines
- [ ] Maximum 3 levels of nesting
- [ ] No magic numbers (use constants)
- [ ] Comments explain WHY, not WHAT
- [ ] Code formatted with Prettier
- [ ] No console.log or debugger statements
- [ ] Error handling included
- [ ] Type annotations present
- [ ] Tests included for functions
- [ ] JSDoc for public APIs
