# TypeScript Type Safety Standards

**Category**: optimization/domain  
**Purpose**: TypeScript patterns, strict typing strategies, and React 19 type patterns  
**Used by**: type-safety-specialist, orchestrator

---

## Overview

This guide covers TypeScript best practices for strict type safety, focusing on React 19 patterns, eliminating any types, and using proper type inference.

## TypeScript Strict Mode Configuration

### Recommended tsconfig.json

```json
{
  "compilerOptions": {
    // Enable strict type checking
    "strict": true,
    
    // Individual strict options
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    // Additional safety
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    
    // Module resolution
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    
    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Type Safety Patterns

### Pattern 1: Avoid `any` Type

```typescript
// ❌ Bad - Loses type safety
let data: any;
function process(value: any): any {
  return value.property;
}

// ✅ Good - Explicit types
let data: UserData;
function process(value: User): UserData {
  return value.profile;
}

// ✅ Good - Let TypeScript infer
const data = { name: 'John', age: 30 };
// Type inferred as: { name: string; age: number }
```

### Pattern 2: Proper Function Typing

```typescript
// ❌ Bad - Implicit return type
function fetchUser(id: string) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

// ✅ Good - Explicit return type
interface User {
  id: string;
  name: string;
  email: string;
}

function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

// ✅ Good - Let TypeScript infer (when obvious)
const getUserName = (user: User): string => user.name;
```

### Pattern 3: Generic Types for Reusability

```typescript
// Instead of repeating similar types
interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

type UserResponse = ApiResponse<User>;
type PostResponse = ApiResponse<Post>;

// Using generics in functions
function processApiResponse<T>(response: ApiResponse<T>): T {
  if (response.error) throw response.error;
  return response.data;
}
```

### Pattern 4: Utility Types

```typescript
// Pick - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
// Result: { id: string; name: string }

// Omit - Exclude specific properties
type UserCreate = Omit<User, 'id' | 'createdAt'>;
// Result: { name: string; email: string }

// Partial - Make all properties optional
type UserUpdate = Partial<User>;
// Result: { id?: string; name?: string; ... }

// Required - Make all properties required
type UserRequired = Required<UserUpdate>;

// Record - Create object with specific keys
type PageStatus = Record<'home' | 'about' | 'contact', boolean>;
// Result: { home: boolean; about: boolean; contact: boolean }

// Readonly - Make properties read-only
type ReadonlyUser = Readonly<User>;
// Result: All properties read-only
```

### Pattern 5: Discriminated Unions

```typescript
// Type-safe handling of different states
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: User };
type ErrorState = { status: 'error'; error: Error };

type UserState = LoadingState | SuccessState | ErrorState;

function renderUser(state: UserState) {
  switch (state.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <UserProfile user={state.data} />;
    case 'error':
      return <Error message={state.error.message} />;
  }
}

// TypeScript ensures all cases handled and has correct types
```

### Pattern 6: Const Assertions for Literals

```typescript
// Without const assertion - inferred as string
const button = 'submit'; // type: string

// With const assertion - inferred as literal
const button = 'submit' as const; // type: 'submit'

// Useful for discriminators
const actions = {
  UPDATE: 'update' as const,
  DELETE: 'delete' as const,
  CREATE: 'create' as const,
} as const;

type Action = typeof actions[keyof typeof actions];
// type: 'update' | 'delete' | 'create'
```

## React 19 Type Patterns

### Pattern 1: Typed Component Props

```typescript
// ✅ Good - Explicit interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...rest
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...rest}>
      {isLoading ? '...' : children}
    </button>
  );
};
```

### Pattern 2: Typed Hooks

```typescript
// useState with generics
const [count, setCount] = useState<number>(0);
const [items, setItems] = useState<Item[]>([]);
const [user, setUser] = useState<User | null>(null);

// useCallback with explicit types
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  console.log(e.currentTarget.value);
};

// useEffect with proper cleanup
useEffect(() => {
  const handler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
  };
  
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

// useRef with proper typing
const inputRef = useRef<HTMLInputElement>(null);
```

### Pattern 3: Custom Hook Types

```typescript
// Typed custom hook
interface UseUserOptions {
  autoFetch?: boolean;
  timeout?: number;
}

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useUser(
  userId: string,
  options: UseUserOptions = {}
): UseUserReturn {
  const { autoFetch = true, timeout = 5000 } = options;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      setUser(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (autoFetch) refetch();
  }, [userId, autoFetch, refetch]);

  return { user, loading, error, refetch };
}
```

### Pattern 4: Event Handler Types

```typescript
// Properly typed event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
}

function Form({ onSubmit }: FormProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(Object.fromEntries(formData));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    // value is properly typed as string
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}
```

### Pattern 5: Context Type Safety

```typescript
// ✅ Good - Typed context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const value: ThemeContextType = {
    theme,
    toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Pattern 6: Children and Slots

```typescript
// Properly type children
interface LayoutProps {
  children: React.ReactNode;
}

// Type children as specific component
interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

// Type multiple named slots
interface CardProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

function Card({ header, body, footer }: CardProps) {
  return (
    <div>
      <div>{header}</div>
      <div>{body}</div>
      {footer && <div>{footer}</div>}
    </div>
  );
}
```

## Eliminating Any Types

### Strategy 1: Type Inference

```typescript
// Let TypeScript infer types when obvious
// ❌ Explicit but redundant
const user: User = fetchUser();

// ✅ Inferred from function return type
const user = fetchUser();
```

### Strategy 2: Assertion Over Any

```typescript
// ❌ Bad - Loses type safety with any
const data: any = unknownValue;
console.log(data.property);

// ✅ Better - Use type assertion with confidence
const data = unknownValue as User;
console.log(data.name);

// ✅ Best - Type guard to narrow types safely
function isUser(value: unknown): value is User {
  return typeof value === 'object' &&
         value !== null &&
         'name' in value &&
         'email' in value;
}

if (isUser(unknownValue)) {
  console.log(unknownValue.name);
}
```

### Strategy 3: Type Guards

```typescript
// Narrow types safely without any
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value * 2;
  }
}

// For objects
function hasProperty<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}

const user = { name: 'John' };
if (hasProperty(user, 'name')) {
  console.log(user.name); // Typed as string
}
```

### Strategy 4: Unknown Type

```typescript
// ❌ Bad - any allows anything
function process(data: any) {
  return data.toUpperCase(); // No error but might crash
}

// ✅ Good - unknown requires type checking
function process(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  throw new Error('Expected string');
}
```

## Type Definition Organization

### Recommended Structure

```typescript
// types/common.ts - Shared types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  author: User;
}

// types/api.ts - API-specific types
export interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: Date;
}

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

// components/User/types.ts - Component-specific types
export interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
}
```

## Type Safety Checklist

- [ ] Enable strict mode in tsconfig
- [ ] No `any` types (use specific types or `unknown`)
- [ ] All function parameters typed
- [ ] All function return types explicit
- [ ] Component props properly typed
- [ ] Hook return types explicit
- [ ] Event handlers properly typed
- [ ] useRef has proper generic type
- [ ] useState has explicit type parameter
- [ ] Context values properly typed
- [ ] API responses typed
- [ ] Error types specified
- [ ] Const assertions for literal types
- [ ] Union types with discriminators
- [ ] Type guards for type narrowing
