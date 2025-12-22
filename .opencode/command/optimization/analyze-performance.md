---
description: Comprehensive performance audit of the codebase with actionable optimization suggestions
argument-hint: "[path]"
---

# Performance Audit Command

Analyze the codebase for performance bottlenecks, bundle size issues, rendering inefficiencies, and lazy-loading opportunities.

## Usage

```bash
/analyze-performance
/analyze-performance src/components
/analyze-performance app/page.tsx
```

## What This Does

1. **Scans for performance issues** across components, hooks, utilities
2. **Analyzes bundle size** impact of dependencies
3. **Identifies rendering inefficiencies** and memoization opportunities
4. **Checks lazy-loading possibilities** for heavy components
5. **Evaluates asset optimization** (images, fonts, CSS)
6. **Provides prioritized recommendations** with expected impact

## Output

Generates **Performance Audit Report** including:
- Bundle size breakdown and optimization opportunities
- Rendering efficiency analysis (unnecessary re-renders, missing memo)
- Code splitting and lazy-loading recommendations
- Image and asset optimization analysis
- Performance anti-pattern detection
- Expected performance improvements (ms/KB saved)
- Implementation roadmap (phased approach)

## Example Output

```
# Performance Analysis Report

## 1. Bundle Size Analysis
Current: 245 KB → Optimized: 198 KB (19% reduction)

## 2. React Component Rendering
- [Component A]: Missing React.memo (renders 50+ times, heavy)
- [Component B]: useCallback opportunity found
- [Hook useData]: Missing useMemo optimization

## 3. Lazy Loading Analysis
- GoogleMapsComponent: 142 KB, lazy load saves on initial load
- ChartLibrary: 56 KB, defer until needed
- Heavy forms: 34 KB, lazy load on demand

## 4. Performance Recommendations

### Priority 1 (Critical)
1. Lazy load GoogleMaps component - Save 142 KB from initial bundle
2. Split /admin routes - Reduce main bundle by 89 KB
3. Add memo to [Component] - Reduce re-renders 40%

### Priority 2 (Important)
1. Optimize images - Convert to WebP format, save 23 KB
2. Extract useCallback in form handlers - Improve responsiveness
...

## Expected Impact
- Initial load: 2.3s → 1.8s (22% faster)
- LCP: 1800ms → 1200ms
- Bundle size: 245KB → 198KB
```

## When to Use

- **Before launch**: Ensure optimal performance
- **Slow page reports**: Identify bottlenecks
- **Large component**: Find optimization opportunities
- **Adding features**: Check performance impact
- **Regular audits**: Monitor performance health

## What It Checks

✅ Bundle size and chunk analysis  
✅ React component rendering efficiency  
✅ Lazy loading opportunities  
✅ Image and asset optimization  
✅ Memory usage patterns  
✅ Core Web Vitals impact  
✅ Third-party library optimization  
✅ CSS and styling efficiency  

## Related Commands

- `/audit-architecture` - Check code structure
- `/generate-tests` - Create test templates
- `/clean` - Fix code formatting and quality
