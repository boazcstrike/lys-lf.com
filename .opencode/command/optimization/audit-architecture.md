---
description: Review code structure and design patterns with architectural improvement recommendations
argument-hint: "[path]"
---

# Architecture Audit Command

Evaluate the codebase for structural issues, component organization, design patterns, and architectural improvements.

## Usage

```bash
/audit-architecture
/audit-architecture src/components
/audit-architecture app/(routes)
```

## What This Does

1. **Analyzes component structure** for single-responsibility violations
2. **Reviews folder organization** against Next.js best practices
3. **Identifies design pattern opportunities** and violations
4. **Checks separation of concerns** (data/logic/presentation layers)
5. **Detects code duplication** and reusability opportunities
6. **Provides restructuring recommendations** with implementation roadmap

## Output

Generates **Architecture Review Report** including:
- Component structure analysis and improvement suggestions
- Folder organization review with recommended structure
- Design pattern evaluation and opportunities
- Separation of concerns assessment
- Code reusability analysis and extraction opportunities
- Naming convention compliance
- Implementation roadmap (phased restructuring)

## Example Output

```
# Architecture Review Report

## 1. Component Structure Analysis
- Avg component size: 287 lines (target: <300 lines) ✓
- God components found: 3
  - Dashboard.tsx: 450 lines (handles 8 responsibilities)
  - UserProfile.tsx: 380 lines (data + UI + logic mixed)
  - ServiceForm.tsx: 320 lines (validation + submission + UI)

## 2. Folder Organization
Current: Components scattered across multiple locations
Issues:
- /components/ has 35 files, no clear subfolders
- Reusable components mixed with feature-specific ones
- No separation between containers and presentational

Recommended Structure:
```
components/
├── common/        (reusable components)
├── layout/        (layout components)
├── features/      (feature-specific)
├── hooks/         (custom hooks)
└── utils/         (utilities)
```

## 3. Design Patterns
Established:
- Container/Presentational pattern: [Components using it]
- Custom hooks: 5 hooks extracting logic
- Context usage: Theme, Auth contexts

Opportunities:
- Compound components for [Components]
- Extract utilities from [Files]

## 4. Separation of Concerns
Issues:
- API calls in components (should be in hooks/services)
- Business logic in components
- Data transformations in render

Recommendations:
1. Create /hooks/useUser.ts for data fetching
2. Create /services/api.ts for API calls
3. Extract validation to /utils/validation.ts

## 5. Code Duplication
Found:
- Validation logic repeated in 4 forms
- User fetch logic in 3 components
- Date formatting logic in 5 files

Extraction opportunities:
- Create useUser custom hook
- Extract validation utilities
- Create useDate custom hook

## Architecture Recommendations

### Priority 1
1. **Split Dashboard component** (450 lines) into:
   - DashboardContainer (logic)
   - DashboardView (presentation)
   - Extract data fetching to custom hooks

2. **Reorganize folder structure**:
   - Create /components/common for reusable
   - Create /components/features for feature-specific
   - Create /hooks for custom hooks

### Priority 2
1. **Extract utility functions**:
   - Validation logic to /utils/validation.ts
   - Formatting logic to /utils/formatting.ts

2. **Implement custom hooks**:
   - useUser for user data fetching
   - useForm for form state management

### Priority 3
1. **Apply design patterns**:
   - Compound components for complex UI
   - HOCs for cross-cutting concerns

## Implementation Roadmap
- Week 1: Create new folder structure (4 hours)
- Week 2: Split god components (12 hours)
- Week 3: Extract hooks and utilities (10 hours)
- Week 4: Update imports and test (6 hours)
```

## When to Use

- **Project setup**: Plan initial structure
- **Code review**: Identify structure improvements
- **Before refactoring**: Understand current structure
- **Onboarding**: Help new developers understand codebase
- **Planning features**: Ensure proper organization

## What It Checks

✅ Component size and responsibilities  
✅ Folder organization and naming  
✅ Design pattern usage and opportunities  
✅ Separation of concerns  
✅ Code duplication detection  
✅ Naming convention consistency  
✅ Module boundaries and dependencies  
✅ Next.js app structure alignment  

## Related Commands

- `/analyze-performance` - Check performance issues
- `/generate-tests` - Create test templates
- `/clean` - Fix code quality and formatting
