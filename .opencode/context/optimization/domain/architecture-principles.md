# Architecture Principles for Next.js Applications

**Category**: optimization/domain  
**Purpose**: Component design, folder structure, separation of concerns, and design patterns  
**Used by**: architecture-reviewer, orchestrator

---

## Overview

This guide covers architectural best practices for Next.js 14+ applications, focusing on component design, folder organization, and maintaining clean architecture principles.

## Core Principles

### 1. Single Responsibility Principle

Each component, module, and function should have one reason to change.

```typescript
// ❌ Bad - Multiple responsibilities
function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUser(); // Data fetching
  }, []);

  const handleSave = async (data) => {
    await updateUser(data); // API call
    setIsEditing(false);
  };

  return (
    <div>
      {/* Rendering logic mixed with data management */}
      {isEditing ? (
        <form onSubmit={(e) => handleSave(e.target)}>
          {/* Form fields */}
        </form>
      ) : (
        <div>{user?.name}</div>
      )}
    </div>
  );
}

// ✅ Good - Single responsibilities
// Custom hook for data management
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user;
}

// Edit mode hook
function useEditMode() {
  const [isEditing, setIsEditing] = useState(false);
  return { isEditing, toggleEdit: () => setIsEditing(!isEditing) };
}

// Presentation component
function UserProfile({ userId }: { userId: string }) {
  const user = useUser(userId);
  const { isEditing, toggleEdit } = useEditMode();

  if (!user) return <Skeleton />;

  return isEditing ? <UserForm user={user} /> : <UserView user={user} />;
}
```

### 2. Separation of Concerns

Different concerns should be in different places:
- **Data layer**: API calls, data fetching, caching
- **Logic layer**: Business logic, calculations, transformations
- **Presentation layer**: UI components, styling

```typescript
// Project structure
app/
├── (routes)/
│   └── users/
│       ├── page.tsx          // Route component
│       └── [id]/
│           └── page.tsx      // Dynamic route
├── components/
│   ├── User/
│   │   ├── UserView.tsx      // Presentational
│   │   ├── UserForm.tsx      // Form component
│   │   └── index.ts          // Exports
│   └── common/
│       └── Card.tsx
├── hooks/
│   └── useUser.ts            // Business logic
├── services/
│   └── userService.ts        // API layer
└── types/
    └── user.ts               // Type definitions
```

### 3. DRY (Don't Repeat Yourself)

Extract duplicated logic into reusable utilities or components.

```typescript
// ❌ Duplicated validation logic
function LoginForm() {
  const [email, setEmail] = useState('');
  const validateEmail = (value: string) => {
    return value.includes('@') && value.includes('.');
  };
  // ...
}

function RegisterForm() {
  const [email, setEmail] = useState('');
  const validateEmail = (value: string) => {
    return value.includes('@') && value.includes('.');
  };
  // ...
}

// ✅ Extracted to utility
function validateEmail(email: string): boolean {
  return email.includes('@') && email.includes('.');
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const isValid = validateEmail(email);
  // ...
}
```

## Folder Structure Patterns

### Recommended Next.js App Router Structure

```
lys-lf-react-19/
├── app/
│   ├── (routes)/                    # Route group
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/                         # API routes
│   │   ├── users/
│   │   │   └── route.ts
│   │   └── services/
│   │       └── route.ts
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   └── globals.css
│
├── components/
│   ├── common/                      # Reusable components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.scss
│   │   ├── Footer/
│   │   ├── Navigation/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts                 # Barrel export
│   │
│   ├── layout/                      # Layout components
│   │   ├── Sidebar/
│   │   ├── Topbar/
│   │   └── index.ts
│   │
│   ├── features/                    # Feature-specific
│   │   ├── ServiceCard/
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── ServiceCard.module.scss
│   │   │   ├── ServiceCard.test.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── ContactForm/
│   │   ├── TeamMember/
│   │   └── index.ts
│   │
│   └── index.ts                     # Root barrel export
│
├── hooks/                           # Custom hooks
│   ├── useUser.ts
│   ├── useFetch.ts
│   ├── useForm.ts
│   ├── useDebounce.ts
│   └── index.ts
│
├── services/                        # API services
│   ├── api.ts                       # Base API client
│   ├── userService.ts
│   ├── contactService.ts
│   └── index.ts
│
├── utils/                           # Utility functions
│   ├── formatting.ts
│   ├── validation.ts
│   ├── constants.ts
│   └── index.ts
│
├── types/                           # Type definitions
│   ├── common.ts
│   ├── api.ts
│   ├── components.ts
│   └── index.ts
│
├── styles/                          # Global styles
│   ├── globals.scss
│   ├── variables.scss
│   └── mixins.scss
│
├── config/                          # Configuration
│   ├── env.ts
│   └── constants.ts
│
├── public/                          # Static assets
│   ├── images/
│   └── icons/
│
├── tests/                           # Tests
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
└── .env.local                       # Environment variables
```

## Component Organization Patterns

### Pattern 1: Component Structure

```typescript
// Component file structure
// components/Button/

// Button.tsx - Component implementation
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return <button className={`btn btn-${variant}`} {...props} />;
};

// Button.test.tsx - Component tests
describe('Button', () => {
  it('renders correctly', () => {
    // Test implementation
  });
});

// Button.module.scss - Component styles (if using CSS Modules)
.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.primary {
  background: #007bff;
  color: white;
}

// types.ts (optional) - Component-specific types
export interface ButtonState {
  isLoading: boolean;
  isDisabled: boolean;
}

// index.ts - Barrel export
export { Button, type ButtonProps } from './Button';
export { type ButtonState } from './types';
```

### Pattern 2: Feature Modules

```typescript
// Feature module structure for complex features
// components/features/UserProfile/

UserProfile/
├── components/
│   ├── UserHeader/
│   │   ├── UserHeader.tsx
│   │   └── UserHeader.module.scss
│   ├── UserStats/
│   │   └── UserStats.tsx
│   └── index.ts
├── hooks/
│   ├── useUserData.ts
│   └── index.ts
├── services/
│   ├── userProfileService.ts
│   └── index.ts
├── types.ts
├── UserProfile.tsx      # Main component
├── UserProfile.test.tsx
└── index.ts
```

### Pattern 3: Container/Presentational Pattern

```typescript
// Container component (smart) - Handles data and logic
function UserProfileContainer({ userId }: { userId: string }) {
  const user = useUser(userId);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (data: UserData) => {
    await updateUser(userId, data);
    setIsEditing(false);
  };

  return (
    <UserProfilePresentation
      user={user}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
    />
  );
}

// Presentational component (dumb) - Only renders, no logic
interface UserProfilePresentationProps {
  user: User | null;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: UserData) => Promise<void>;
}

function UserProfilePresentation({
  user,
  isEditing,
  onEdit,
  onSave
}: UserProfilePresentationProps) {
  if (!user) return <Skeleton />;

  return isEditing ? (
    <UserForm user={user} onSave={onSave} />
  ) : (
    <UserView user={user} onEdit={onEdit} />
  );
}

// Export main component
export default UserProfileContainer;
```

## Design Patterns

### Pattern 1: Custom Hooks for Logic

```typescript
// Extract reusable logic into custom hooks
function useAsync<T, E>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { status, data, error, execute };
}
```

### Pattern 2: Compound Components

```typescript
// Create flexible, composable components
interface TabsProps {
  children: React.ReactNode;
  activeTab: number;
}

interface TabsContextType {
  activeTab: number;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({ children, activeTab }: TabsProps) {
  return (
    <TabsContext.Provider value={{ activeTab }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ index, children }: { index: number; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === index;
  return <button className={isActive ? 'active' : ''}>{children}</button>;
};

Tabs.Panel = function TabPanel({ index, children }: { index: number; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  return context?.activeTab === index ? <div>{children}</div> : null;
};

// Usage
<Tabs activeTab={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel index={0}>Content 1</Tabs.Panel>
  <Tabs.Panel index={1}>Content 2</Tabs.Panel>
</Tabs>
```

### Pattern 3: Context for Global State

```typescript
// Split contexts by update frequency
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: Credentials) => {
    const response = await loginService(credentials);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextType = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Naming Conventions

### File & Folder Naming

- **Components**: PascalCase (Button.tsx, UserProfile.tsx)
- **Hooks**: camelCase starting with `use` (useUser.ts, useFetch.ts)
- **Services**: camelCase (userService.ts, apiClient.ts)
- **Utilities**: camelCase (formatDate.ts, validation.ts)
- **Folders**: kebab-case (user-profile/, form-components/)
- **Types**: PascalCase (User.ts, ApiResponse.ts)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL, MAX_RETRIES)

### Variable & Function Naming

```typescript
// Components & Types
const UserProfile = () => {};
const Button: React.FC<ButtonProps> = () => {};

// Functions & Variables
const formatDate = (date: Date) => {};
const isValidEmail = (email: string) => {};
const getTotalPrice = (items: Item[]) => {};

// Boolean variables
const isLoading = false;
const hasError = false;
const canSubmit = true;
const shouldRender = true;

// Constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
```

## Architecture Anti-Patterns to Avoid

### Anti-Pattern 1: Component Hierarchy Too Deep

```typescript
// ❌ Bad - Deep nesting
<App>
  <Layout>
    <Page>
      <Section>
        <Card>
          <Header>
            <Title>...</Title>
          </Header>
          <Content>
            <Text>...</Text>
          </Content>
        </Card>
      </Section>
    </Page>
  </Layout>
</App>

// ✅ Better - Flat hierarchy with composition
<App>
  <Layout>
    <Card
      header={<Header title="Title" />}
      content={<Text>Content</Text>}
    />
  </Layout>
</App>
```

### Anti-Pattern 2: Props Drilling

```typescript
// ❌ Bad - Props drilling through multiple levels
function App() {
  const [theme, setTheme] = useState('light');
  return <Level1 theme={theme} setTheme={setTheme} />;
}

function Level1({ theme, setTheme }: Props) {
  return <Level2 theme={theme} setTheme={setTheme} />;
}

// ✅ Good - Context for shared state
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Level1 />
    </ThemeContext.Provider>
  );
}

function Level1() {
  return <Level2 />;
}

function Level2() {
  const { theme } = useContext(ThemeContext);
  return <div>{theme}</div>;
}
```

### Anti-Pattern 3: Fat Components

```typescript
// ❌ Bad - Component doing too much
function ComplexDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // ... 200 lines of mixed logic

  return (
    <div>
      {/* UI for users, posts, comments */}
    </div>
  );
}

// ✅ Good - Separated concerns
function Dashboard() {
  return (
    <div>
      <UsersSection />
      <PostsSection />
      <CommentsSection />
    </div>
  );
}

function UsersSection() {
  const users = useUsers();
  return <UserList users={users} />;
}
```

## Architecture Checklist

- [ ] Each component has single responsibility
- [ ] Logic separated from presentation
- [ ] Custom hooks extract reusable logic
- [ ] Folder structure organized by feature
- [ ] Barrel exports for clean imports
- [ ] Path aliases configured (@/components)
- [ ] Naming conventions consistent
- [ ] No prop drilling (use Context when needed)
- [ ] Reusable components extracted
- [ ] Type definitions organized
- [ ] API layer separated
- [ ] No circular dependencies
