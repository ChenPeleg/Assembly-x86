import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MemoryBlock } from "../../emulation/memory-block";
import { CPU, Interrupt } from "../../emulation/cpu";
import { Assembler, AssemblyException } from "../../assembly/assembler";
import { Program } from "../../assembly/program";
import { AsmEditorComponent } from "../asm-editor/asm-editor";
import { Runtime } from "../../emulation/runtime";
import { Process } from "../../emulation/process";
import { ConsoleComponent } from "../console/console";
import { RuntimeException } from "../../emulation/runtime-exception";
import { Panel, UIState } from "../../models/UIState";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "core-app",
  templateUrl: "./core-app.component.html",
  styleUrls: ["./core-app.component.scss"],
})
export class CoreAppComponent implements AfterViewInit {
  @ViewChild(AsmEditorComponent) asmEditor: AsmEditorComponent | undefined;
  @ViewChild(ConsoleComponent) console: ConsoleComponent | undefined;

  runtime: Runtime = new Runtime();
  compileErrors: string = "";
  uiState$: Observable<UIState>;
  private assembler: Assembler = new Assembler();
  private cpu: CPU | undefined;
  private memorySize: number = 256;

  constructor(private store: Store<{ count: number; uiState: UIState }>) {
    this.uiState$ = store.select("uiState");
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.asmEditor.text = `section .data
hello:
    db 'Hello world!', 10, 0
section .text
    MOV EAX, hello
    INT 2   ; print string EAX

    PUSH 5
    CALL factorial
    INT 1   ; print EAX
    HLT

factorial:
    ENTER

    CMP [EBP + 8], 1
    JNE .recurse
    MOV EAX, 1
    JMP .end

.recurse:
    MOV EAX, [EBP + 8]
    DEC EAX

    PUSH EAX
    CALL factorial

    IMUL [EBP + 8]

.end:
    LEAVE
    RET
`;
    this.requestCompile();
  }
  public memoryChecked($event: any): void {
    const memory: any = this.runtime.process?.cpu?.memory;
    if (memory && $event?.target?.checked) {
      memory.ascii = $event?.target?.checked;
    }
  }

  compileSource(source: string) {
    try {
      let program: Program = this.assembler.assemble(source);
      let memory: MemoryBlock = new MemoryBlock(this.memorySize);
      this.cpu = new CPU(program, memory);
      this.cpu.onInterrupt.subscribe((interrupt: Interrupt) =>
        this.handleInterrupt(interrupt)
      );
      this.cpu.onError.subscribe((runtimeException: RuntimeException) =>
        alert(runtimeException.message)
      );
      // @ts-ignore
      this.cpu.breakpoints = this.asmEditor.breakpoints;
      this.runtime.process = new Process(this.cpu);

      this.compileErrors = "";
    } catch (e) {
      if (e instanceof AssemblyException) {
        this.compileErrors = `Error at line ${e.line}: ${e.message}`;
      } else {
        throw e;
      }
    }
  }

  onBreakpointChanged(breakpoints: number[]) {
    if (this.runtime.hasProcess()) {
      this.runtime.process.cpu.breakpoints = breakpoints;
    }
  }

  getActiveLine(): number {
    if (this.runtime.hasProcess() && this.runtime.process.isStarted()) {
      return this.runtime.process.cpu.activeLine;
    } else {
      // @ts-ignore
      return null;
    }
  }

  /**
   * Calls to compile emit from outside the asm editor component
   */
  requestCompile(): void {
    if (!this.asmEditor) {
      throw "Error: asm Editor has no content";
    }
    this.asmEditor?.emitCompile();
  }

  public getDisplayProps(
    panelName: "console" | "cpu" | "memory",
    panels: Panel[]
  ): { order: number; visibility: boolean } {
    const panel = panels.find((p) => p.name === panelName);
    return {
      order: panel?.order || 1,
      visibility: panel?.isVisible || true,
    };
  }

  private handleInterrupt(interrupt: Interrupt) {
    try {
      switch (interrupt) {
        case Interrupt.WRITE_NUM:
          // @ts-ignore
          this.print(this.cpu.getRegisterByName("EAX").getValue().toString());
          break;
        case Interrupt.WRITE_STRING: {
          let data: string = "";
          // @ts-ignore
          let start: number = this.cpu.getRegisterByName("EAX").getValue();
          while (true) {
            // @ts-ignore
            let char = this.cpu.derefAddress(start, 1).getValue();
            if (char === 0) {
              break;
            }
            data += String.fromCharCode(char);
            start++;
          }
          this.print(data);
          break;
        }
        default: {
          throw new RuntimeException("Unknown interrupt code: " + interrupt);
        }
      }
    } catch (e) {
      // @ts-ignore
      this.cpu.pause();
      // @ts-ignore
      alert(e.message);
    }
  }

  private print(value: string) {
    // @ts-ignore
    this.console.print(value);
  }
}
