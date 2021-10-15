import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTimerComponent } from './season-timer.component';

describe('SeasonTimerComponent', () => {
  let component: SeasonTimerComponent;
  let fixture: ComponentFixture<SeasonTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
