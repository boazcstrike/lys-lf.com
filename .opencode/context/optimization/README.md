# Code Optimization System - Complete Guide

**Version**: 1.0.0  
**Project**: lys-lf-react-19  
**Stack**: Next.js 14+, React 19, TypeScript, Tailwind CSS, SCSS  

---

## Overview

This complete code optimization system provides comprehensive analysis and improvement recommendations across five dimensions:

1. **Performance** - Bundle size, rendering efficiency, lazy loading
2. **Type Safety** - Eliminate any types, improve type inference
3. **Architecture** - Component structure, organization, design patterns
4. **Code Quality** - Duplication, readability, naming conventions
5. **Testing** - Coverage gaps, test templates, TDD strategies

## Quick Start

### Three Main Commands

```bash
# Comprehensive performance audit
/analyze-performance [path]

# Architecture and design evaluation
/audit-architecture [path]

# Test coverage analysis and generation
/generate-tests [path]

# Full 5-stage optimization (manual coordinate)
# Uses orchestrator to run all stages sequentially
```

## System Architecture

### Master Orchestrator
**File**: `.opencode/agent/optimization/code-optimizer-orchestrator.md`

Controls the 5-stage sequential workflow, allocates context to subagents, coordinates output.

### Five Specialized Subagents

1. **Performance Optimizer** (`performance-optimizer.md`)
   - Bundle size analysis
   - Rendering efficiency
   - Lazy loading opportunities
   - Image & asset optimization

2. **Type Safety Specialist** (`type-safety-specialist.md`)
   - Any type detection
   - Type inference improvements
   - React 19 patterns
   - Component prop typing

3. **Architecture Reviewer** (`architecture-reviewer.md`)
   - Component structure
   - Folder organization
   - Design patterns
   - Separation of concerns

4. **Quality Assurance Agent** (`quality-assurance-agent.md`)
   - Code duplication
   - Readability issues
   - Naming conventions
   - Dead code detection

5. **Test Strategy Agent** (`test-strategy-agent.md`)
   - Coverage analysis
   - Test templates
   - TDD patterns
   - Testing roadmap

## Workflow Stages

### Stage 1: Analysis
All agents scan codebase simultaneously, identify issues, create consolidated report.

**Input**: File/directory or full project scope  
**Output**: Analysis of all optimization opportunities  
**Time**: 5-15 minutes

### Stage 2: Refactoring
Type Safety Specialist and Quality Assurance Agent fix code quality and typing issues.

**Input**: Analysis report  
**Output**: Type-safe, quality-improved code  
**Auto-fixes**: Safe changes applied immediately  
**Approvals**: Complex changes reviewed by user  
**Time**: Varies by scope

### Stage 3: Architecture
Architecture Reviewer restructures components and folders for better organization.

**Input**: Refactored code  
**Output**: Well-organized, principle-aligned code  
**Auto-fixes**: Folder creation, barrel exports, path aliases  
**Approvals**: Major restructuring reviewed by user  
**Time**: Varies by scope

### Stage 4: Performance
Performance Optimizer applies optimizations based on earlier findings.

**Input**: Architecturally sound code  
**Output**: Performant, optimized code  
**Auto-fixes**: Memoization, code splitting, dynamic imports  
**Approvals**: Complex optimizations reviewed by user  
**Time**: Varies by scope

### Stage 5: Testing
Test Strategy Agent generates test templates and coverage recommendations.

**Input**: Optimized code  
**Output**: Test templates, coverage analysis, testing roadmap  
**Auto-fixes**: Test directory structure, helper files  
**User implements**: Actual test code  
**Time**: Planning phase (user implements based on roadmap)

## Context Files

### Domain Knowledge

**Performance Guidelines** (`domain/performance-guidelines.md`)
- Next.js/React 19 performance best practices
- Code splitting and bundling strategies
- Rendering optimization patterns
- Core Web Vitals optimization

**Type Safety Standards** (`domain/type-safety-standards.md`)
- TypeScript strict mode configuration
- Type safety patterns
- React 19 type patterns
- Generic types and utility types

**Architecture Principles** (`domain/architecture-principles.md`)
- Component design principles
- Folder structure patterns
- Design patterns (compound components, hooks, context)
- Separation of concerns

**Code Quality Standards** (`domain/code-quality-standards.md`)
- Naming conventions (all categories)
- Code organization standards
- Readability guidelines
- Comment standards and JSDoc

### Process Knowledge

**Sequential Workflow** (`processes/sequential-workflow.md`)
- 5-stage workflow details
- Data flow between stages
- Error handling and recovery
- Stage-specific handoff protocols

**Safe Auto-Fix Rules** (`processes/safe-autofix-rules.md`)
- Explicit auto-fixable changes
- Approval-required changes
- Safety guidelines (3-question test)
- Examples by category

## Commands

### `/analyze-performance [path]`

Comprehensive performance audit with actionable suggestions.

```bash
/analyze-performance                 # Analyze entire project
/analyze-performance src/components  # Analyze components folder
/analyze-performance app/page.tsx    # Analyze single file
```

**Output includes**:
- Bundle size breakdown
- Rendering efficiency analysis
- Code splitting opportunities
- Expected performance improvements
- Phased implementation roadmap

### `/audit-architecture [path]`

Architecture and design pattern evaluation.

```bash
/audit-architecture                  # Analyze entire project
/audit-architecture src/components   # Analyze components
/audit-architecture app/(routes)     # Analyze routes
```

**Output includes**:
- Component structure analysis
- Folder organization review
- Design pattern evaluation
- Code reusability assessment
- Restructuring recommendations

### `/generate-tests [path]`

Test coverage analysis and template generation.

```bash
/generate-tests                      # Analyze project tests
/generate-tests src/components       # Test component coverage
/generate-tests src/hooks            # Test hook coverage
```

**Output includes**:
- Coverage baseline and gaps
- Untested components (prioritized)
- Test templates for components/hooks
- TDD recommendations
- Testing roadmap with phases

## Auto-Fix vs Approval

### Automatically Applied (No Review Needed) ✅

- Remove unused imports and variables
- Fix import organization
- Add obvious type annotations
- Format code with Prettier
- Remove console.log and debugger
- Fix ESLint warnings (non-breaking)
- Remove dead code
- Organize exports
- Add missing React imports
- Create folder structure
- Setup barrel exports

### Requires User Approval ⏸️

- Component refactoring and splitting
- Extracting custom hooks
- Major folder reorganization
- Type conversion (complex cases)
- Performance optimizations (behavior impact)
- Utility extraction
- Dependency changes
- Breaking API changes
- Test implementation

## Integration with Existing Tools

### TypeScript & Build System
- Validates against tsconfig.json settings
- Verifies build compatibility
- Checks ESLint configuration
- Integrates with Next.js build pipeline

### Existing Agents
- **codebase-agent**: Deep structural understanding
- **frontend-specialist**: React/Next.js patterns
- **reviewer**: Complex decision validation
- **tester**: Test generation support
- **build-agent**: Build validation

### Development Standards
- Follows project naming conventions
- Respects existing code patterns
- Maintains current coding style
- Preserves project structure intent

## Output Reports

All stages generate detailed reports:

### Performance Report
- Bundle analysis
- Rendering efficiency
- Performance metrics
- Implementation roadmap

### Type Safety Audit
- Any types found
- Conversion recommendations
- Type safety improvements
- React 19 patterns

### Architecture Review
- Structure evaluation
- Organization recommendations
- Design pattern analysis
- Reusability assessment

### Quality Assessment
- Duplication analysis
- Readability issues
- Naming violations
- Code quality metrics

### Test Strategy
- Coverage analysis
- Untested components
- Test templates
- Testing roadmap

## Best Practices

### When to Run Full Optimization

1. **Project Planning**: Early in new project
2. **Before Major Release**: Comprehensive cleanup
3. **After Feature Sprint**: Check quality baseline
4. **Regular Audits**: Monthly/quarterly health check

### When to Run Specific Commands

- **Performance concerns**: `/analyze-performance`
- **Refactoring**: `/audit-architecture`
- **Coverage goals**: `/generate-tests`
- **Code review**: All three commands

### Workflow Tips

1. **Start with Analysis**: Understand current state
2. **Fix Critical Issues**: Address severity 1 items
3. **Refactor Incrementally**: Phase changes over time
4. **Test Thoroughly**: Before and after refactoring
5. **Monitor Metrics**: Track improvements

## Examples

### Example 1: Performance Optimization

```bash
/analyze-performance lys-lf-react-19

# Output:
# - GoogleMapsComponent: 142 KB, lazy load saves on initial load
# - Bundle size: 245 KB → 198 KB (19% reduction)
# - Expected improvement: LCP 2.3s → 1.8s

# Implementation:
# 1. Lazy load GoogleMaps (auto-fixable)
# 2. Code split /admin routes (approval needed)
# 3. Add React.memo to expensive components (auto-fixable)
```

### Example 2: Architecture Review

```bash
/audit-architecture src/components

# Output:
# - Dashboard component: 450 lines, split into 3 components
# - New folder structure recommended
# - Extract useUser custom hook
# - Implement barrel exports

# Implementation:
# 1. Create new folder structure (auto-fixable)
# 2. Split Dashboard (approval needed)
# 3. Extract hooks (approval needed)
# 4. Update imports (auto-fixable)
```

### Example 3: Test Coverage

```bash
/generate-tests src/components

# Output:
# - Current coverage: 42%
# - Critical components without tests: 8
# - Test templates generated
# - Roadmap: 4 weeks to 85% coverage

# Implementation:
# 1. Run Phase 1 tests (user implements based on templates)
# 2. Run Phase 2 tests (user implements)
# 3. Verify coverage with test runner
# 4. Continue phases as needed
```

## Troubleshooting

### Command Not Found
- Ensure `.opencode/command/optimization/` files exist
- Check command file names match exactly
- Verify YAML frontmatter in command files

### Missing Context
- Context files in `.opencode/context/optimization/`
- Check `domain/`, `processes/`, `standards/`, `templates/` folders
- Verify all context files created

### Agents Not Responding
- Check agent files in `.opencode/agent/optimization/`
- Verify subagent files in `subagents/` folder
- Ensure orchestrator can invoke subagents

### Reports Not Generated
- Check orchestrator coordination
- Verify agent output formatting
- Ensure all 5 stages completing

## Performance Expectations

| Command | Scope | Time |
|---------|-------|------|
| `/analyze-performance` | Full project | 5-15 min |
| `/audit-architecture` | Full project | 10-20 min |
| `/generate-tests` | Full project | 10-15 min |
| Full optimization | Full project | 30-60 min |

## Success Metrics

After running optimization system:

- ✅ Code quality score improved
- ✅ Type safety increased (% of any types reduced)
- ✅ Bundle size optimized (KB reduction)
- ✅ Architecture improved (simpler component structure)
- ✅ Test coverage increased
- ✅ Development velocity improved
- ✅ Refactoring confidence increased

## Support & Documentation

- **Context Files**: Comprehensive guides for each domain
- **Agent Prompts**: Detailed instructions in agent files
- **Command Files**: Usage examples and details
- **Workflow Guide**: Sequential process explanation
- **Auto-Fix Rules**: Explicit safety guidelines

## Next Steps

1. **Run initial audit**: `/{analyze-performance|audit-architecture|generate-tests}`
2. **Review report**: Understand current state and gaps
3. **Approve changes**: Review approval-needed items
4. **Implement roadmap**: Follow phased recommendations
5. **Monitor metrics**: Track improvements over time
6. **Run periodic audits**: Keep system optimized

---

## System Files Summary

```
.opencode/
├── agent/
│   └── optimization/
│       ├── code-optimizer-orchestrator.md
│       └── subagents/
│           ├── performance-optimizer.md
│           ├── type-safety-specialist.md
│           ├── architecture-reviewer.md
│           ├── quality-assurance-agent.md
│           └── test-strategy-agent.md
│
├── command/
│   └── optimization/
│       ├── analyze-performance.md
│       ├── audit-architecture.md
│       └── generate-tests.md
│
└── context/
    └── optimization/
        ├── domain/
        │   ├── performance-guidelines.md
        │   ├── type-safety-standards.md
        │   ├── architecture-principles.md
        │   └── code-quality-standards.md
        │
        ├── processes/
        │   ├── sequential-workflow.md
        │   ├── safe-autofix-rules.md
        │   ├── approval-workflow.md
        │   └── integration-guide.md
        │
        ├── standards/
        │   ├── typescript-config-reference.md
        │   ├── eslint-prettier-standards.md
        │   └── next-js-patterns.md
        │
        └── README.md (this file)
```

**Total**: 5 agents + 3 commands + 13 context files = Complete optimization system
