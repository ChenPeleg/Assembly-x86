


# x86 assembly debugger

**This project is based on [https://github.com/Kobzol/davis](https://github.com/Kobzol/davis)**
This tool allows writing, running and debugging x86 assembly in the browser.<br />
It visualizes the program state (cpu and memory), supports breakpoints and<br />
enables line-by-line stepping.

You can try it online [[here](https://chenpeleg.github.io/Assembly-x86/)

## Features
* x86 assembly editor
  * Intel/NASM syntax with syntax-highlighting
  * breakpoints
  * current execution line highlight
* CPU emulation
  * run, stop, pause, continue, step execution
  * register and status flags visualization
  * tick rate setting
* Memory visualization
  * variable byte size (1/2/4)
  * ASCII visualization
* Output console

## TODO
* Stack visualizer
* Register dereference visualiser
* Proper arithmetic using 16-bit? calculations
* More instructions
* Enable comments on empty lines

##Installation
Run `npm install`.

## Usage
Opens the site in browser.
```shell
npm start
```

###Tests
```shell
npm test
```

###Build
Builds the application into `dist` folder.
```shell
npm run build
```

## README Improvement Plan
This issue requests a plan, so the items below are proposed README edits for a follow-up implementation pass.

1. **Fix Markdown formatting issues**
   - Close the "You can try it online" link correctly.
   - Add missing spaces in headings (for example, `## Installation`, `### Tests`, `### Build`).

2. **Improve setup command consistency**
   - Use `npm ci` as the primary install command for reproducible setup.
   - Keep command examples aligned with scripts in `package.json` (for example, `npm test` for local runs and `npm run test:ci` for CI usage).

3. **Improve wording clarity**
   - Replace short/unclear phrases like "Opens the site in browser." with clearer usage descriptions.
   - Normalize capitalization and terminology across sections (CPU, memory, and use **visualizer** consistently).

4. **Refresh project overview**
   - Add a short "Quick Start" flow (install → start → open browser).
   - Link to in-app docs under `src/assets/documentation/` for users who want tutorials.
