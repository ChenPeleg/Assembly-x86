import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { LineMap, Program } from "../../assembly/program";
import { CPU } from "../../emulation/cpu";
import { MemoryBlock } from "../../emulation/memory-block";
import { CpuPanelComponent } from "./cpu-panel.component";
import { RegisterComponent } from "./register";

describe("CpuPanelComponent control flow", () => {
  let fixture: ComponentFixture<CpuPanelComponent>;
  let cpu: CPU;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CpuPanelComponent, RegisterComponent],
    }).compileComponents();

    cpu = new CPU(new Program([], [], new LineMap()), new MemoryBlock(64));
    fixture = TestBed.createComponent(CpuPanelComponent);
    fixture.componentInstance.cpu = cpu;
    fixture.detectChanges();
  });

  it("renders the registers in order and updates their values", () => {
    const names = Array.from(
      fixture.nativeElement.querySelectorAll("#registers-list .name"),
      (element: Element) => element.textContent?.trim()
    );
    expect(names).toEqual(fixture.componentInstance.getRegisterKeys());

    cpu.getRegisterByName("EAX").setValue(42);
    fixture.detectChanges();

    const registers = fixture.nativeElement.querySelectorAll("register");
    expect(registers[1].querySelector(".value").textContent.trim()).toBe("42");
  });

  it("retains flag elements across checks while updating their values", () => {
    const flags = Array.from(
      fixture.nativeElement.querySelectorAll("#flags-list .flag")
    );
    expect(flags.length).toBe(6);

    cpu.statusWord.zero = true;
    cpu.statusWord.carry = true;
    fixture.detectChanges();

    const updatedFlags =
      fixture.nativeElement.querySelectorAll("#flags-list .flag");
    flags.forEach((flag, index) => expect(updatedFlags[index]).toBe(flag));
    expect(updatedFlags[0].querySelector(".value").textContent.trim()).toBe(
      "1"
    );
    expect(updatedFlags[3].querySelector(".value").textContent.trim()).toBe(
      "1"
    );
    expect(updatedFlags[1].querySelector(".value").textContent.trim()).toBe(
      "0"
    );
  });
});
