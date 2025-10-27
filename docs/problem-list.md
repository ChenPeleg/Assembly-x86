# Assembly-x86 Project Problems List

This document provides a comprehensive list of known problems, issues, and technical debt in the Assembly-x86 project.

## Critical Issues

### 1. Security Vulnerabilities (42 total)
**Severity**: Critical/High  
**Status**: Open  
**Description**: npm audit reports 42 vulnerabilities across dependencies:
- 5 Critical vulnerabilities
- 15 High severity vulnerabilities
- 13 Moderate severity vulnerabilities
- 9 Low severity vulnerabilities

**Key Vulnerable Packages**:
- `@babel/traverse` - Critical: Arbitrary code execution vulnerability
- `webpack` - Critical: Cross-realm object access and XSS vulnerabilities
- `semver` - High: Regular Expression Denial of Service (ReDoS)
- `ws` - High: DoS when handling requests with many HTTP headers
- `body-parser` - High: DoS vulnerability when URL encoding is enabled
- `follow-redirects` - Moderate: Improper URL handling
- `postcss` - Moderate: Line return parsing error
- Plus 35 additional vulnerabilities in transitive dependencies

**Remediation**: Run `npm audit fix` to update vulnerable dependencies

### 2. Node.js Engine Version Mismatch
**Severity**: Medium  
**Status**: Open  
**Description**: Package.json requires Node 18, but current system uses Node 20.19.5
- This causes npm warnings during installation
- May lead to unexpected behavior or compatibility issues

**Remediation**: Update package.json to support Node 18+ or ensure consistent Node version across environments

## Build Warnings

### 3. Bundle Size Budget Exceeded
**Severity**: Medium  
**Status**: Open  
**Description**: Main bundle significantly exceeds configured budget
- Budget: 500.00 kB
- Actual: 1.37 MB (exceeded by 902.05 kB)
- This affects load time and user experience

**Remediation**: 
- Implement code splitting
- Lazy load modules
- Tree shake unused code
- Consider increasing budget if justified

### 4. Component SCSS Files Exceed Budget
**Severity**: Low  
**Status**: Open  
**Files Affected**:
- `code-editor.component.scss`: Budget 2.00 kB, Actual 3.23 kB (+1.23 kB)
- `documentation.component.scss`: Budget 2.00 kB, Actual 3.31 kB (+1.31 kB)
- `layout.component.scss`: Budget 2.00 kB, Actual 4.70 kB (+2.70 kB)

**Remediation**: Refactor styles, remove duplicates, or adjust budgets

### 5. CommonJS Dependency Warning
**Severity**: Low  
**Status**: Open  
**Description**: `src/app/emulation/cpu.ts` depends on 'lodash' (CommonJS)
- CommonJS dependencies can cause optimization bailouts
- Affects tree-shaking and bundle size

**Remediation**: Use ES6 module version of lodash (`lodash-es`) or import specific functions

### 6. Autoprefixer CSS Warning
**Severity**: Low  
**Status**: Open  
**Description**: `async-validation-indicator.component.scss` uses deprecated CSS value
- Warning: "start value has mixed support, consider using flex-start instead"

**Remediation**: Replace `start` with `flex-start` in flexbox properties

## Test Issues

### 7. Test Spec Missing Expectations
**Severity**: Low  
**Status**: Open  
**Description**: Test spec 'Assembler Allows jumps to raw addresses' has no expectations
- Test passes but doesn't validate any behavior
- Could hide actual bugs

**Remediation**: Add proper assertions to the test spec

### 8. TypeScript Test Build Workaround
**Severity**: Medium  
**Status**: Workaround Applied  
**Description**: Originally encountered "Error: Module build failed (from ./node_modules/@ngtools/webpack/src/ivy/index.js)"
- Documented in `docs/test-build-js-problem.md`
- Workaround: Added `"allowJs": false` to `tsconfig.spec.json`
- This is not an ideal solution and may hide underlying issues

**Remediation**: Investigate root cause and implement proper fix

## Technical Debt

### 9. TODO: Reimplement ALU Operations
**Severity**: Medium  
**Status**: Open  
**Location**: `src/app/emulation/alu.ts`  
**Description**: Comment indicates need to "reimplement the operations in bitwise manner"
- Current implementation may not accurately represent x86 ALU behavior
- Could affect emulation accuracy

**Remediation**: Implement proper bitwise operations for ALU

### 10. Debug Code in Production
**Severity**: Low  
**Status**: Open  
**Location**: `src/app/components/code/code-editor/code-editor.component.ts`  
**Description**: Debug flag `DEBUG_NO_EVENTS` and related conditional code present
- Should be removed or properly handled for production builds

**Remediation**: Remove debug code or use environment-based flags

## Missing Features (from README)

### 11. Stack Visualizer
**Severity**: Medium  
**Status**: Not Implemented  
**Description**: Feature listed in README TODO section
- Would improve debugging and learning experience
- Important for understanding stack operations in assembly

### 12. Register Dereference Visualizer
**Severity**: Medium  
**Status**: Not Implemented  
**Description**: Feature listed in README TODO section
- Would help users understand pointer operations
- Important for memory addressing education

### 13. Proper 16-bit Arithmetic
**Severity**: Medium  
**Status**: Not Implemented  
**Description**: README mentions need for "Proper arithmetic using 16-bit? calculations"
- Current implementation may not accurately emulate x86 16-bit arithmetic
- Could lead to incorrect results in edge cases

### 14. More Instructions
**Severity**: Low  
**Status**: Not Implemented  
**Description**: Limited x86 instruction set coverage
- Missing instructions limit educational and practical use
- No specific instructions listed as missing

### 15. Comments on Empty Lines
**Severity**: Low  
**Status**: Not Implemented  
**Description**: Parser doesn't allow comments on empty lines
- Minor usability issue for code documentation

## Documentation Improvements Needed

### 16. README Formatting Issue
**Severity**: Low  
**Status**: Open  
**Description**: Line 34 in README.md has a formatting error
- "##Installation" missing space after ##
- Should be "## Installation"

**Remediation**: Add space after ## in the Installation header

### 17. Documentation ToDos
**Severity**: Low  
**Status**: Partially Implemented  
**Description**: From `docs/todo-list.md`:
- Documentation exists but could be expanded
- User guide for app usage is available but could be enhanced
- Assembly language teaching materials are comprehensive

### 18. Design System Migration
**Severity**: Low  
**Status**: Open  
**Description**: From `docs/todo-list.md`:
- "add angular materials to the design" - partially implemented
- Some inconsistency in Material Design usage across components

### 19. Legacy Dependency Removal
**Severity**: Low  
**Status**: ✅ Completed  
**Description**: From `docs/todo-list.md`:
- "loose the jquery and the bootstrap if possible"
- ✅ Verified: jQuery and Bootstrap are not present in package.json or source code
- This TODO has been completed

## Missing Repository Documentation

### 20. Missing CONTRIBUTING.md
**Severity**: Low  
**Status**: Missing  
**Description**: No CONTRIBUTING.md file to guide contributors
- Best practice for open source projects
- Helps new contributors understand how to contribute
- Should include guidelines for PRs, code style, testing requirements

**Remediation**: Create CONTRIBUTING.md with contribution guidelines

### 21. Missing CODE_OF_CONDUCT.md
**Severity**: Low  
**Status**: Missing  
**Description**: No CODE_OF_CONDUCT.md file
- Best practice for open source projects to ensure welcoming community
- GitHub recommends having this file

**Remediation**: Add CODE_OF_CONDUCT.md (can use standard Contributor Covenant)

### 22. Missing SECURITY.md
**Severity**: Low  
**Status**: Missing  
**Description**: No SECURITY.md file for security vulnerability reporting
- Important for responsible disclosure of security issues
- GitHub recognizes this file in the Security tab

**Remediation**: Create SECURITY.md with security policy and reporting instructions

## Recommendations

### Priority 1 (High Priority - Security & Critical)
1. Address security vulnerabilities with `npm audit fix`
2. Resolve Node.js version mismatch
3. Investigate and properly fix test build issue

### Priority 2 (Medium Priority - Performance & Features)
4. Reduce bundle size and address budget warnings
5. Implement missing core features (Stack Visualizer, Register Dereference Visualizer)
6. Fix proper 16-bit arithmetic implementation
7. Implement ALU bitwise operations

### Priority 3 (Low Priority - Code Quality)
8. Switch from lodash to lodash-es for better tree-shaking
9. Fix CSS warnings
10. Add test expectations to empty test specs
11. Remove debug code
12. Enable comments on empty lines
13. Complete design system migration
14. Expand instruction set coverage

## Summary Statistics

- **Total Issues**: 22
- **Critical**: 2
- **High**: 0
- **Medium**: 8
- **Low**: 11
- **Completed**: 1

Last Updated: 2025-10-27
