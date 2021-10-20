import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { UserPurchasesComponent } from './user-purchases.component';

describe('UserPurchasesComponent', () => {
  let component: UserPurchasesComponent;
  let fixture: ComponentFixture<UserPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ UserPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
