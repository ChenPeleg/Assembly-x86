import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Process } from "../../emulation/process";

export type Button = "start" | "stop" | "pause" | "continue" | "step";

@Component({
  selector: "execution-controls",
  templateUrl: "./execution.html",
})
export class ExecutionComponent {
  public readonly Buttons: Button[] = [
    "start",
    "stop",
    "pause",
    "continue",
    "step",
  ];
  // @ts-ignore
  @Input() process: Process = null;

  @Output() start: EventEmitter<Process> = new EventEmitter<Process>();
  @Output() stop: EventEmitter<Process> = new EventEmitter<Process>();
  @Output() continueEvent: EventEmitter<Process> = new EventEmitter<Process>();
  @Output() pause: EventEmitter<Process> = new EventEmitter<Process>();
  @Output() step: EventEmitter<Process> = new EventEmitter<Process>();

  onStart() {
    this.start.emit(this.process);
    this.process.start();
  }
  getIsDisabled(button: Button): boolean {
    if (this.process === null) {
      return true;
    }

    switch (button) {
      case "start":
        return this.process.isStarted();
      case "stop":
        return !this.process.isStarted();
      case "pause":
        return !this.process.isRunning();
      case "continue":
        return !this.process.isPaused();
      case "step":
        return !this.process.isPaused();
      default:
        return false;
    }
  }

  onStop() {
    this.stop.emit(this.process);
    this.process.cpu.halt();
  }
  public onContinue() {
    this.continueEvent.emit(this.process);
    this.process.cpu.run();
  }

  onPause() {
    this.pause.emit(this.process);
    this.process.cpu.pause();
  }

  onStep() {
    this.step.emit(this.process);
    this.process.cpu.step();
  }
}
