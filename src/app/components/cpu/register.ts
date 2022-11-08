import {Component, Input} from "@angular/core";
import {CPU} from "../../emulation/cpu";

@Component({
    selector: "register",
    templateUrl: "./register.html"
})
export class RegisterComponent
{
    // @ts-ignore
  @Input() cpu: CPU = null;
    @Input() name: string = "";

  getValue(): number
    {
        return this.cpu.getRegisterByName(this.name).getValue();
    }
}
