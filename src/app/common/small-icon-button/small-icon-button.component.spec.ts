import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SmallIconButtonComponent } from "./small-icon-button.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTreeModule } from "@angular/material/tree";
import { MatTooltipModule } from "@angular/material/tooltip";

describe("SmallIconButtonComponent", () => {
  let component: SmallIconButtonComponent;
  let fixture: ComponentFixture<SmallIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
        MatTooltipModule,
      ],
      declarations: [SmallIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmallIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
