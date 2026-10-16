import { NgClass, NgStyle } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SpinnerWithCheckMarkComponent } from "../spinner-with-check-mark/spinner-with-check-mark.component";
import {
  AsyncValidationIndicatorComponent,
  GeneralFieldValidationStatus,
} from "./async-validation-indicator.component";

describe("AsyncValidationIndicatorComponent control flow", () => {
  let fixture: ComponentFixture<AsyncValidationIndicatorComponent>;
  let component: AsyncValidationIndicatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgClass, NgStyle],
      declarations: [
        AsyncValidationIndicatorComponent,
        SpinnerWithCheckMarkComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncValidationIndicatorComponent);
    component = fixture.componentInstance;
    component.textMessages = {
      NoInfo: "",
      Valid: "Ready",
      Invalid: "Invalid code",
      CodeChanged: "Code changed",
      Pending: "Assembling",
      Missing: "Missing code",
    };
  });

  it("hides the indicator without information or when explicitly hidden", () => {
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(".async-validation-indicator-wrapper")
    ).toBeNull();

    component.validationStatus = GeneralFieldValidationStatus.Valid;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(".async-validation-indicator-wrapper")
    ).not.toBeNull();

    component.hide = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(".async-validation-indicator-wrapper")
    ).toBeNull();

    component.hide = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(".async-validation-indicator-wrapper")
    ).not.toBeNull();
  });

  it("switches between spinner states and error icons with the correct message", () => {
    const states = [
      {
        status: GeneralFieldValidationStatus.Pending,
        spinner: "pending",
        message: "Assembling",
      },
      {
        status: GeneralFieldValidationStatus.Valid,
        spinner: "success",
        message: "Ready",
      },
      {
        status: GeneralFieldValidationStatus.Invalid,
        spinner: null,
        message: "Invalid code",
      },
      {
        status: GeneralFieldValidationStatus.Missing,
        spinner: null,
        message: "Missing code",
      },
      {
        status: GeneralFieldValidationStatus.CodeChanged,
        spinner: "changed",
        message: "Code changed",
      },
    ];

    for (const state of states) {
      component.validationStatus = state.status;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(
        By.directive(SpinnerWithCheckMarkComponent)
      );
      expect(spinner?.componentInstance.status ?? null).toBe(state.spinner);
      expect(
        fixture.nativeElement.querySelectorAll(".async-validation-icon-wrapper")
          .length
      ).toBe(1);
      expect(
        !!fixture.nativeElement.querySelector(".async-validation-icon-error")
      ).toBe(state.spinner === null);
      const message = fixture.nativeElement.querySelector(
        ".async-validation-message"
      );
      expect(message.textContent.trim()).toBe(state.message);
      expect(
        message.classList.contains(GeneralFieldValidationStatus[state.status])
      ).toBeTrue();
    }
  });
});
