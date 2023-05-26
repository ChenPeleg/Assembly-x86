import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDemoComponent } from './counter-demo.component';

describe('CounterDemoComponent', () => {
  let component: CounterDemoComponent;
  let fixture: ComponentFixture<CounterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
