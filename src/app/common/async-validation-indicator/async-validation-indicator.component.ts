import { Component, Input } from "@angular/core";

export enum GeneralFieldValidationStatus {
  NoInfo = 0,
  Valid = 1,
  Invalid = 2,
  CodeChanged = 3,
  Pending = 4,
  Missing = 5,
}
@Component({
    selector: "async-validation-indicator",
    template: ` @if (validationStatus !== AsyncValidationStatus.NoInfo && !_hide) {
  <div
    class="async-validation-indicator-wrapper"
    >
    @if (
      validationStatus === AsyncValidationStatus.Valid ||
      validationStatus === AsyncValidationStatus.Pending
      ) {
      <div
        class="async-validation-icon-wrapper check-spinner"
        >
        <spinner-with-check-mark
        [status]="
          validationStatus === AsyncValidationStatus.Pending
            ? 'pending'
            : 'success'
        "
        ></spinner-with-check-mark>
      </div>
    }
    @if (
      validationStatus === AsyncValidationStatus.Invalid ||
      validationStatus === AsyncValidationStatus.Missing
      ) {
      <div
        class="async-validation-icon-wrapper"
        >
        <div class="async-validation-icon-error">
          <img
            ngSrc="../../../assets/svg/form-error-icon.svg"
            alt="error"
            height="24"
            width="24"
            />
        </div>
      </div>
    }
    @if (validationStatus === AsyncValidationStatus.CodeChanged) {
      <div
        class="async-validation-icon-wrapper check-spinner"
        >
        <spinner-with-check-mark [status]="'changed'"></spinner-with-check-mark>
      </div>
    }
    <div
      class="async-validation-message "
      [ngClass]="AsyncValidationStatus[validationStatus]"
      >
      {{ message }}
    </div>
  </div>
}`,
    styleUrls: ["./async-validation-indicator.component.css"],
    standalone: false
})
export class AsyncValidationIndicatorComponent {
  public AsyncValidationStatus = GeneralFieldValidationStatus;
  @Input() public validationStatus: GeneralFieldValidationStatus =
    GeneralFieldValidationStatus.NoInfo;
  @Input("textMessages") public textMessages:
    | Record<keyof typeof GeneralFieldValidationStatus, string>
    | undefined;

  constructor() {}

  public _hide: boolean = false;

  @Input("hide") public set hide(value: boolean) {
    this._hide = value;
  }

  get message() {
    // @ts-ignore
    return this.textMessages[
      GeneralFieldValidationStatus[this.validationStatus]
    ];
  }
}
