# Performance Guidelines for Next.js 14+ & React 19

**Category**: optimization/domain  
**Purpose**: Performance best practices, optimization patterns, and metrics for modern React applications  
**Used by**: performance-optimizer, orchestrator

---

## Overview

This guide covers performance optimization for Next.js 14+ with React 19, including bundle optimization, rendering efficiency, lazy loading strategies, and Core Web Vitals improvement.

## Core Web Vitals & Metrics

### LCP (Largest Contentful Paint)
- **Target**: <2.5s
- **How**: Optimize critical resources, prioritize images, code splitting
- **React Impact**: Reduce initial component complexity, lazy load heavy components

### FID (First Input Delay)
- **Target**: <100ms
- **How**: Keep main thread responsive, break up long JavaScript
- **React Impact**: Use code splitting, optimize event handlers, avoid blocking operations

### CLS (Cumulative Layout Shift)
- **Target**: <0.1
- **How**: Reserve space for dynamic content, avoid layout thrashing
- **React Impact**: Set fixed heights/widths, reserve space for images/ads

## Bundle Size Optimization

### Strategy 1: Code Splitting

```javascript
// Route-based code splitting (Next.js handles automatically)
// /app/page.js - loaded immediately
// /app/about/page.js - lazy loaded when navigated

// Component-level code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    loading: () => <div>Loading...</div>,
    ssr: false // If component doesn't need SSR
  }
);

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Strategy 2: Tree Shaking

```javascript
// ❌ Bad - Imports entire library
import { Button, Card, Modal, etc } from 'heavy-ui-library';

// ✅ Good - Named imports enable tree shaking
import { Button } from 'heavy-ui-library';
import { Card } from 'heavy-ui-library';

// Or if library supports it:
import Button from 'heavy-ui-library/Button';
```

### Strategy 3: Dependency Optimization

```javascript
// Check bundle impact
// Use webpack-bundle-analyzer or next/bundle-analyzer

// Remove unused dependencies
- Audit with: npm ls (check for unused packages)
- Replace heavy libraries with lighter alternatives
  - date-fns (87KB) → day.js (2KB) or just use native Date
  - axios → native fetch with polyfill if needed
  - lodash → lodash-es or use native methods

// Lazy load heavy dependencies
const { default: Chart } = await import('chart.js');
```

### Strategy 4: Image Optimization

```javascript
// Use next/image for automatic optimization
import Image from 'next/image';

function ProfilePhoto() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={200}
      height={200}
      priority={false} // Set true only for LCP images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

// Serve modern formats
// Use next.config.js images configuration for WebP/AVIF support
```

## React 19 Performance Patterns

### Pattern 1: React.memo() for Expensive Components

```javascript
// Use memo when:
// - Component is heavy/expensive to render
// - Component receives same props frequently
// - Parent re-renders often

const ExpensiveChart = React.memo(({ data, config }) => {
  // Expensive rendering logic
  return <Chart data={data} config={config} />;
}, (prevProps, nextProps) => {
  // Custom comparison if needed
  return prevProps.data === nextProps.data;
});
```

### Pattern 2: useCallback for Event Handlers

```javascript
// Without useCallback - recreates function on every render
function Parent() {
  const handleClick = () => console.log('clicked');
  return <Child onClick={handleClick} />;
}

// With useCallback - memoizes function
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Dependencies: add values that affect the function
  
  return <Child onClick={handleClick} />;
}
```

### Pattern 3: useMemo for Expensive Calculations

```javascript
// Without useMemo - recalculates on every render
function Component({ items, filter }) {
  const filtered = items.filter(item => item.category === filter);
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
  return <List items={sorted} />;
}

// With useMemo - only recalculates when dependencies change
function Component({ items, filter }) {
  const sorted = useMemo(() => {
    const filtered = items.filter(item => item.category === filter);
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [items, filter]);
  
  return <List items={sorted} />;
}
```

### Pattern 4: useTransition for Non-Blocking Updates

```javascript
// Use useTransition for state updates that can be interrupted
import { useTransition } from 'react';

function SearchComponent() {
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value); // Immediate update for input
    
    startTransition(() => {
      // Heavy search operation doesn't block UI
      performSearch(value);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleInputChange} />
      {isPending && <Spinner />}
    </div>
  );
}
```

### Pattern 5: Lazy Loading Components

```javascript
import { lazy, Suspense } from 'react';

const HeavyDataTable = lazy(() => import('@/components/DataTable'));

function Page() {
  const [showTable, setShowTable] = useState(false);

  return (
    <div>
      <button onClick={() => setShowTable(true)}>Show Table</button>
      {showTable && (
        <Suspense fallback={<div>Loading table...</div>}>
          <HeavyDataTable />
        </Suspense>
      )}
    </div>
  );
}
```

## Next.js Specific Optimizations

### 1. Font Optimization

```javascript
// Use next/font for optimized font loading
import { Geist, Geist_Mono } from 'next/font/google';

const geist = Geist({ subsets: ['latin'] });

// Font is automatically optimized - no layout shift
```

### 2. Script Optimization

```javascript
// next/script for non-critical scripts
import Script from 'next/script';

function Layout() {
  return (
    <>
      {/* Analytics - load after interactive */}
      <Script 
        src="https://analytics.google.com/ga.js"
        strategy="afterInteractive"
      />
      
      {/* Third-party widgets - lazy load */}
      <Script 
        src="https://widget.example.com"
        strategy="lazyOnload"
      />
    </>
  );
}
```

### 3. Dynamic Imports for Routes

```javascript
// Pages are automatically code-split by Next.js
// But you can optimize further with dynamic imports

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Map'), {
  loading: () => <MapPlaceholder />,
  ssr: false // Only render on client
});
```

### 4. ISR (Incremental Static Regeneration)

```javascript
// Combine static generation with periodic updates
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

export const revalidate = 60; // Revalidate every 60 seconds

export default function Page({ params }) {
  return <div>Content for {params.id}</div>;
}
```

## Rendering Optimization

### Pattern: Lift State Up Strategically

```javascript
// Bad: State in deeply nested component causes re-renders
function App() {
  return <Parent1 />;
}

function Parent1() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Child1 count={count} setCount={setCount} />
      <ExpensiveChild /> {/* Re-renders when Parent changes */}
    </div>
  );
}

// Good: Keep state where it's needed
function App() {
  return (
    <div>
      <CounterSection />
      <ExpensiveChild /> {/* Doesn't re-render */}
    </div>
  );
}

function CounterSection() {
  const [count, setCount] = useState(0);
  return <Child count={count} />;
}
```

### Pattern: useContext Performance

```javascript
// ❌ Bad: All consumers re-render when any value changes
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});
  
  return (
    <UserContext.Provider value={{ user, settings }}>
      <Child />
    </UserContext.Provider>
  );
}

// ✅ Good: Split contexts by update frequency
const UserContext = createContext();
const SettingsContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});
  
  return (
    <UserContext.Provider value={user}>
      <SettingsContext.Provider value={settings}>
        <Child />
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}
```

## Common Performance Anti-Patterns to Avoid

### Anti-Pattern 1: Creating Objects in Render

```javascript
// ❌ Bad - Creates new object every render
function Component({ data }) {
  const style = { color: 'red', fontSize: '14px' };
  return <div style={style}>{data}</div>;
}

// ✅ Good - Object created once
const style = { color: 'red', fontSize: '14px' };

function Component({ data }) {
  return <div style={style}>{data}</div>;
}
```

### Anti-Pattern 2: Inline Function Declarations

```javascript
// ❌ Bad - New function every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good - Memoized with useCallback
const handleClick = useCallback((id) => {
  // handle click
}, [id]);

<button onClick={() => handleClick(id)}>Click</button>
```

### Anti-Pattern 3: Missing Keys in Lists

```javascript
// ❌ Bad - No keys, poor performance and state issues
{items.map(item => <Item data={item} />)}

// ✅ Good - Unique, stable keys
{items.map(item => <Item key={item.id} data={item} />)}
```

### Anti-Pattern 4: Synchronous Heavy Operations

```javascript
// ❌ Bad - Blocks UI
function Component() {
  const data = expensiveCalculation();
  return <div>{data}</div>;
}

// ✅ Good - Use Web Workers or async processing
function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const worker = new Worker('/worker.js');
    worker.postMessage(input);
    worker.onmessage = (e) => setData(e.data);
  }, []);
  
  return <div>{data}</div>;
}
```

## Profiling & Measurement

### React DevTools Profiler

```javascript
// Wrap component to profile performance
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourComponent />
    </Profiler>
  );
}
```

### Metrics to Monitor

- **Component render time**: How long it takes to render
- **Render frequency**: How often a component re-renders
- **Time to interactive**: When user can interact with page
- **Memory usage**: Peak memory during rendering
- **Bundle size**: Total JS sent to browser

## Performance Checklist

- [ ] Enable code splitting at route level
- [ ] Lazy load heavy components
- [ ] Use React.memo() for expensive components
- [ ] Memoize callbacks with useCallback
- [ ] Memoize expensive calculations with useMemo
- [ ] Optimize images with next/image
- [ ] Use next/font for web fonts
- [ ] Remove unused dependencies
- [ ] Implement ISR for static content
- [ ] Monitor Core Web Vitals
- [ ] Profile with React DevTools
- [ ] Test performance in production
