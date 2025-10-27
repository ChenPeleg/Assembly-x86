# Documentation Index

This directory contains technical documentation and planning materials for the Assembly-x86 project.

## Contents

### Project Status & Planning

- **[problem-list.md](problem-list.md)** - Comprehensive list of known issues, bugs, and technical debt
  - Security vulnerabilities (42 total)
  - Build warnings and performance issues
  - Missing features and technical debt
  - Repository documentation gaps

- **[todo-list.md](todo-list.md)** - High-level TODO items for the project
  - Angular Material integration
  - Documentation improvements
  - Legacy dependency removal (completed ✅)

### Technical Notes

- **[test-build-js-problem.md](test-build-js-problem.md)** - Documentation of test build issue and workaround
  - Error: Module build failed from @ngtools/webpack
  - Current workaround: `allowJs: false` in tsconfig.spec.json

- **[angular-material.md](angular-material.md)** - Angular Material design system guide
  - Color palette definitions
  - Theme configuration instructions

- **[insparations.md](insparations.md)** - List of similar projects and inspirations
  - Best examples: davis, assembler-simulator
  - Reference implementations

## Quick Links

- [Main README](../README.md)
- [Task Planning](./_tasks/)
- [Source Code](../src/)

## Reporting New Issues

If you discover new problems or issues:
1. Check if it's already listed in [problem-list.md](problem-list.md)
2. For security issues, follow responsible disclosure (see planned SECURITY.md)
3. For general issues, open a GitHub issue with detailed reproduction steps

Last Updated: 2025-10-27
