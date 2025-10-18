


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

## Documentation

📚 **Comprehensive Documentation Plan Available!**

We're expanding our documentation to create a complete learning resource for assembly programming. Check out our documentation plans:

- **[Documentation Summary](docs/SUMMARY.md)** - Quick overview of the documentation expansion plan
- **[Content Plan](docs/documentation-content-plan.md)** - Detailed strategy and roadmap
- **[Quick Start Guide](docs/documentation-quick-start.md)** - Start contributing in 5 minutes
- **[All Documentation Plans](docs/)** - Complete planning documents

### Contributing to Documentation

We welcome contributions! Whether you're fixing typos, writing tutorials, or creating comprehensive guides, every contribution helps. See our [Quick Start Guide](docs/documentation-quick-start.md) to get started.

## TODO
* Stack visualizer
* Register dereference visualiser
* Proper arithmetic using 16-bit? calculations
* More instructions
* Enable comments on empty lines

## Installation
Run `npm install`.

## Usage
Opens the site in browser.
```shell
npm start
```

### Tests
```shell
npm test
```

### Build
Builds the application into `dist` folder.
```shell
npm run build
```
