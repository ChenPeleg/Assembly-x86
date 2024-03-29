import { Component, Input } from "@angular/core";
import { CPU } from "../../emulation/cpu";

@Component({
  selector: "cpu",
  templateUrl: "./cpu-panel.component.html",
  styleUrls: ["./cpu-panel.component.scss"],
})
export class CpuPanelComponent {
  // @ts-ignore
  @Input() cpu: CPU = null;

  getRegisterKeys(): string[] {
    return ["EIP", "EAX", "EBX", "ECX", "EDX", "EBP", "ESP", "ESI", "EDI"];
  }
  getFlags(): { name: string; value: boolean }[] {
    return [
      { name: "ZF", value: this.cpu.statusWord.zero },
      { name: "SF", value: this.cpu.statusWord.signum },
      { name: "OF", value: this.cpu.statusWord.overflow },
      { name: "CF", value: this.cpu.statusWord.carry },
      { name: "DF", value: this.cpu.statusWord.direction },
      { name: "PF", value: this.cpu.statusWord.parity },
    ];
  }
}
