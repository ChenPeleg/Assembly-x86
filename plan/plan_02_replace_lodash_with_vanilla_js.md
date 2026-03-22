# Plan 2: Replace Lodash with Vanilla JS

## Objective
Remove the `lodash` and `@types/lodash` dependencies and replace every lodash call with an equivalent vanilla JS expression. Lodash is used in five files across the assembly, emulation, and component layers.

## Lodash Usages and Vanilla JS Replacements

### 1. `src/app/assembly/encoding.ts`
| Lodash | Vanilla JS |
|--------|-----------|
| `_.map(this.parameters, fn)` | `this.parameters.map(fn)` |

### 2. `src/app/assembly/program.ts`
| Lodash | Vanilla JS |
|--------|-----------|
| `_.findLast(this.mapping, (line, key) => key <= address)` | `Object.entries(this.mapping).findLast(([key]) => Number(key) <= address)?.[1]` |
| `_.findKey(this.mapping, (line) => line === row)` | `Object.keys(this.mapping).find(key => this.mapping[key] === row)` |

### 3. `src/app/assembly/label.ts`
| Lodash | Vanilla JS |
|--------|-----------|
| `_.each(this.unresolvedParameters, fn)` | `this.unresolvedParameters.forEach(fn)` |
| `_.has(this.labels, label)` | `Object.hasOwn(this.labels, label)` |
| `_.findLast(this.labels, (label) => !label.local && label.address <= address)` | `Object.values(this.labels).findLast(label => !label.local && label.address <= address)` |

### 4. `src/app/assembly/assembler.ts`
| Lodash | Vanilla JS |
|--------|-----------|
| `_.has(obj, key)` | `Object.hasOwn(obj, key)` |
| `_.map(operands, fn)` | `operands.map(fn)` |
| `_.isEqual(a, b)` | `JSON.stringify(a) === JSON.stringify(b)` (safe here: masks are plain string arrays with deterministic key order) |
| `_.includes(arr, val)` | `arr.includes(val)` |

### 5. `src/app/emulation/cpu.ts`
| Lodash | Vanilla JS |
|--------|-----------|
| `_.map(_.range(10), fn)` | `Array.from({length: 10}, fn)` |
| `_.keys(REGISTER_INDEX).forEach(fn)` | `Object.keys(REGISTER_INDEX).forEach(fn)` |
| `_.filter(_.map(value, fn), pred)` | `value.map(fn).filter(pred)` |
| `_.findKey(REGISTER_INDEX, pred)` | `Object.keys(REGISTER_INDEX).find(key => pred(REGISTER_INDEX[key]))` |
| `_.includes(this._breakpoints, this.eip)` | `this._breakpoints.includes(this.eip)` |

### 6. `src/app/components/memory/memory.ts`
| Lodash | Vanilla JS |
|--------|-----------|
| `_.range(count)` | `Array.from({length: count}, (_, i) => i)` |

## Steps

1. **Replace lodash calls file by file** using the table above
   - `src/app/assembly/encoding.ts`
   - `src/app/assembly/program.ts`
   - `src/app/assembly/label.ts`
   - `src/app/assembly/assembler.ts`
   - `src/app/emulation/cpu.ts`
   - `src/app/components/memory/memory.ts`

2. **Remove lodash imports** — delete `import * as _ from "lodash";` from each file above

3. **Uninstall lodash packages**
   - `npm uninstall lodash @types/lodash`
   - Remove corresponding entries from `package.json` and `package-lock.json`

4. **Verify**
   - Run `npm run build` — no compilation errors
   - Run `npm test` — all existing tests pass
   - Manual smoke-test: assemble and run the default program; confirm registers, memory, and breakpoints all work correctly
