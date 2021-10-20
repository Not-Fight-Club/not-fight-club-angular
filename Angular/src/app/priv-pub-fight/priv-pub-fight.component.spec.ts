import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { PrivPubFightComponent } from './priv-pub-fight.component';

describe('PrivPubFightComponent', () => {
  let component: PrivPubFightComponent;
  let fixture: ComponentFixture<PrivPubFightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [PrivPubFightComponent],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivPubFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
