import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { FightListComponent } from './fight-list.component';

describe('FightListComponent', () => {
  let component: FightListComponent;
  let fixture: ComponentFixture<FightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ FightListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
