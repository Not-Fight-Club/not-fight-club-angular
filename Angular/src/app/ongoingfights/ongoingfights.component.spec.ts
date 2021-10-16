import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingfightsComponent } from './ongoingfights.component';

describe('OngoingfightsComponent', () => {
  let component: OngoingfightsComponent;
  let fixture: ComponentFixture<OngoingfightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingfightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingfightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
