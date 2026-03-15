# Plan: Upgrade Angular to Latest Version

## Objective
Upgrade Angular from v15 to the latest stable version using the Angular CLI `ng update` tool, one major version at a time, with minimal manual changes.

## Steps
1. Check current state: `ng version`
2. Upgrade one major version at a time:
   - `npx ng update @angular/core@16 @angular/cli@16 @angular/material@16 @angular-builders/custom-webpack@16`
   - `npx ng update @angular/core@17 @angular/cli@17 @angular/material@17 @angular-builders/custom-webpack@17`
   - `npx ng update @angular/core@18 @angular/cli@18 @angular/material@18 @angular-builders/custom-webpack@18`
   - `npx ng update @angular/core@19 @angular/cli@19 @angular/material@19 @angular-builders/custom-webpack@19`
3. After each major version: `npm run build` and `npm test`
4. Update `engines.node` in `package.json` if Angular requires Node 20+
5. Final production build: `npm run build:prod`

## Notes
- `ng update` auto-applies schematics — do not skip versions
- `@angular-builders/custom-webpack` may lag; check [npm](https://www.npmjs.com/package/@angular-builders/custom-webpack) for latest compatible version at each step
- `zone.js`, `rxjs`, and `typescript` version ranges are managed automatically by `ng update`

