import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  ViewChild,
} from "@angular/core";
import { MemoryBlock } from "../../emulation/memory-block";
import { CPU, Interrupt } from "../../emulation/cpu";
import { Assembler, AssemblyException } from "../../assembly/assembler";
import { Program } from "../../assembly/program";
import { Runtime } from "../../emulation/runtime";
import { Process } from "../../emulation/process";
import { ConsoleComponent } from "../console/console";
import { RuntimeException } from "../../emulation/runtime-exception";
import { Panel, UIState } from "../../models/UIState";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { MemoryDisplay } from "../../models/MemoryDisplay";
import { MemoryComponent } from "../memory/memory";
import { UserDataService } from "../../services/user-data.service";
import { TypeOfCodeInEditor } from "../../models/TypeOfCodeInEditor";
import { CodeEditorComponent } from "../code/code-editor/code-editor.component";
import { GeneralFieldValidationStatus } from "../../common/async-validation-indicator/async-validation-indicator.component";
import { sleep } from "../../util/sleep";

const defaultCode = `section .data
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

@Component({
  selector: "core-app",
  templateUrl: "./core-app.component.html",
  styleUrls: ["./core-app.component.scss"],
})
export class CoreAppComponent implements AfterViewInit, AfterContentInit {
  public codeStatus: GeneralFieldValidationStatus =
    GeneralFieldValidationStatus.NoInfo;
  public readonly compileMessages: Record<
    keyof typeof GeneralFieldValidationStatus,
    string
  > = {
    NoInfo: "",
    Pending: "",
    Valid: "",
    Invalid: "",
    CodeChanged: "",
    Missing: "",
  };
  @ViewChild(CodeEditorComponent) asmEditor: CodeEditorComponent | undefined;
  @ViewChild(ConsoleComponent) console: ConsoleComponent | undefined;
  @ViewChild(MemoryComponent) memory: MemoryComponent | undefined;
  @Input("isTryIt") isTryIt: boolean = false;
  runtime: Runtime = new Runtime();
  compileErrors: string = "";
  compileSuccess: string = "";
  uiState$: Observable<UIState>;
  protected readonly GeneralFieldValidationStatus =
    GeneralFieldValidationStatus;
  private assembler: Assembler = new Assembler();
  private cpu: CPU | undefined;
  private memorySize: number = 256;

  constructor(
    private store: Store<{
      count: number;
      uiState: UIState;
      memoryDisplay: MemoryDisplay;
    }>,
    private codeEditorService: UserDataService
  ) {
    this.uiState$ = store.select("uiState");
  }

  ngAfterContentInit(): void {
    setTimeout(() => this.requestCompile(), 50);
  }
  editorDocChanged(event: boolean) {
    if (this.codeStatus === GeneralFieldValidationStatus.NoInfo) {
      return;
    }
    this.codeStatus = GeneralFieldValidationStatus.CodeChanged;
  }
  ngAfterViewInit() {
    this.codeEditorService.updateCodeEditor({
      code: defaultCode,
      typeOfCode: TypeOfCodeInEditor.Default,
      savedCodeId: null,
    });
  }

  compileSource(source: string) {
    try {
      this.codeStatus = GeneralFieldValidationStatus.Pending;
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
      sleep(400).then(() => {
        this.codeStatus = GeneralFieldValidationStatus.Valid;
      });
      // this.compileSuccess = "Assembled successfully!";
    } catch (e) {
      if (e instanceof AssemblyException) {
        this.compileErrors = `Error at line ${e.line}: ${e.message}`;
        this.codeStatus = GeneralFieldValidationStatus.Invalid;
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
      visibility: !!panel?.isVisible,
    };
  }

  private handleInterrupt(interrupt: Interrupt) {
    try {
      if (!this.cpu) {
        return;
      }
      switch (interrupt) {
        case Interrupt.WRITE_NUM:
          this.print(this.cpu.getRegisterByName("EAX").getValue().toString());
          break;
        case Interrupt.WRITE_STRING: {
          let data: string = "";
          let start: number = this.cpu.getRegisterByName("EAX").getValue();
          while (true) {
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
    this.console?.print(value);
  }
}
