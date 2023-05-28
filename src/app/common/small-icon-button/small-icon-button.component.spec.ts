import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallIconButtonComponent } from './small-icon-button.component';

describe('SmallIconButtonComponent', () => {
  let component: SmallIconButtonComponent;
  let fixture: ComponentFixture<SmallIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
