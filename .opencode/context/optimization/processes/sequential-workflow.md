# Sequential Workflow Process

**Category**: optimization/processes  
**Purpose**: How the 5 stages connect and data flows between them  
**Used by**: code-optimizer-orchestrator, all subagents

---

## Workflow Overview

The optimization system uses a 5-stage sequential workflow where output from one stage feeds into the input of the next stage, creating a cumulative refinement cycle.

```
INPUT (User Request)
    ↓
[STAGE 1: ANALYSIS]
    ├─ Performance Optimizer: Identifies performance issues
    ├─ Type Safety Specialist: Identifies type gaps
    ├─ Quality Assurance Agent: Identifies code quality issues
    ├─ Architecture Reviewer: Identifies structural issues
    └─ Output: Consolidated analysis report
    ↓
[STAGE 2: REFACTORING]
    ├─ Quality Assurance Agent: Fixes duplication, readability
    ├─ Type Safety Specialist: Converts any types, adds annotations
    └─ Output: Type-safe, quality-improved code
    ↓
[STAGE 3: ARCHITECTURE]
    ├─ Architecture Reviewer: Restructures components
    ├─ Reorganizes folders and files
    └─ Output: Well-organized, principle-aligned code
    ↓
[STAGE 4: PERFORMANCE]
    ├─ Performance Optimizer: Applies optimizations
    ├─ Bundle size, rendering, lazy-loading
    └─ Output: Performant, optimized code
    ↓
[STAGE 5: TESTING]
    ├─ Test Strategy Agent: Generates test templates
    ├─ Identifies coverage gaps
    └─ Output: Test templates, coverage analysis
    ↓
FINAL OUTPUT (Master optimization report)
```

## Stage 1: Analysis

### Input
- **Source**: User request (file path, directory, or full project)
- **Context**: Current codebase state

### Process
All subagents scan the codebase simultaneously:

1. **Performance Optimizer** scans for:
   - Bundle size bottlenecks
   - Rendering inefficiencies
   - Lazy loading opportunities
   - Asset optimization issues

2. **Type Safety Specialist** scans for:
   - Implicit and explicit any types
   - Type inference opportunities
   - React 19 type pattern issues
   - Component prop typing gaps

3. **Quality Assurance Agent** scans for:
   - Code duplication
   - Readability issues
   - Naming convention violations
   - Dead code and unused exports

4. **Architecture Reviewer** scans for:
   - Component structure issues
   - Folder organization problems
   - Separation of concerns violations
   - Design pattern opportunities

### Output Structure
```markdown
## Stage 1: Analysis Results

### Performance Issues Identified
- [N] bundle size issues
- [N] rendering inefficiencies
- [N] lazy loading opportunities

### Type Safety Gaps
- [N] any types found
- [N] untyped props
- [N] inference opportunities

### Code Quality Issues
- [N] duplication instances
- [N] readability issues
- [N] naming violations

### Architectural Issues
- [N] structural problems
- [N] folder organization issues
- [N] design pattern violations

### Consolidated Issues (Prioritized)
1. Critical: [Issue 1]
2. Important: [Issue 2]
3. Normal: [Issue 3]
```

### Handoff to Stage 2
- Consolidated list of all issues found
- Severity and priority levels
- Which agent should address each issue
- Dependencies between fixes

---

## Stage 2: Refactoring

### Input
- Analysis report from Stage 1
- Identified quality and type issues
- Refactoring recommendations

### Process
Two agents work together in this stage:

1. **Quality Assurance Agent** handles:
   - Remove code duplication
   - Fix readability issues
   - Resolve naming violations
   - Clean up dead code and unused imports

2. **Type Safety Specialist** handles:
   - Convert any types to specific types
   - Add missing type annotations
   - Fix type mismatches
   - Improve type inference

### Auto-Fixes Applied
Safe fixes applied automatically:
- Remove unused imports and variables ✓
- Fix import organization ✓
- Add obvious type annotations ✓
- Fix formatting via Prettier ✓
- Remove console.logs and debugger ✓
- Convert simple any types ✓
- Add missing React imports ✓

### Approval-Needed Changes
User review required for:
- Complex type conversions
- Refactoring logic changes
- Extraction of utilities
- Breaking changes

### Output Structure
```markdown
## Stage 2: Refactoring Results

### Auto-Fixed Issues
- [N] unused imports removed
- [N] type annotations added
- [N] code formatted
- [N] dead code removed

### Quality Improvements
- Reduced [N] duplicate blocks
- Improved readability in [N] functions
- Fixed [N] naming violations
- Extracted [N] utilities

### Type Safety Improvements
- Converted [N] any types
- Added [N] type annotations
- Fixed [N] type mismatches
- Improved inference in [N] locations

### Changes Summary
- Files modified: [List]
- Lines changed: [N]
- Complexity reduced: [X]%

### Pending Approvals
- [N] changes need user review
- [List approval-needed items]
```

### Handoff to Stage 3
- Refactored, type-safe code
- Summary of all changes made
- Current code quality baseline
- Any remaining manual fixes needed

---

## Stage 3: Architecture

### Input
- Refactored code from Stage 2
- Architecture issues from Stage 1 analysis
- Current code quality baseline

### Process
**Architecture Reviewer** handles:
1. Evaluate component structure improvements
2. Recommend folder reorganization
3. Suggest design pattern applications
4. Identify reusable component extraction
5. Improve separation of concerns

### Auto-Fixes Applied
Safe architectural fixes:
- Create new folder structure ✓
- Set up barrel exports ✓
- Configure path aliases ✓
- Rename files to conventions ✓
- Extract obvious components ✓

### Approval-Needed Changes
User review required for:
- Component splitting/merging
- Major folder reorganization
- State management restructuring
- Custom hook extraction
- Breaking API changes

### Output Structure
```markdown
## Stage 3: Architecture Results

### Component Structure Improvements
- Split [N] god components
- Merged [N] micro-components
- Extracted [N] custom hooks
- Improved [N] components' responsibilities

### Folder Reorganization
- New structure created
- Path aliases configured: @/components, @/hooks, etc.
- Barrel exports established
- [N] files reorganized

### Design Patterns Applied
- Compound components: [Component 1], [Component 2]
- Custom hooks: [Hook 1], [Hook 2]
- Context patterns: [Context 1]

### Separation of Concerns
- Extracted data layer: [N] services created
- Extracted business logic: [N] hooks created
- Separated presentation: [N] components cleaned

### Changes Summary
- Folder structure: [Old] → [New]
- Files reorganized: [N]
- New modules created: [N]
- Imports updated: [N] files

### Pending Approvals
- Component restructuring: [Components to review]
- Hook extraction: [Hooks to review]
- State refactoring: [Changes to review]
```

### Handoff to Stage 4
- Restructured, well-organized code
- Improved component boundaries
- Clear separation of concerns
- Setup for performance optimizations

---

## Stage 4: Performance

### Input
- Architecturally sound code from Stage 3
- Performance issues from Stage 1 analysis
- Code organization improvements

### Process
**Performance Optimizer** handles:
1. Implement code splitting strategies
2. Add memoization where beneficial
3. Optimize bundle size
4. Improve rendering efficiency
5. Setup lazy loading

### Auto-Fixes Applied
Safe performance improvements:
- Add React.memo() to expensive components ✓
- Add useCallback for handlers ✓
- Add useMemo for expensive calculations ✓
- Configure dynamic imports ✓
- Optimize Tailwind purge ✓

### Approval-Needed Changes
User review required for:
- Major code splitting decisions
- Dependency replacements
- Component memoization strategies
- API call optimization changes
- Significant behavior modifications

### Output Structure
```markdown
## Stage 4: Performance Results

### Bundle Size Improvements
- Current: [X] KB
- Optimized: [Y] KB
- Reduction: [Z]% ([X-Y] KB saved)

### Code Splitting Applied
- Routes split: [N]
- Components lazy loaded: [N]
- Expected reduction: [X] KB initial load

### Rendering Optimizations
- React.memo added: [N] components
- useCallback added: [N] handlers
- useMemo added: [N] calculations
- Expected improvement: [X]% fewer re-renders

### Performance Metrics
- Initial load: [Before] → [After]
- LCP: [Before] → [After]
- TTI: [Before] → [After]
- Memory: [Before] → [After]

### Changes Applied
- Files modified: [N]
- Optimizations implemented: [N]
- Build size impact: [X]%

### Pending Approvals
- Code splitting strategy: [Review needed]
- Dependency changes: [Review needed]
- Performance trade-offs: [Review needed]
```

### Handoff to Stage 5
- Performance-optimized code
- Metrics improvements achieved
- Foundation ready for testing

---

## Stage 5: Testing

### Input
- Optimized code from Stage 4
- Code structure and organization
- All previous improvements

### Process
**Test Strategy Agent** handles:
1. Analyze test coverage gaps
2. Identify untested components
3. Generate test templates
4. Recommend TDD patterns
5. Create testing strategy

### Outputs Provided
Testing analysis and templates:
- Current coverage baseline
- Coverage gaps identified
- Test templates generated
- TDD recommendations
- Testing roadmap

### NOT Auto-Fixed (For User Implementation)
Test strategy is guidance, not implementation:
- Test templates provided as examples
- Coverage recommendations given
- Testing roadmap created
- User implements tests as needed

### Output Structure
```markdown
## Stage 5: Testing Results

### Coverage Analysis
- Current coverage: [X]%
- Target coverage: 80%+
- Coverage gap: [X]%

### Untested Components
- High priority: [N] components
- Medium priority: [N] components
- Low priority: [N] components

### Test Templates Generated
- Component tests: [N] templates
- Hook tests: [N] templates
- Utility tests: [N] templates
- Integration tests: [N] templates

### Coverage Recommendations
- Must test: [Components]
- Should test: [Components]
- Nice to test: [Components]

### Testing Roadmap
Phase 1: [N] hours - Critical components
Phase 2: [N] hours - Important hooks
Phase 3: [N] hours - Edge cases
Phase 4: [N] hours - Accessibility

### Test Template Examples
[Generated template samples for user reference]
```

### Final Handoff
- Complete testing strategy
- Test templates for all components
- Coverage analysis and gaps
- Implementation roadmap for user

---

## Final Master Report

### Generation
After all 5 stages complete, orchestrator compiles:

```markdown
# Complete Code Optimization Report
**Date**: [Date]
**Project**: lys-lf-react-19
**Scope**: [Analysis scope]

## Executive Summary
- **Overall Optimization Score**: [Before]/100 → [After]/100
- **Key Improvements**:
  1. [Major improvement 1]
  2. [Major improvement 2]
  3. [Major improvement 3]

## Stage-by-Stage Results

### Stage 1: Analysis
- [X] issues identified across [Y] files
- Severity breakdown: [Critical/Important/Normal]

### Stage 2: Refactoring
- [N] auto-fixes applied
- [N] type safety improvements
- [M] approval-needed items

### Stage 3: Architecture
- [N] files reorganized
- [N] components restructured
- [M] new patterns applied

### Stage 4: Performance
- [X]% bundle size reduction
- [Y]ms rendering improvement
- [Z] optimizations applied

### Stage 5: Testing
- Current coverage: [X]% → Target: 80%+
- [N] test templates generated
- [M] testing phases in roadmap

## Consolidated Recommendations

### Priority 1: Critical (Do First)
1. [Critical action 1] - Impact: [High]
2. [Critical action 2] - Impact: [High]

### Priority 2: Important (Do Soon)
1. [Important action 1] - Impact: [Medium]
2. [Important action 2] - Impact: [Medium]

### Priority 3: Nice to Have (Optimize Later)
1. [Enhancement 1] - Impact: [Low]

## Implementation Roadmap
1. Week 1: Apply auto-fixes, review approvals
2. Week 2: Implement refactoring changes
3. Week 3: Apply architectural improvements
4. Week 4: Implement performance optimizations
5. Week 5: Add tests and verify coverage

## Metrics & Impact Summary
- **Code Quality**: [Before] → [After]
- **Performance**: [Before] → [After]
- **Type Safety**: [Before]% → [After]%
- **Test Coverage**: [Before]% → [After]%

## Files Affected
- Total files modified: [N]
- Lines changed: [N]
- Complexity reduced: [X]%

## Next Steps
1. [User action 1]
2. [User action 2]
3. [User action 3]
```

---

## Data Flow Between Stages

### Stage 1 → Stage 2 Data Structure
```json
{
  "analysisDate": "2024-01-15",
  "scope": "lys-lf-react-19",
  "issues": [
    {
      "id": "iss-001",
      "type": "quality",
      "severity": "critical",
      "file": "src/components/Form.tsx",
      "description": "Duplicated validation logic",
      "stage": 2,
      "agent": "quality-assurance"
    }
  ],
  "metrics": {
    "totalIssues": 42,
    "byType": { "quality": 15, "type": 12, "perf": 10, "arch": 5 },
    "bySeverity": { "critical": 8, "important": 18, "normal": 16 }
  }
}
```

### Stage 2 → Stage 3 Data Structure
```json
{
  "refactoringDate": "2024-01-15",
  "changesApplied": [
    {
      "file": "src/components/Form.tsx",
      "changes": "Removed duplicate validation, added types",
      "linesChanged": 45,
      "autoFixed": true
    }
  ],
  "qualityMetrics": {
    "duplicationReduced": "18%",
    "typeSafety": "72%",
    "codeComplexity": "-15%"
  },
  "readyForArchitecture": true
}
```

### Stage 3 → Stage 4 Data Structure
```json
{
  "architectureDate": "2024-01-15",
  "reorganization": {
    "filesReorganized": 23,
    "newFolderStructure": { ... },
    "barrelExportsCreated": 5,
    "pathAliasesConfigured": true
  },
  "readyForPerformance": true
}
```

### Stage 4 → Stage 5 Data Structure
```json
{
  "performanceDate": "2024-01-15",
  "optimizations": [
    {
      "type": "code-split",
      "component": "GoogleMapsComponent",
      "sizeSavings": "142KB"
    }
  ],
  "metrics": {
    "bundleReduction": "18%",
    "lcpImprovement": "45ms"
  },
  "readyForTesting": true
}
```

---

## Error Handling & Recovery

If a stage fails:
1. **Document failure point**: Which agent, what was being processed
2. **Identify blockers**: What prevented completion
3. **Provide alternatives**: Can we skip this stage or use defaults?
4. **Request guidance**: Ask user how to proceed
5. **Continue if possible**: Move to next stage with available data
6. **Mark incomplete**: Flag in final report what wasn't finished

## Workflow Configuration Options

### Option 1: Full 5-Stage Optimization
```bash
/full-optimize [path]
```
Runs all 5 stages sequentially, complete analysis

### Option 2: Focused Stage
```bash
/stage [stage-number] [path]
```
Runs specific stage with all prerequisites

### Option 3: Specific Agent
```bash
/analyze-performance [path]
/audit-architecture [path]
/generate-tests [path]
```
Routes to specific agent, auto-selects prerequisite stages

---

## Success Validation

At each handoff, verify:
- ✓ All data from previous stage received
- ✓ Agents have required context
- ✓ Output format matches specification
- ✓ No data loss in transition
- ✓ Ready for next stage processing
