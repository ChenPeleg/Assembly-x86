import { NgModule } from "@angular/core";
import { SmallIconButtonComponent } from "./small-icon-button/small-icon-button.component";
import { AllMatModules } from "../app.module";

@NgModule({
  imports: [...AllMatModules],
  declarations: [SmallIconButtonComponent],
  exports: [SmallIconButtonComponent],
})
export class SharedModule {}
