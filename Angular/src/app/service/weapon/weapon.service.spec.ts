import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WeaponService } from './weapon.service';

describe('WeaponService', () => {
  let service: WeaponService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WeaponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
