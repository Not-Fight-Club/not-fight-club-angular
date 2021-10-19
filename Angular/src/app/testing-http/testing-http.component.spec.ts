import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingHTTPComponent } from './testing-http.component';

describe('TestingHTTPComponent', () => {
  let component: TestingHTTPComponent;
  let fixture: ComponentFixture<TestingHTTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingHTTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingHTTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
