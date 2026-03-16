import { NgModule } from "@angular/core";
import { SmallIconButtonComponent } from "./small-icon-button/small-icon-button.component";
import { AllCdkModules } from "../app.module";
import { AsyncValidationIndicatorComponent } from "./async-validation-indicator/async-validation-indicator.component";
import { SpinnerWithCheckMarkComponent } from "./spinner-with-check-mark/spinner-with-check-mark.component";
import { NgClass, NgIf, NgOptimizedImage, NgStyle } from "@angular/common";

@NgModule({
  imports: [...AllCdkModules, NgClass, NgStyle, NgIf, NgOptimizedImage],
  declarations: [
    SmallIconButtonComponent,
    AsyncValidationIndicatorComponent,
    SpinnerWithCheckMarkComponent,
  ],
  exports: [
    SmallIconButtonComponent,
    AsyncValidationIndicatorComponent,
    SpinnerWithCheckMarkComponent,
  ],
})
export class SharedModule {}
