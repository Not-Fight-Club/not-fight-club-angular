import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { BucksService } from '../service/bucks/bucks.service';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [StoreComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Purchase item', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  class bucksServiceStub {
    adjustBucks(changeBucks: number): Observable<boolean> {
      let user: User = {
        userId: Guid.create(),
        userName: 'testUser',
        pword: '',
        email: '',
        dob: new Date(),
        bucks: 2020,
        active: true,
        lastLogin: new Date(),
        loginStreak: 3,
        profilePic: '',
        rewardCollected: true
      }

      user.bucks += changeBucks;

      if (user.bucks < 20) {
        return of(false);
      }
      return of(true);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [StoreComponent,
        {
          provide: BucksService, useClass: bucksServiceStub
        }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("user should have some money", () => {
    component.getRich();
    expect(component.user?.bucks).toBe(4020);
  });
});