---
description: Generate test templates and coverage analysis for React components and hooks
argument-hint: "[path]"
---

# Test Generation Command

Analyze test coverage gaps and generate test templates for React components, hooks, and utilities.

## Usage

```bash
/generate-tests
/generate-tests src/components
/generate-tests src/hooks/useUser.ts
```

## What This Does

1. **Analyzes test coverage** across components and hooks
2. **Identifies untested components** and prioritizes by impact
3. **Detects coverage gaps** in edge cases and error scenarios
4. **Generates test templates** for different testing scenarios
5. **Recommends TDD patterns** and testing strategies
6. **Creates testing roadmap** with phase-based implementation

## Output

Generates **Test Coverage & Strategy Report** including:
- Current test coverage baseline and target
- Untested components prioritized by impact
- Coverage gaps and edge cases to test
- Generated test template files
- TDD recommendations and patterns
- Testing roadmap (phases with effort estimates)
- Mock and fixture strategies

## Example Output

```
# Test Coverage & Strategy Report

## Coverage Analysis
Current: 42% coverage
Target: 80% coverage
Gap: 38 percentage points

Coverage by category:
- Components: 30% (6/20 tested)
- Hooks: 50% (2/4 tested)
- Utils: 60% (3/5 tested)
- Pages: 20% (1/5 tested)

## High Priority Components (No Tests)
1. [ServiceCard] - Used in 12 places, complex with 6 branches
   - Effort: 1-2 hours
   - Template: Component Test
   - Coverage needs: Rendering, user interaction, edge cases

2. [ContactForm] - User-facing, multiple validations
   - Effort: 2-3 hours
   - Template: Form Test
   - Coverage needs: Submission, validation, error states

3. [useUser] Hook - Core data fetching, used everywhere
   - Effort: 1-2 hours
   - Template: Hook Test
   - Coverage needs: Initial state, fetch, refetch, errors

## Medium Priority Components
- [TeamMember] - Presentation, reusable
- [Footer] - Layout component
- [NavigationMenu] - Complex interactions

## Low Priority Components
- [Button] - Simple, atomic
- [Card] - Presentation only
- [Logo] - Rendering only

## Test Templates Generated

### Component Test Template
```typescript
// components/ServiceCard/ServiceCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ServiceCard } from './ServiceCard';

describe('ServiceCard', () => {
  describe('Rendering', () => {
    it('should render with provided service data', () => {
      const service = { id: '1', title: 'Legal Services', description: '...' };
      render(<ServiceCard service={service} />);
      expect(screen.getByText('Legal Services')).toBeInTheDocument();
    });
  });
  
  describe('Interaction', () => {
    it('should call onSelect when clicked', () => {
      const handleSelect = jest.fn();
      const service = { id: '1', title: 'Service' };
      render(<ServiceCard service={service} onSelect={handleSelect} />);
      screen.getByRole('button').click();
      expect(handleSelect).toHaveBeenCalledWith('1');
    });
  });
  
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const service = { id: '1', title: 'Service' };
      render(<ServiceCard service={service} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
```

### Hook Test Template
```typescript
// hooks/useUser/useUser.test.ts
import { renderHook, act } from '@testing-library/react';
import { useUser } from './useUser';

describe('useUser Hook', () => {
  describe('Initial State', () => {
    it('should initialize with loading true', () => {
      const { result } = renderHook(() => useUser('123'));
      expect(result.current.loading).toBe(true);
    });
  });
  
  describe('Fetching', () => {
    it('should fetch user on mount', async () => {
      const { result } = renderHook(() => useUser('123'));
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(result.current.user).toBeDefined();
    });
  });
  
  describe('Error Handling', () => {
    it('should handle fetch errors', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed'));
      const { result } = renderHook(() => useUser('123'));
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
      expect(result.current.error).toBeDefined();
    });
  });
});
```

## Testing Roadmap

### Phase 1: Critical Components (Week 1 - 8 hours)
- [ ] Test [ServiceCard] - 2 hours
- [ ] Test [ContactForm] - 3 hours
- [ ] Test [useUser] - 3 hours
**Expected coverage gain**: 15-20%

### Phase 2: Important Components (Week 2 - 10 hours)
- [ ] Test [TeamMember] - 2 hours
- [ ] Test [useForm] - 3 hours
- [ ] Test API integration - 5 hours
**Expected coverage gain**: 15-20%

### Phase 3: Edge Cases (Week 3 - 12 hours)
- [ ] Add error scenarios - 4 hours
- [ ] Add async patterns - 4 hours
- [ ] Add accessibility tests - 4 hours
**Expected coverage gain**: 10-15%

### Phase 4: Utils & Hooks (Week 4 - 8 hours)
- [ ] Test utility functions - 4 hours
- [ ] Test remaining hooks - 4 hours
**Expected coverage gain**: 5-10%

## TDD Recommendations

### For Complex Components
Start with test, then implement:
1. Write test for feature
2. Watch test fail
3. Write minimal implementation
4. Refactor with confidence

### Custom Hooks
Always test thoroughly:
- Initial state
- State updates
- Effect side effects
- Cleanup
- Error conditions

### Async Operations
Test all paths:
- Loading state
- Success state
- Error state
- Retry logic
- Timeout handling

## Mocking Strategy

### API Calls
Use MSW (Mock Service Worker) for realistic HTTP mocking

### External Libraries
Mock at component boundaries, not internal details

### Date/Time
Use jest.useFakeTimers() for deterministic tests

### Local Storage
Mock with jest.mock() to avoid side effects

## Expected Impact

- **Coverage**: 42% → 85%+
- **Confidence**: Refactor with confidence
- **Regression detection**: Catch bugs before production
- **Documentation**: Tests serve as code examples
- **Developer experience**: Clear expected behavior

## Accessibility Testing

Recommended additions:
- Keyboard navigation tests
- Screen reader compatibility
- ARIA attribute validation
- Focus management
- Color contrast verification

## Template Files Created

- [ ] components/ServiceCard/ServiceCard.test.tsx
- [ ] components/ContactForm/ContactForm.test.tsx
- [ ] hooks/useUser/useUser.test.ts
- [ ] tests/fixtures/mocks.ts
- [ ] tests/helpers/testUtils.tsx
```

## When to Use

- **New component**: Generate test template immediately
- **Before refactoring**: Ensure you have tests
- **Coverage gaps**: Identify what's not tested
- **TDD setup**: Understand testing patterns
- **Code review**: Check test coverage

## What It Checks

✅ Component test coverage  
✅ Hook test coverage  
✅ Utility function testing  
✅ Edge case identification  
✅ Async operation testing  
✅ Error scenario handling  
✅ Accessibility coverage  
✅ Integration test opportunities  

## Related Commands

- `/audit-architecture` - Check code structure
- `/analyze-performance` - Check performance issues
- `/clean` - Fix code quality
